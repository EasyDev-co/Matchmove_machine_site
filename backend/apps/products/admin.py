import os

from django.conf import settings
from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.products.models.cameras import Camera
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.products.models.lens import Lens
from apps.products.models.products import Product
from apps.products.tasks import upload_file_to_ftp


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
    actions = ("upload_to_ftp",)

    def upload_to_ftp(self, request, queryset):
        """Загружает выделенные файлы на FTP через Celery."""

        for file in queryset:
            local_file_path = os.path.join(settings.MEDIA_ROOT, str(file.id))
            upload_file_to_ftp.delay(local_file_path, str(file.id))
            self.message_user(request, f"Файл {file.id} отправлен на сервер.")

    upload_to_ftp.short_description = "Загрузить выделенные файлы на FTP"
