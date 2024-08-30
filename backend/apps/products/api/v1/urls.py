from django.urls import path
from .views import CameraListView, FormatListView, LensListView, ProductListView, ProductDetailView


urlpatterns = [
    path('cameras/', CameraListView.as_view(), name='camera-list'),
    path('formats/', FormatListView.as_view(), name='format-list'),
    path('lenses/', LensListView.as_view(), name='lens-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),
]
