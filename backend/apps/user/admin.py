from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

User = get_user_model()

if admin.site.is_registered(User):
    admin.site.unregister(User)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "name",
                    "profile_picture",
                    "about_me",
                    "website",
                    "portfolio",
                )
            }
        ),
        (
            _("Social Media"),
            {
                "fields": (
                    "linkedin",
                    "instagram",
                    "youtube",
                    "facebook",
                    "vimeo",
                )
            }
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
            }
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
                    "name",
                    "profile_picture",
                    "about_me",
                    "website",
                    "portfolio",
                    "linkedin",
                    "instagram",
                    "youtube",
                    "facebook",
                    "vimeo",
                ),
            },
        ),
    )
    list_display = (
        'id',
        'email',
        'name',
        'linkedin',
        'instagram',
    )
    search_fields = (
        'email',
        'name',
        'linkedin',
    )
    list_filter = ('is_staff', 'is_superuser')
    ordering = ('email', 'name')
    readonly_fields = ('last_login', 'date_joined')
