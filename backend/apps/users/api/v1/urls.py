from django.urls import path, include
from .views import UserAPIView
from django.urls import path
from .views import UserViewSet
from apps.users.api.v1.views import (
    UserDetailViewSet,
    UserRegisterView,
    UserLoginView,
    UserLogoutView,
    EmailVerificationCodeAPIView,
    ResetPasswordAPIView,
    PasswordChangeAPIView,
    UserRankingListView,
    ContactAsApiView,
)


urlpatterns = [
    path("user/", UserAPIView.as_view(), name="user"),
    path("user/<uuid:pk>/", UserDetailViewSet.as_view({'get': 'retrieve'}), name="user_detail"),
    path("parent/", include("apps.users.api.v1.parent.urls")),
    path("user/", UserViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name="user"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("email_verification_code/", EmailVerificationCodeAPIView.as_view(), name="email_verification_code"),
    path("reset_password/", ResetPasswordAPIView.as_view(), name="reset_password"),
    path("change_password/", PasswordChangeAPIView.as_view(), name="change_password"),
    path("ranked/", UserRankingListView.as_view(), name="user_ranked"),
    path("contact_us/", ContactAsApiView.as_view(), name="contact_us"),
]
