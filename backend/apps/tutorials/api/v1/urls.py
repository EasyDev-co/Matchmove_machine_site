from django.urls import path
from apps.tutorials.api.v1.views import TutorialListAPIView, TutorialRetrieveAPIView

urlpatterns = [
    path('tutorials/', TutorialListAPIView.as_view(), name='tutorial-list'),
    path('tutorials/<uuid:id>/', TutorialRetrieveAPIView.as_view(), name='tutorial-detail'),
]
