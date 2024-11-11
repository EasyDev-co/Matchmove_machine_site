from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from apps.utils.models_mixins.models_mixins import UUIDMixin
import os


User = get_user_model()


def upload_to(instance, filename):
    """Генерация пути для загрузки файла, используя UUID."""
    return os.path.join("uploads", f"{instance.id}/{filename}")


class File(UUIDMixin):
    """Модель файла для синхронизации с сервером."""

    author = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        related_name="files",
        verbose_name=_("Автор")
    )
    file = models.FileField(
        upload_to=upload_to, verbose_name=_("Файл"), null=True, blank=True
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_("Идентификатор Файла"),
        blank=True,
        null=True
    )

    def __str__(self):
        return f"File {self.id}"

    class Meta:
        verbose_name = _("Файл")
        verbose_name_plural = _("Файлы")
