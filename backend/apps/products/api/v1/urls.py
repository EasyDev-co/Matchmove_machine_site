from django.urls import path
from .views import CameraListView, FormatListView, LensListView

urlpatterns = [
    path('cameras/', CameraListView.as_view(), name='camera-list'),
    path('formats/', FormatListView.as_view(), name='format-list'),
    path('lenses/', LensListView.as_view(), name='lens-list'),
]
