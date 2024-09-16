from django.urls import include, path

urlpatterns = [
    path('v1/', include('apps.payments.api.v1.urls')),
]
