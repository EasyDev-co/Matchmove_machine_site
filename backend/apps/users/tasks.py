# import random
# import traceback
# from django.core.mail import send_mail
# from django.contrib.auth import get_user_model
# from django.db import transaction

# from apps.user.models import ConfirmCode
# from apps.user.models.code import CodePurpose
# from apps.user.models.email_error_log import EmailErrorLog

# from config.celery import BaseTask, app
# from config.settings import EMAIL_HOST_USER

# User = get_user_model()

# class SendConfirmCodeTask(BaseTask):
#     """Генерируем рандомный 6 значный цифровой код."""
#     name = "send_confirm_code"

#     def process(self, user_id, code_purpose, *args, **kwargs):
#         user: User = User.objects.get(id=user_id)
#         code = str(random.randint(100000, 999999))

#         if code_purpose == CodePurpose.RESET_PASSWORD:
#             subject = "Password Recovery"
#             message = "Your password recovery code:\n"
#         elif code_purpose == CodePurpose.CONFIRM_EMAIL:
#             subject = "Email Confirmation"
#             message = "Your email confirmation code:\n"
#         else:
#             raise ValueError("Unknown code_purpose.")

#         with transaction.atomic():
#             ConfirmCode.objects.filter(
#                 user=user,
#                 purpose=code_purpose,
#                 is_used=False
#             ).update(is_used=True)

#             confirm_code = ConfirmCode.objects.create(
#                 user=user,
#                 code=code,
#                 purpose=code_purpose,
#             )

#         try:
#             send_mail(
#                 subject=subject,
#                 message=message + code,
#                 from_email=EMAIL_HOST_USER,
#                 recipient_list=(user.email,),
#                 fail_silently=False,
#             )
#         except Exception as e:
#             self.on_failure(
#                 exc=e,
#                 task_id=self.request.id,
#                 args=(),
#                 kwargs={"confirm_code": confirm_code, "user": user},
#                 einfo=traceback.format_exc()
#             )

#     def on_failure(self, exc, task_id, args, kwargs, einfo):
#         EmailErrorLog.objects.create(
#             confirm_code=kwargs["confirm_code"],
#             message=str(exc),
#             is_sent=False,
#             user=kwargs["user"],
#         )
#         super().on_failure(exc, task_id, args, kwargs, einfo)

# class ResendConfirmCodeTask(BaseTask):
#     def process(self, *args, **kwargs):
#         email_error_logs = EmailErrorLog.objects.filter(
#             confirm_code__is_used=False,
#             is_sent=False,
#         )
#         for email_error_log in email_error_logs:
#             send_confirm_code.delay(
#                 user_id=email_error_log.user.id,
#                 code_purpose=email_error_log.confirm_code.purpose
#             )
#         email_error_logs.update(is_sent=True)

# send_confirm_code = app.register_task(SendConfirmCodeTask)
# app.register_task(ResendConfirmCodeTask)
import random
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.db import transaction

from apps.users.models import ConfirmCode
from apps.users.models.code import CodePurpose
from apps.users.models.email_error_log import EmailErrorLog
from config.settings import EMAIL_HOST_USER

User = get_user_model()

class SendConfirmCode:
    """Generate a random 6-digit code and send it via email."""
    
    @staticmethod
    def process(user: User, code_purpose: str):
        code = str(random.randint(100000, 999999))

        if code_purpose == CodePurpose.RESET_PASSWORD:
            subject = "Password Recovery"
            message = "Your password recovery code:\n"
        elif code_purpose == CodePurpose.CONFIRM_EMAIL:
            subject = "Email Confirmation"
            message = "Your email confirmation code:\n"
        else:
            raise ValueError("Unknown code_purpose.")

        with transaction.atomic():
            ConfirmCode.objects.filter(
                user=user,
                purpose=code_purpose,
                is_used=False
            ).update(is_used=True)

            confirm_code = ConfirmCode.objects.create(
                user=user,
                code=code,
                purpose=code_purpose,
            )

        try:
            send_mail(
                subject=subject,
                message=message + code,
                from_email=EMAIL_HOST_USER,
                recipient_list=(user.email,),
                fail_silently=False,
            )
        except Exception as e:
            SendConfirmCode.log_error(confirm_code, user, str(e))

    @staticmethod
    def log_error(confirm_code, user, error_message):
        EmailErrorLog.objects.create(
            confirm_code=confirm_code,
            message=error_message,
            is_sent=False,
            user=user,
        )