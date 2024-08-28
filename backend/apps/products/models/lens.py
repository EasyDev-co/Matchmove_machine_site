from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class Lens(UUIDMixin):
    """Модель объектива камеры."""
    brand = models.CharField(
        max_length=100,
        verbose_name=_("Бренд")
    )
    focal_length = models.CharField(
        max_length=50,
        verbose_name=_("Фокусное расстояние")
    )
    lens_type = models.CharField(
        max_length=20,
        verbose_name=_("Тип объектива")
    )

    def __str__(self):
        return f"{self.brand} {self.focal_length} ({self.lens_type})"
