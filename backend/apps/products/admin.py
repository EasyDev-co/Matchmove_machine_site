import os
from django.conf import settings
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from apps.products.models.products import Product
from apps.products.models.cameras import Camera
from apps.products.models.lens import Lens
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.products.services import FTPDownloadUploadService, FTPManager


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

    def save_model(self, request, obj, form, change):
        """Автоматически загружает файл на FTP при сохранении объекта."""
        super().save_model(request, obj, form, change)
        if not change:  # Проверяем, является ли это новой записью
            try:
                ftp_service = FTPDownloadUploadService(
                    ftp_manager=FTPManager(),
                    host=os.getenv('FTP_HOST'),
                    username=os.getenv('FTP_USERNAME'),
                    password=os.getenv('FTP_PASSWORD'),
                )
                # Получаем локальный файл
                local_file_path = os.path.join(settings.MEDIA_ROOT, str(obj.file))  # Приведение к строке
                ftp_service.upload_file(local_file_path)
                self.message_user(request, "Файл успешно загружен на FTP.")
            except Exception as e:
                self.message_user(request, f"Ошибка при загрузке: {str(e)}", level='error')
