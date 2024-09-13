from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin
from config import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("apps.users.api.urls")),
    path("api/products/", include("apps.products.api.urls")),
    path("api/cart/", include("apps.cart.api.urls")),
    path("api/payments/", include("apps.payments.api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
