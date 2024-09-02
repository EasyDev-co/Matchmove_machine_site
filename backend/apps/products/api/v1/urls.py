from django.urls import path
from apps.products.api.v1.views import (
    CameraListView,
    FormatListView,
    LensListView,
    ProductListView,
    ProductDetailView,
    FileViewSet
)


urlpatterns = [
    path('cameras/', CameraListView.as_view(), name='camera-list'),
    path('formats/', FormatListView.as_view(), name='format-list'),
    path('lenses/', LensListView.as_view(), name='lens-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<uuid:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('upload/', FileViewSet.as_view({'post': 'upload'}), name='file-upload'),
    path('download/<str:file_id>/', FileViewSet.as_view({'get': 'download'}), name='file-download'),
]
