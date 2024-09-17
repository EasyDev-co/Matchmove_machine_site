from django.urls import path

from .views import CreateOrderAPIView, UserOrdersAPIView

urlpatterns = [
    path("orders/create/", CreateOrderAPIView.as_view(), name="create-order"),
    path("orders/", UserOrdersAPIView.as_view(), name="user_orders"),
]
