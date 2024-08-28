from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class Format(UUIDMixin):
    """Модель формата файла."""
    format_type = models.CharField(
        max_length=10,
        unique=True,
        verbose_name=_("Тип формата")
    )

    def __str__(self):
        return self.format_type.capitalize()

    class Meta:
        verbose_name = _("Формат файла")
        verbose_name_plural = _("Формат файлов")
