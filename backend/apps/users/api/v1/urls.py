from django.urls import path
from .views import UserViewSet

urlpatterns = [
    path("user/", UserViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name="user"),
]
