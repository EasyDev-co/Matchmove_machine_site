import os
import logging
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html
from django.urls import reverse
from django.shortcuts import redirect
from apps.products.models.cameras import Camera
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.products.models.lens import Lens
from apps.products.models.products import Product
from apps.products.tasks import (
    upload_file_to_ftp,
    delete_file_from_ftp,
    download_file_from_ftp,
)
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

    list_display = ("id", "file_link", "delete_local_button", "delete_ftp_button")
    search_fields = ("id",)
    ordering = ("id",)
    fields = ("file",)
    actions = ("upload_to_ftp_action", "delete_from_ftp")

    def save_model(self, request, obj, form, change):
        """
        При сохранении объекта загружаем файл на FTP, но НЕ удаляем его с локального сервера.
        """
        files = request.FILES.getlist("file")

        if files:
            for file in files:
                obj.file = file
                super().save_model(request, obj, form, change)

                local_file_path = obj.file.path
                upload_file_to_ftp.delay(local_file_path, str(obj.id))
        else:
            super().save_model(request, obj, form, change)

    def file_link(self, obj):
        """Отображаем ссылку на файл в админке, с учетом типа файла."""
        if obj.file:
            local_file_path = obj.file.path
            if not os.path.exists(local_file_path):
                # Добавляем ссылку на загрузку файла с FTP
                url = reverse(
                    "admin:products_file_download_from_ftp", args=[str(obj.id)]
                )
                return format_html('<a href="{}">Загрузить с FTP</a>', url)

            file_url = obj.file.url
            file_name = obj.file.name
            file_extension = os.path.splitext(file_name)[1].lower()

            # Список расширений изображений
            image_extensions = [
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".bmp",
                ".webp",
                ".svg",
            ]

            if file_extension in image_extensions:
                link_text = "Посмотреть файл"
            else:
                link_text = "Скачать файл"

            return format_html(
                '<a href="{}" target="_blank">{}</a>', file_url, link_text
            )
        return "Файл не загружен"

    file_link.short_description = "Файл"

    def delete_local_button(self, obj):
        """Добавляем кнопку для удаления файла с локального сервера."""
        if obj.file and os.path.exists(obj.file.path):
            url = reverse("admin:products_file_delete_local_file", args=[str(obj.id)])
            return format_html(
                '<a class="button" href="{}">Удалить локальный файл</a>', url
            )
        return "Файл отсутствует локально"

    delete_local_button.short_description = "Удалить локально"

    def delete_ftp_button(self, obj):
        """Добавляем кнопку для удаления файла с FTP."""
        url = reverse("admin:products_file_delete_ftp_file", args=[str(obj.id)])
        return format_html('<a class="button" href="{}">Удалить файл с FTP</a>', url)

    delete_ftp_button.short_description = "Удалить с FTP"

    def delete_local_file(self, request, obj_id):
        """Удаление файла только с локального сервера."""
        try:
            file_instance = File.objects.get(id=obj_id)
            local_file_path = file_instance.file.path

            if os.path.exists(local_file_path):
                os.remove(local_file_path)
                self.message_user(
                    request, f"Файл {obj_id} успешно удален с локального сервера."
                )
            else:
                self.message_user(request, f"Файл {obj_id} отсутствует локально.")
        except File.DoesNotExist:
            self.message_user(request, f"Файл с ID {obj_id} не найден.")
        except Exception as e:
            self.message_user(
                request, f"Ошибка при удалении файла с локального сервера: {str(e)}"
            )
        return redirect(reverse("admin:products_file_changelist"))

    def delete_ftp_file(self, request, obj_id):
        """Удаление файла с FTP и очистка поля 'file' в базе данных."""
        try:
            file_instance = File.objects.get(id=obj_id)

            if file_instance.file:
                file_name = os.path.basename(file_instance.file.name)
                file_extension = os.path.splitext(file_name)[1]

                # Отправляем задачу на удаление с FTP
                delete_file_from_ftp.delay(str(obj_id), file_extension)
                self.message_user(request, f"Файл {obj_id} удален с FTP.")

                # Очищаем поле 'file' в базе данных
                file_instance.file.delete(
                    save=False
                )  # Удаляем локальный файл, если он есть
                file_instance.file = None
                file_instance.save()
                self.message_user(
                    request,
                    f"Поле 'file' очищено в базе данных. Теперь вы можете загрузить новый файл.",
                )
            else:
                self.message_user(request, f"Файл с ID {obj_id} не найден.")
        except File.DoesNotExist:
            self.message_user(request, f"Файл с ID {obj_id} не найден.")
        except Exception as e:
            self.message_user(request, f"Ошибка при удалении файла с FTP: {str(e)}")
        return redirect(reverse("admin:products_file_changelist"))

    def download_from_ftp(self, request, obj_id):
        """Загружает файл с FTP и сохраняет его локально."""
        try:
            file_instance = File.objects.get(id=obj_id)
            local_file_path = file_instance.file.path

            # Отправляем задачу на скачивание с FTP
            download_file_from_ftp.delay(local_file_path, str(obj_id))
            self.message_user(request, f"Файл {obj_id} загружается с FTP.")
        except File.DoesNotExist:
            self.message_user(request, f"Файл с ID {obj_id} не найден.")
        except Exception as e:
            self.message_user(request, f"Ошибка при загрузке файла с FTP: {str(e)}")
        return redirect(reverse("admin:products_file_changelist"))

    def get_urls(self):
        """Добавляем кастомные URL для операций с файлами."""
        from django.urls import path

        urls = super().get_urls()
        custom_urls = [
            path(
                "delete-local-file/<uuid:obj_id>/",
                self.admin_site.admin_view(self.delete_local_file),
                name="products_file_delete_local_file",
            ),
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
