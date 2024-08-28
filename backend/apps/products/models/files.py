from django.db import models
from django.utils.translation import gettext_lazy as _
from apps.utils.models_mixins.models_mixins import UUIDMixin


class File(UUIDMixin):
    """"Модель файла."""
    file = models.ImageField(
        upload_to="files/",
        verbose_name=_("Файл")
    )

    def __str__(self):
        return f"File {self.id}"
