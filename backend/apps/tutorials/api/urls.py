from django.urls import path, include

urlpatterns = [
    path('v1/', include('apps.tutorials.api.v1.urls')),
]