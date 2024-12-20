from django.urls import path, include
from apps.products.api.v1.views import (
    CameraListView,
    FormatListView,
    LensListView,
    ProductListView,
    ProductDetailView,
    FileViewSet,
    UserProductsAPIView,
    ApprovedProductsAPIView,
    ProductCreateView,
)

urlpatterns = [
    path("cameras/", CameraListView.as_view(), name="camera-list"),
    path("formats/", FormatListView.as_view(), name="format-list"),
    path("lenses/", LensListView.as_view(), name="lens-list"),
    path("products/create/", ProductCreateView.as_view(), name="product-create"),
    path("products/", ProductListView.as_view(), name="product-list"),
    path("products/<uuid:pk>/", ProductDetailView.as_view(), name="product-detail"),
    path(
        "approved-products/",
        ApprovedProductsAPIView.as_view(),
        name="approved-product-list",
    ),
    path("user-products/", UserProductsAPIView.as_view(), name="user-product-list"),
    path("upload/", FileViewSet.as_view({"post": "upload"}), name="file-upload"),
    path(
        "download/<uuid:file_id>/",
        FileViewSet.as_view({"get": "download"}),
        name="file-download",
    ),
    path(
        "delete/<uuid:file_id>/",
        FileViewSet.as_view({"delete": "delete"}),
        name="file-delete",
    ),
    path("upload/", include("django_file_form.urls")),
]
