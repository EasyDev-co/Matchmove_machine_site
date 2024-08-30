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
    fields = ('file',)
    actions = ('upload_to_ftp',)

    def get_ftp_service(self):
        """Создает и возвращает экземпляр FTPDownloadUploadService."""
        return FTPDownloadUploadService(
            ftp_manager=FTPManager(),
            host=os.getenv('FTP_HOST'),
            username=os.getenv('FTP_USERNAME'),
            password=os.getenv('FTP_PASSWORD'),
        )

    def upload_to_ftp(self, request, queryset):
        """Загружает выделенные файлы на FTP."""
        ftp_service = self.get_ftp_service()

        for file in queryset:
            try:
                # Получаем локальный файл по его относительному пути
                local_file_path = os.path.join(settings.MEDIA_ROOT, str(file.id))
                # Загружаем файл на FTP с именем, соответствующим id
                ftp_service.upload_file(local_file_path, str(file.id))
                self.message_user(
                    request, f"Файл ID {file.id} успешно загружен на FTP."
                )
            except Exception as e:
                self.message_user(
                    request, f"Ошибка при загрузке файла ID {file.id}: {str(e)}", level='error'
                )

    upload_to_ftp.short_description = "Загрузить выделенные файлы на FTP"
