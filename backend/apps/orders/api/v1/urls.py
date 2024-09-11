from django.urls import path
from .views import UserOrdersAPIView, UserProductsAPIView

urlpatterns = [
    path("orders/", UserOrdersAPIView.as_view(), name="user_orders"),
    path("products/", UserProductsAPIView.as_view(), name="user_products"),
]
