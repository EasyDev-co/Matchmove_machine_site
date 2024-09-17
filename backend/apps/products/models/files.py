from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class File(UUIDMixin):
    """Модель файла для синхронизации с сервером."""
    file = models.FileField(
        upload_to='uploads/',
        verbose_name=_("Файл")
    )

    def __str__(self):
        return f"File {self.file.name}"

    class Meta:
        verbose_name = _("Файл")
        verbose_name_plural = _("Файлы")
