from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from apps.utils.models_mixins.models_mixins import UUIDMixin, TimeStampedMixin
from ..managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
from apps.users.models.occupations import Occupations
from io import BytesIO
import qrcode
from django.core.files.base import ContentFile


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
    whatsapp = models.URLField(blank=True, null=True, verbose_name=_("WhatsApp"))
    messenger = models.URLField(blank=True, null=True, verbose_name=_("Messenger"))
    twitter = models.URLField(blank=True, null=True, verbose_name=_("Twitter"))
    telegram = models.URLField(blank=True, null=True, verbose_name=_("Telegram"))
    reddit = models.URLField(blank=True, null=True, verbose_name=_("Reddit"))
    linkedin = models.URLField(blank=True, null=True, verbose_name=_("LinkedIn"))
    instagram = models.URLField(blank=True, null=True, verbose_name=_("Instagram"))
    youtube = models.URLField(blank=True, null=True, verbose_name=_("YouTube"))
    facebook = models.URLField(blank=True, null=True, verbose_name=_("Facebook"))
    vimeo = models.URLField(blank=True, null=True, verbose_name=_("Vimeo"))
    occupation = models.CharField(
        max_length=50,
        choices=Occupations.choices,
        blank=True,
        null=True,
        default="",
        verbose_name=_("Профессия"),
    )
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
        verbose_name=_("Фото пользователя"),
    )

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True
    )
    is_verified = models.BooleanField(
        default=False,
        verbose_name="Подтверждение email",
    )
    qr_code = models.ImageField(
        upload_to="qr_codes/", blank=True, null=True, verbose_name=_("QR код")
    )

    def generate_qr_code(self):
        """
        Метод для генерации QR-кода и сохранения в поле qr_code
        """
        url = f"https://grids.matchmovemachine.com/profile/{self.id}"  # Генерация URL с ID пользователя
        qr_img = qrcode.make(url)  # Генерация QR-кода
        buffer = BytesIO()
        qr_img.save(buffer, format="PNG")
        file_name = f"user_{self.id}_qr.png"
        self.qr_code.save(file_name, ContentFile(buffer.getvalue()), save=False)

    def save(self, *args, **kwargs):
        is_new = self.pk is None  # Проверяем, если это новое создание
        super().save(*args, **kwargs)
        if (
            is_new and not self.qr_code
        ):  # Генерируем QR-код только если пользователь новый
            self.generate_qr_code()
            super().save(*args, **kwargs)  # Повторное сохранение для QR-кода

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("Пользователь")
        verbose_name_plural = _("Пользователи")
        ordering = ["email"]

    def __str__(self):
        return self.username


class AdminNotificationLogs(TimeStampedMixin,UUIDMixin):
    """
    Уведомления админу, поддерживает два типа:
    1. Contact US
    2. New product
    """

    class TypeNotification(models.IntegerChoices):
        CONTACT_US = 1, "contact-us"
        NEW_PRODUCT = 2, "new-product"

    email = models.EmailField(max_length=256, verbose_name=_("Email"), null=True, blank=True)
    text = models.TextField(verbose_name=_("Text"), null=True, blank=True)
    type = models.PositiveSmallIntegerField(
        verbose_name=_("Тип уведомления"),
        choices=TypeNotification.choices,
        default=TypeNotification.CONTACT_US,
    )

    class Meta:
        verbose_name = "Уведомление админу"
        verbose_name_plural = "Уведомления админу"
