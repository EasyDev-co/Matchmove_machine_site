import os
import logging
from django.conf import settings
from django.http import HttpResponse
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html
from django.urls import reverse, path
from django.shortcuts import redirect
from apps.products.models.cameras import Camera
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.products.models.lens import Lens
from apps.products.models.products import Product
from apps.products.tasks import (
    upload_file_to_ftp,
    delete_file_from_ftp,
)
from apps.products.forms import FileUploadForm
from apps.products.services import get_ftp_service

logger = logging.getLogger(__name__)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "access_type",
                    "category",
                    "is_approved",
                    "camera",
                    "lens",
                    "file_format",
                    "description",
                    "price",
                    "file",
                    "qr_code",
                )
            },
        ),
        (
            _("Important Information"),
            {
                "fields": (
                    "date_added",
                    "author",
                )
            },
        ),
    )

    list_display = (
        "id",
        "access_type",
        "category",
        "is_approved",
        "camera",
        "lens",
        "file_format",
        "date_added",
        "author",
        "description",
        "price",
        "qr_code",
        "file",
    )

    search_fields = (
        "camera__model_name",
        "lens__brand",
        "author__email",
    )

    list_filter = (
        "access_type",
        "category",
        "is_approved",
        "camera",
        "lens",
        "file_format",
        "author",
    )

    ordering = ("price",)
    readonly_fields = ("date_added",)


@admin.register(Lens)
class LensAdmin(admin.ModelAdmin):
    list_display = ("id", "brand", "model_name")
    search_fields = ("brand", "model_name")
    list_filter = ("model_name",)
    ordering = ("brand",)


@admin.register(Format)
class FormatAdmin(admin.ModelAdmin):
    list_display = ("id", "format_type")
    search_fields = ("format_type",)
    ordering = ("format_type",)


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    list_display = ("id", "model_name")
    search_fields = ("model_name",)
    ordering = ("model_name",)


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    form = FileUploadForm

    list_display = ("id", "file_link", "delete_ftp_button")
    search_fields = ("id",)
    ordering = ("id",)
    fields = ("file",)
    actions = ("upload_to_ftp_action", "delete_from_ftp")

    def save_model(self, request, obj, form, change):
        """
        При сохранении объекта загружаем файлы на FTP, не сохраняя их локально.
        """
        uploaded_files = form.cleaned_data.get("file")
        if uploaded_files:
            for uploaded_file in uploaded_files:
                # Читаем содержимое файла
                file_content = uploaded_file.read()
                file_name = uploaded_file.name
                file_extension = os.path.splitext(file_name)[1]

                # Создаём новый объект для каждого файла
                new_obj = File()
                new_obj.file.name = f"{str(new_obj.id)}{file_extension}"
                new_obj.save()

                # Запускаем задачу на загрузку файла на FTP
                upload_file_to_ftp.delay(file_content, str(new_obj.id), file_extension)
        else:
            super().save_model(request, obj, form, change)

    def delete_model(self, request, obj):
        """При удалении объекта из админки, удаляем файл с FTP."""
        file_name = os.path.basename(obj.file.name)
        file_extension = os.path.splitext(file_name)[1]

        # Запускаем задачу на удаление файла с FTP
        delete_file_from_ftp.delay(str(obj.id), file_extension)
        logger.info(f"Запущена задача на удаление файла ID {obj.id} с FTP")

        # Удаляем запись из базы данных
        super().delete_model(request, obj)

    def file_link(self, obj):
        """Отображаем ссылку на скачивание файла с FTP."""
        if obj.file.name:
            url = reverse("admin:products_file_download_from_ftp", args=[str(obj.id)])
            return format_html('<a href="{}">Скачать файл</a>', url)
        return ""  # Если файла нет, ничего не отображаем

    file_link.short_description = "Файл"

    def delete_ftp_button(self, obj):
        """Добавляем кнопку для удаления файла и записи."""
        url = reverse("admin:products_file_delete_ftp_file", args=[str(obj.id)])
        return format_html('<a class="button" href="{}">Удалить файл</a>', url)

    delete_ftp_button.short_description = "Удалить файл"

    def delete_ftp_file(self, request, obj_id):
        """Удаление файла с FTP и удаление записи из базы данных."""
        try:
            file_instance = File.objects.get(id=obj_id)
            file_name = os.path.basename(file_instance.file.name)
            file_extension = os.path.splitext(file_name)[1]

            # Запускаем задачу на удаление файла с FTP
            delete_file_from_ftp.delay(str(obj_id), file_extension)
            logger.info(f"Запущена задача на удаление файла ID {obj_id} с FTP")

            # Удаляем запись из базы данных
            file_instance.delete()
            self.message_user(request, f"Файл {obj_id} удалён и запись удалена.")
        except File.DoesNotExist:
            self.message_user(request, f"Файл с ID {obj_id} не найден.")
        return redirect(reverse("admin:products_file_changelist"))

    def download_from_ftp(self, request, obj_id):
        """Скачивает файл с FTP и предоставляет его для скачивания."""
        try:
            file_instance = File.objects.get(id=obj_id)
            file_name = os.path.basename(file_instance.file.name)
            file_extension = os.path.splitext(file_name)[1]
            remote_file_name = f"{obj_id}{file_extension}"

            # Получаем содержимое файла с FTP (в памяти)
            ftp_service = get_ftp_service()
            file_content = ftp_service.download_file_content(str(obj_id), file_extension)

            if file_content is None:
                # Если не удалось загрузить в память, пытаемся скачать на диск
                file_path = os.path.join(settings.MEDIA_ROOT, remote_file_name)
                ftp_service.download_file_api(file_path, str(obj_id))

                # Проверяем, существует ли файл после загрузки на диск
                if os.path.exists(file_path):
                    with open(file_path, 'rb') as f:
                        file_content = f.read()

                    # Удаляем временный файл после передачи содержимого
                    os.remove(file_path)
                else:
                    # Если файл не найден, выводим только сообщение в админке
                    self.message_user(request, f"Файл с ID {obj_id} не найден на FTP.")
                    return redirect(reverse("admin:products_file_changelist"))

            # Если файл был найден, создаем и возвращаем ответ
            if file_content:
                response = HttpResponse(file_content, content_type="application/octet-stream")
                response["Content-Disposition"] = f'attachment; filename="{remote_file_name}"'
                return response

        except File.DoesNotExist:
            # Если файл не найден в базе данных, выводим сообщение
            self.message_user(request, f"Файл с ID {obj_id} не существует в базе данных.")
            return redirect(reverse("admin:products_file_changelist"))

    def get_urls(self):
        """Добавляем кастомные URL для операций с файлами."""
        urls = super().get_urls()
        custom_urls = [
            path(
                "delete-ftp-file/<uuid:obj_id>/",
                self.admin_site.admin_view(self.delete_ftp_file),
                name="products_file_delete_ftp_file",
            ),
            path(
                "download-from-ftp/<uuid:obj_id>/",
                self.admin_site.admin_view(self.download_from_ftp),
                name="products_file_download_from_ftp",
            ),
        ]
        return custom_urls + urls
