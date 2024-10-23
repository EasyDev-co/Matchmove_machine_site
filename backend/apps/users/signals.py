from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()


@receiver(pre_save, sender=User)
def notify_user_on_email_or_password_change(sender, instance, **kwargs):
    # Получаем старого пользователя, если он существует
    try:
        old_user = User.objects.get(pk=instance.pk)
    except User.DoesNotExist:
        return

    # Проверяем, изменился ли email
    if old_user.email != instance.email:
        subject = "Email Change Notification"
        message = (
            f"Hello, {old_user.username}!\n\n"
            f"Your email address has been changed from {old_user.email} to {instance.email}. "
            "If this was not you, please contact support."
        )
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[old_user.email],  # Отправляем на старый email
            fail_silently=False,
        )

    # Проверяем, изменился ли пароль
    if old_user.password != instance.password:
        subject = "Password Change Notification"
        message = (
            f"Hello, {old_user.username}!\n\n"
            "Your password has been changed. If this was not you, please contact support."
        )
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[old_user.email],  # Отправляем на старый email
            fail_silently=False,
        )
