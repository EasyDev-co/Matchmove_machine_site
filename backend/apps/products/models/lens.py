from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class Lens(UUIDMixin):
    """Модель объектива камеры."""
    brand = models.CharField(
        max_length=100,
        verbose_name=_("Бренд")
    )
    model_name = models.CharField(
        max_length=255,
        verbose_name=_("Модель")
    )

    class Meta:
        verbose_name = _("Объектив")
        verbose_name_plural = _("Объективы")

    def __str__(self):
        return f"{self.brand} {self.model_name}"
