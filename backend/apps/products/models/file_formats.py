from enum import Enum
from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class FileFormat(Enum):
    RAW = "raw"
    JPEG = "jpeg"
    TIFF = "tiff"
    OTHER = "other"

    @classmethod
    def choices(cls):
        return [(tag.value, tag.name.capitalize()) for tag in cls]


class Format(UUIDMixin):
    """"Выбор формата файла."""
    format_type = models.CharField(
        max_length=10,
        choices=FileFormat.choices(),
        verbose_name=_("Тип формата")
    )

    def __str__(self):
        return self.format_type.capitalize()

    class Meta:
        verbose_name = _("Формат файла")
        verbose_name_plural = _("Формат файлов")
