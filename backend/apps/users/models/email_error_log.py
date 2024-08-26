from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from apps.users.models import ConfirmCode

User = get_user_model()


class EmailErrorLog(models.Model):
    """"Модель логирования отправки email."""
    confirm_code = models.ForeignKey(
        ConfirmCode,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("Code"),
    )
    message = models.TextField(
        verbose_name=_("Error Message"),
    )
    is_sent = models.BooleanField(
        default=False,
        verbose_name=_("Sent"),
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Creation Time")
    )
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        verbose_name=_("User"),
        null=True
    )

    def __str__(self):
        return self.message

    class Meta:
        verbose_name = _("Email Sending Error")
        verbose_name_plural = _("Email Sending Errors")
