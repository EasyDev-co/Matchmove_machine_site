import os
import logging

from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html

from apps.products.models.cameras import Camera
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.products.models.lens import Lens
from apps.products.models.products import Product

from apps.products.tasks import upload_file_to_ftp, delete_file_from_ftp
from apps.products.forms import FileUploadForm

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

    list_display = ("id", "file_link")
    search_fields = ("id",)
    ordering = ("id",)
    fields = ("file",)
    actions = ("upload_to_ftp", "delete_from_ftp")

    def file_link(self, obj):
        """Отображаем ссылку на файл в админке, если файл загружен."""
        if obj.file:
            return format_html(
                '<a href="{}" target="_blank">{}</a>'.format(
                    obj.file.url, "Скачать файл"
                )
            )
        return "Файл не загружен"

    file_link.short_description = "Файл"

    class Media:
        js = (
            "/backend_static/file_form/file_form.js",
            "/backend_static/file_form/auto_init.js",
        )
        css = {"all": ("/backend_static/file_form/file_form.css",)}

    def save_model(self, request, obj, form, change):
        """
        Переопределение метода сохранения модели для обработки нескольких файлов.
        Если загружается архив, он сохраняется как единый файл.
        """
        files = request.FILES.getlist("file")  # Получаем список загруженных файлов

        # Проходим по каждому загруженному файлу
        for file in files:
            # Создаем новый экземпляр File для каждого файла и сохраняем его
            new_file_instance = File(file=file)
            new_file_instance.save()

            # Отправляем файл на FTP через Celery
            local_file_path = new_file_instance.file.path
            upload_file_to_ftp.delay(
                local_file_path, str(new_file_instance.id)
            )  # Используем Celery для асинхронной загрузки

    def upload_to_ftp(self, request, queryset):
        """Загружает выделенные файлы на FTP через Celery."""
        for file in queryset:
            local_file_path = file.file.path if file.file else None
            if not local_file_path or not os.path.exists(local_file_path):
                self.message_user(request, f"Файл {file.id} не найден.")
                continue
            try:
                # Отправка задачи в Celery для загрузки на FTP
                upload_file_to_ftp.delay(local_file_path, str(file.id))
                self.message_user(request, f"Файл {file.id} отправлен на сервер.")
            except Exception as e:
                # Логирование ошибки и сообщение пользователю
                logger.error(f"Ошибка при загрузке файла {file.id} на FTP: {str(e)}")
                self.message_user(
                    request, f"Ошибка при загрузке файла {file.id}: {str(e)}"
                )

    upload_to_ftp.short_description = "Загрузить выделенные файлы на FTP"

    def delete_from_ftp(self, request, queryset):
        """Удаляет выделенные файлы с FTP через Celery."""
        for file in queryset:
            try:
                # Отправка задачи в Celery для удаления с FTP
                delete_file_from_ftp.delay(file.id)
                # Удаление файла из базы данных
                file_instance = File.objects.get(id=file.id)
                file_instance.delete()

                self.message_user(request, f"Файл {file.id} удален с сервера.")
            except Exception as e:
                # Логирование ошибки и сообщение пользователю
                logger.error(f"Ошибка при удалении файла {file.id} с FTP: {str(e)}")
                self.message_user(
                    request, f"Ошибка при удалении файла {file.id}: {str(e)}"
                )

    delete_from_ftp.short_description = "Удалить выделенные файлы с FTP"
