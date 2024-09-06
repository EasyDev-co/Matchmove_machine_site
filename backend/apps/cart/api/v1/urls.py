from django.urls import path
from .views import CartAPIView

urlpatterns = [
    path('cart/', CartAPIView.as_view(), name='cart'),
    path('cart/<int:pk>/', CartAPIView.as_view(), name='cart_item'),
    path('cart/checkout/', CartAPIView.as_view(), name='checkout'),
]
