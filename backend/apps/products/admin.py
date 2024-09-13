import os
import logging

from django.conf import settings
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.products.models.cameras import Camera
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.products.models.lens import Lens
from apps.products.models.products import Product


from apps.products.tasks import upload_file_to_ftp, delete_file_from_ftp


logger = logging.getLogger(__name__)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {"fields": (
            "access_type", "category", "camera", "lens", "file_format", "price", "file"
        )}),
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
        "camera",
        "lens",
        "file_format",
        "date_added",
        "author",
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
        "camera",
        "lens",
        "file_format",
    )

    ordering = ("price",)
    readonly_fields = ("date_added",)


@admin.register(Lens)
class LensAdmin(admin.ModelAdmin):
    list_display = ("id", "brand", "focal_length", "lens_type")
    search_fields = ("brand", "focal_length", "lens_type")
    list_filter = ("lens_type",)
    ordering = ("brand",)


@admin.register(Format)
class FormatAdmin(admin.ModelAdmin):
    list_display = ("id", "format_type")
    search_fields = ("format_type",)
    ordering = ("format_type",)


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    list_display = ("id", "brand", "model_name")
    search_fields = ("brand", "model_name")
    ordering = ("brand",)


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ("id", "file")
    search_fields = ("file",)
    ordering = ("id",)
    fields = ("file",)

    actions = ("upload_to_ftp", "delete_from_ftp")

    def upload_to_ftp(self, request, queryset):
        """Загружает выделенные файлы на FTP через Celery."""

        for file in queryset:
            local_file_path = os.path.join(settings.MEDIA_ROOT, str(file.id))
            if not os.path.exists(local_file_path):
                self.message_user(request, f"Файл {file.id} не найден.")
                continue
            try:
                # Отправка задачи в Celery
                upload_file_to_ftp.delay(local_file_path, str(file.id))
                self.message_user(request, f"Файл {file.id} отправлен на сервер.")
            except Exception as e:
                # Логирование ошибки и сообщение пользователю
                logger.error(f"Ошибка при загрузке файла {file.id} на FTP: {str(e)}")
                self.message_user(request, f"Ошибка при загрузке файла {file.id}: {str(e)}")

    upload_to_ftp.short_description = "Загрузить выделенные файлы на FTP"

    def delete_from_ftp(self, request, queryset):
        """Удаляет выделенные файлы с FTP через Celery."""
        for file in queryset:
            try:
                # Отправка задачи в Celery
                delete_file_from_ftp.delay(file.id)
                # Удаление файла из базы данных
                file_instance = File.objects.get(id=file.id)
                file_instance.delete()
                self.message_user(request, f"Файл {file.id} удален с сервера.")
            except Exception as e:
                # Логирование ошибки и сообщение пользователю
                logger.error(f"Ошибка при удалении файла {file.id} с FTP: {str(e)}")
                self.message_user(request, f"Ошибка при удалении файла {file.id}: {str(e)}")

    delete_from_ftp.short_description = "Удалить выделенные файлы с FTP"


