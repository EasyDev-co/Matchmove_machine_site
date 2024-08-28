from rest_framework.generics import ListAPIView
from apps.products.models import Camera, Format, Lens
from .serializers import CameraSerializer, FormatSerializer, LensSerializer


class CameraListView(ListAPIView):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer


class FormatListView(ListAPIView):
    queryset = Format.objects.all()
    serializer_class = FormatSerializer


class LensListView(ListAPIView):
    queryset = Lens.objects.all()
    serializer_class = LensSerializer
