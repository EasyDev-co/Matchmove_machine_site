from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


User = get_user_model()


class CodePurpose(models.IntegerChoices):
    RESET_PASSWORD = 1, _("Reset Password")
    CONFIRM_EMAIL = 2, _("Confirm Email")


class ConfirmCode(models.Model):
    """Модель подтверждения кода."""
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    code = models.CharField(
        max_length=100,
        unique=True,
        verbose_name=_("Code"),
        null=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Creation Time")
    )
    purpose = models.PositiveSmallIntegerField(
        choices=CodePurpose.choices,
        verbose_name=_("Purpose"),
    )
    is_used = models.BooleanField(
        default=False,
        verbose_name=_("Used"),
    )

    class Meta:
        verbose_name = _("Confirmation Code")
        verbose_name_plural = _("Confirmation Codes")

    def __str__(self):
        return f"Code for {self.user}"

    @property
    def is_expired(self):
        expiration_date = self.created_at + timezone.timedelta(hours=24)
        return timezone.now() > expiration_date
