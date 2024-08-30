from django.urls import path
from .views import ProductDetailView

urlpatterns = [
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
