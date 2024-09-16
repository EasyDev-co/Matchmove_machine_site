from django.urls import path
from .views import UserOrdersAPIView

urlpatterns = [
    path("orders/", UserOrdersAPIView.as_view(), name="user_orders"),
]

