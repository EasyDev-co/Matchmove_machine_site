from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.validators import URLValidator
from apps.utils.models_mixins.models_mixins import UUIDMixin
from .managers import CustomUserManager


class User(UUIDMixin, AbstractUser):
    """
    Модель пользователя.
    """

    username = None
    email = models.EmailField(unique=True, verbose_name="Email")
    name = models.CharField(max_length=100, verbose_name="Имя пользователя")
    website = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="Сайт"
    )
    portfolio = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="Портфолио"
    )
    about_me = models.TextField(blank=True, null=True, verbose_name="О себе")
    linkedin = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="LinkedIn"
    )
    instagram = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="Instagram"
    )
    youtube = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="YouTube"
    )
    facebook = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="Facebook"
    )
    vimeo = models.URLField(
        validators=[URLValidator()], blank=True, null=True, verbose_name="Vimeo"
    )
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
        verbose_name="Фото пользователя",
    )

    groups = models.ManyToManyField(Group, related_name="custom_user_groups")
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_permissions"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.name
