from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from apps.products.models.products import Product
from apps.products.models.cameras import Camera
from apps.products.models.lens import Lens
from apps.products.models.file_formats import Format
from apps.products.models.files import File


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

    def has_add_permission(self, request):
        return True

    def has_delete_permission(self, request, obj=None):
        return True

    def has_change_permission(self, request, obj=None):
        return True


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
