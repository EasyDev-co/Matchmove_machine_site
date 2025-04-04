from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from apps.users.models import ConfirmCode
from apps.users.models.users import AdminNotificationLogs
from apps.users.models.email_error_log import EmailErrorLog


User = get_user_model()

if admin.site.is_registered(User):
    admin.site.unregister(User)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password", "qr_code")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "username",
                    "profile_picture",
                    "about_me",
                    "website",
                    "portfolio",
                    "is_verified",
                    "occupation",
                )
            },
        ),
        (
            _("Social Media"),
            {
                "fields": (
                    "whatsapp",
                    "messenger",
                    "twitter",
                    "telegram",
                    "reddit",
                    "linkedin",
                    "instagram",
                    "youtube",
                    "facebook",
                    "vimeo",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "groups",
                    "user_permissions",
                    "is_superuser",
                    "is_staff",
                ),
            },
        ),
        (
            _("Important dates"),
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "username",
                    "profile_picture",
                    "about_me",
                    "website",
                    "portfolio",
                    "linkedin",
                    "instagram",
                    "youtube",
                    "facebook",
                    "vimeo",
                    "is_verified",
                ),
            },
        ),
    )
    list_display = (
        "id",
        "email",
        "username",
        "is_verified",
        "occupation",
        "qr_code",
    )
    search_fields = (
        "email",
        "username",
    )
    list_filter = ("is_staff", "is_superuser")
    ordering = ("email", "username")
    readonly_fields = ("last_login", "date_joined")


@admin.register(EmailErrorLog)
class EmailErrorLogAdmin(admin.ModelAdmin):
    list_display = ("user", "user__email", "confirm_code", "message", "is_sent", "created_at")
    search_fields = ("user__email",)
    ordering = ("created_at",)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(ConfirmCode)
class ConfirmCodeAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "user__email",
        "code",
        "created_at",
        "purpose",
        "is_used",
    )

@admin.register(AdminNotificationLogs)
class AdminNotificationLogsAdmin(admin.ModelAdmin):
    list_display = ("email", "text", "type")
    list_filter = ("type", )
    search_fields = ("email", "text")
