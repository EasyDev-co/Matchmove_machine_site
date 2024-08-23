from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from apps.utils.models_mixins.models_mixins import UUIDMixin, TimeStampedMixin
from apps.users.managers import CustomUserManager
from django.utils.translation import gettext_lazy as _


class User(UUIDMixin, TimeStampedMixin, AbstractUser):
    """
    Модель пользователя.
    """

    username = models.CharField(
        max_length=150, unique=True, verbose_name=_("Имя пользователя")
    )
    email = models.EmailField(unique=True, verbose_name=_("Email"))
    website = models.URLField(blank=True, null=True, verbose_name=_("Сайт"))
    portfolio = models.URLField(blank=True, null=True, verbose_name=_("Портфолио"))
    about_me = models.TextField(blank=True, null=True, verbose_name=_("О себе"))
    linkedin = models.URLField(blank=True, null=True, verbose_name=_("LinkedIn"))
    instagram = models.URLField(blank=True, null=True, verbose_name=_("Instagram"))
    youtube = models.URLField(blank=True, null=True, verbose_name=_("YouTube"))
    facebook = models.URLField(blank=True, null=True, verbose_name=_("Facebook"))
    vimeo = models.URLField(blank=True, null=True, verbose_name=_("Vimeo"))
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
        verbose_name=_("Фото пользователя"),
    )

    groups = models.ManyToManyField(Group, related_name="custom_user_groups")
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_permissions"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("Пользователь")
        verbose_name_plural = _("Пользователи")
        ordering = ["email"]

    def __str__(self):
        return self.username
