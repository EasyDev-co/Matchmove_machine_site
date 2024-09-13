from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin

from config.redoc import schema_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("apps.users.api.urls")),
    path("api/products/", include("apps.products.api.urls")),
    path("api/cart/", include("apps.cart.api.urls")),
    path("api/orders/", include("apps.orders.api.urls")),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
