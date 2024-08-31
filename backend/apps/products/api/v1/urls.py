from apps.products.api.v1.views import FileViewSet
from django.urls import path

urlpatterns = [
    path('upload/', FileViewSet.as_view({'post': 'upload'}), name='file-upload'),
    path('download/<str:file_id>/', FileViewSet.as_view({'get': 'download'}), name='file-download'),
]
