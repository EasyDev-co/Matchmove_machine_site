from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class File(UUIDMixin):
    """Модель файла для синхронизации с сервером."""
    file = models.CharField(
        max_length=255,
        verbose_name=_("Идентификатор Файла")
    )

    def __str__(self):
        return f"File {self.file}"

    class Meta:
        verbose_name = _("Файл")
        verbose_name_plural = _("Файлы")
