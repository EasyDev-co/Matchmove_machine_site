from django.urls import path

from .views import CreateOrderAPIView, UserOrdersAPIView, LastOrderAPIView, PaidOrdersAPIView

urlpatterns = [
    path("orders/create/", CreateOrderAPIView.as_view(), name="create-order"),
    path("orders/", UserOrdersAPIView.as_view(), name="user_orders"),
    path("orders/last/", LastOrderAPIView.as_view(), name="last_order"),
    path("orders/paid/", PaidOrdersAPIView.as_view(), name="paid_orders"),
]
