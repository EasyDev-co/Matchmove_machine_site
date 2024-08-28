from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin, TimeStampedMixin
from apps.products.models.cameras import Camera
from apps.products.models.lens import Lens
from apps.products.models.file_formats import Format
from apps.users.models.users import User
from apps.products.models.files import File
from apps.utils.models_mixins.models_mixins import DjangoAdaptedEnumMixin


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

    def __str__(self):
        return f"{self.access_type} {self.category} {self.camera} {self.lens}"

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
