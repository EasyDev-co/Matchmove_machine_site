from django.urls import path
from apps.users.api.v1.views import (
    UserRegisterView,
    UserLoginView,
    UserLogoutView,
    EmailVerificationCodeAPIView,
    ResetPasswordAPIView,
    PasswordChangeAPIView,
)


urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("email_verification_code/", EmailVerificationCodeAPIView.as_view(), name="email_verification_code"),
    path("reset_password/", ResetPasswordAPIView.as_view(), name="reset_password"),
    path("change_password/", PasswordChangeAPIView.as_view(), name="change_password"),
]
