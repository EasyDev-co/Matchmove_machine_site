from django.urls import path
from .views import PasswordChangeView

urlpatterns = [
    path('change_password/', PasswordChangeView.as_view(), name='change_password'),
]
