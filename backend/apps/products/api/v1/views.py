import os

from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from rest_framework import generics, filters, status, viewsets
from rest_framework.generics import ListAPIView

from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from apps.products.models import Camera, Format, Lens, Product, File

from apps.products.tasks import (
    download_file_from_ftp,
    upload_file_to_ftp,
    delete_file_from_ftp
)
from .serializers import (
    ProductDetailSerializer,
    CameraSerializer,
    FormatSerializer,
    LensSerializer,
    ProductSerializer,
    FileSerializer
)


import logging
logger = logging.getLogger(__name__)


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class CameraListView(ListAPIView):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer


class FormatListView(ListAPIView):
    queryset = Format.objects.all()
    serializer_class = FormatSerializer


class LensListView(ListAPIView):
    queryset = Lens.objects.all()
    serializer_class = LensSerializer


class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['author__username', 'category', 'file_format__name']
    filterset_fields = {
        'camera': ['exact'],
        'lens': ['exact'],
        'file_format': ['exact'],
        'access_type': ['exact'],
        'price': ['gte', 'lte'],
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        access_type = self.request.query_params.get('access_type')
        if access_type:
            queryset = queryset.filter(access_type=access_type)
        return queryset


class FileViewSet(viewsets.ViewSet):

    def upload(self, request):
        """Эндпоинт для загрузки файла на FTP."""
        file = request.FILES.get("file")
        if not file:
            return Response(
                {"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Сохраняем файл на локальном диске
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Создание записи о файле в базе данных с использованием сериализатора
        file_data = {"file": file.name}
        serializer = FileSerializer(data=file_data)
        if serializer.is_valid():
            file_instance = serializer.save()

            # Отправляем задачу на загрузку файла в Celery
            upload_file_to_ftp.delay(file_path, str(file_instance.id))
            return Response(
                {"id": file_instance.id}, status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def download(self, request, file_id):
        """Эндпоинт для получения файла с FTP."""
        # Получаем объект файла из базы данных по его ID
        try:
            File.objects.get(id=file_id)
        except File.DoesNotExist:
            return Response(
                {"error": "File not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # Путь для сохранения
        file_path = os.path.join(settings.MEDIA_ROOT, f"{file_id}")
        # Отправляем задачу на скачивание файла в Celery
        download_file_from_ftp.delay(file_path, file_id)

        return Response(
            {"message": f"File downloaded to {file_path}"},
            status=status.HTTP_200_OK
        )


    def delete(self, request, file_id):
        """Эндпоинт для удаления файла с FTP."""
        try:
            # Поиск продукта, который использует файл с данным ID и проверка автора
            Product.objects.get(file__id=file_id, author=request.user)
            file_instance = File.objects.get(id=file_id)
        except Product.DoesNotExist:
            return Response(
                {"error": "File not found or you don't have permission to delete it."},
                status=status.HTTP_404_NOT_FOUND
            )
        except File.DoesNotExist:
            return Response(
                {"error": "File not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Удаление файла с FTP
        delete_file_from_ftp.delay(file_id)

        # Удаление файла из базы данных
        file_instance.delete()

        return Response(
            {"message": f"File {file_id} successfully deleted."},
            status=status.HTTP_200_OK
        )

