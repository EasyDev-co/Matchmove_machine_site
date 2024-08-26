from django.urls import path, include


urlpatterns = [
    path("v1/", include("apps.users.api.v1.urls")),
]