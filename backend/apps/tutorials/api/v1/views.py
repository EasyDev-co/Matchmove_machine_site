from rest_framework import generics

from apps.tutorials.models import Tutorial
from apps.tutorials.api.v1.serializers import TutorialListSerializer, TutorialDetailSerializer
from apps.tutorials.api.pagination import TutorialPagination


class TutorialListAPIView(generics.ListAPIView):
    """
    API для получения списка туториалов с пагинацией.
    """
    queryset = Tutorial.objects.all().order_by('title')
    serializer_class = TutorialListSerializer
    pagination_class = TutorialPagination


class TutorialRetrieveAPIView(generics.RetrieveAPIView):
    """
    API для детального просмотра туториала по его ID.
    """
    queryset = Tutorial.objects.all()
    serializer_class = TutorialDetailSerializer
    lookup_field = 'id'
