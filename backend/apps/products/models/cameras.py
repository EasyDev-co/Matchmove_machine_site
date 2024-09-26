from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class Camera(UUIDMixin):
    """Модель камеры."""
    model_name = models.CharField(
        max_length=255,
        verbose_name=_("Модель")
    )

    def __str__(self):
        return f"{self.model_name}"

    class Meta:
        verbose_name = _("Камера")
        verbose_name_plural = _("Камеры")
