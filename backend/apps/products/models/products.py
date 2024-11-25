import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from datetime import timedelta
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin, TimeStampedMixin
from apps.products.models.cameras import Camera
from apps.products.models.lens import Lens
from apps.products.models.file_formats import Format
from apps.products.models.files import File
from apps.utils.models_mixins.models_mixins import DjangoAdaptedEnumMixin


User = get_user_model()


class AccessType(DjangoAdaptedEnumMixin):
    FREE = "free"
    PAID = "paid"
    SUBSCRIPTION = "subscription"


class AssetCategory(DjangoAdaptedEnumMixin):
    DISTORTION_GRIDS = "distortion_grids"
    PRESETS = "presets"
    ST_MAP = "st_map"
    FULL_ARCHIVES = "full_archives"


class Product(UUIDMixin, TimeStampedMixin):
    """Модель продукта."""
    access_type = models.CharField(
        max_length=20, choices=AccessType.choices(), verbose_name=_("Тип доступа")
    )
    category = models.CharField(
        max_length=30, choices=AssetCategory.choices(), verbose_name=_("Категория")
    )
    is_approved = models.BooleanField(
        default=False,
        verbose_name=_("Одобрен модерацией")
    )
    camera = models.ForeignKey(
        Camera,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
        verbose_name=_("Камера")
    )
    lens = models.ForeignKey(
        Lens,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
        verbose_name=_("Объектив")
    )
    file_format = models.ForeignKey(
        Format,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
        verbose_name=_("Формат файла")
    )
    date_added = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата добавления")
    )
    author = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        related_name="products",
        verbose_name=_("Автор")
    )
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name=_("Описание")
    )
    price = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        verbose_name=_("Цена")
    )
    file = models.ForeignKey(
        File,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
        verbose_name=_("Файл")
    )
    qr_code = models.ImageField(upload_to='product_qr_codes/', blank=True, null=True)

    def __str__(self):
        return f"{self.access_type} {self.category} {self.camera} {self.lens}"

    def generate_qr_code(self):
        """
        Метод для генерации QR-кода для продукта.
        """
        url = f"http://89.58.57.91:8083/product/{self.id}"  # Генерация URL с ID продукта
        qr_img = qrcode.make(url)  # Генерация QR-кода
        buffer = BytesIO()
        qr_img.save(buffer, format="PNG")
        file_name = f"product_{self.id}_qr.png"
        self.qr_code.save(file_name, ContentFile(buffer.getvalue()), save=False)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new and not self.qr_code:  # Генерация QR-кода только для нового продукта
            self.generate_qr_code()
            super().save(*args, **kwargs)  # Повторное сохранение для QR-кода

    @classmethod
    def added_today(cls):
        today = timezone.now()
        return cls.objects.filter(date_added__date=today.date())

    @classmethod
    def added_last_week(cls):
        last_week = timezone.now() - timedelta(weeks=1)
        return cls.objects.filter(date_added__gte=last_week)

    @classmethod
    def added_last_month(cls):
        last_month = timezone.now() - timedelta(days=30)
        return cls.objects.filter(date_added__gte=last_month)

    @classmethod
    def added_last_year(cls):
        last_year = timezone.now() - timedelta(days=365)
        return cls.objects.filter(date_added__gte=last_year)

    class Meta:
        verbose_name = _("Продукт")
        verbose_name_plural = _("Продукты")
        ordering = ["price"]
