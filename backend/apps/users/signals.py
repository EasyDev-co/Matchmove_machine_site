from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()


def send_notification_email(subject, message, recipient_email):
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[recipient_email],
        fail_silently=False,
    )


# @receiver(pre_save, sender=User)
# def notify_user_on_email_or_password_change(sender, instance, **kwargs):
#     # Проверяем, существует ли пользователь в базе данных
#     if instance.pk:
#         try:
#             old_user = User.objects.get(pk=instance.pk)
#         except User.DoesNotExist:
#             old_user = None
#
#         # Если пользователь существует, проверяем изменения
#         if old_user:
#             # Проверяем, изменился ли email
#             if old_user.email != instance.email:
#                 subject = "Email Change Notification"
#                 message = (
#                     f"Hello, {old_user.username}!\n\n"
#                     f"Your email address has been changed from {old_user.email} to {instance.email}. "
#                     "If this was not you, please contact support."
#                 )
#                 send_notification_email(subject, message, old_user.email)
#
#             if old_user.password != instance.password:
#                 subject = "Password Change Notification"
#                 message = (
#                     f"Hello, {old_user.username}!\n\n"
#                     "Your password has been changed. If this was not you, please contact support."
#                 )
#                 send_notification_email(subject, message, old_user.email)
#     else:
#         return
