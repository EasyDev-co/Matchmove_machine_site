from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin
import os


def upload_to(instance, filename):
    """Генерация пути для загрузки файла, используя UUID."""
    return os.path.join("uploads", f"{instance.id}/{filename}")


class File(UUIDMixin):
    """Модель файла для синхронизации с сервером."""

    file = models.FileField(
        upload_to=upload_to,
        verbose_name=_("Файл"),
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"File {self.id}"

    class Meta:
        verbose_name = _("Файл")
        verbose_name_plural = _("Файлы")
