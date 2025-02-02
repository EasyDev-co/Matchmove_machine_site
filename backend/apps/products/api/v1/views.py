import os
import logging

from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.db import transaction
from rest_framework import generics, filters, status, viewsets, serializers
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from apps.utils.pagination import StandardPagination
from apps.utils.permissions import IsAuthorOrReadOnly

from apps.products.models import Camera, Format, Lens, Product, File
from apps.products.tasks import (
    download_file_from_ftp_api,
    upload_file_to_ftp_api,
    delete_file_from_ftp_api,
)
from .serializers import (
    ProductDetailSerializer,
    ProductCreateSerializer,
    CameraSerializer,
    FormatSerializer,
    LensSerializer,
    ProductSerializer,
    FileSerializer,
)
from apps.products.models.products import AccessType, AssetCategory

logger = logging.getLogger(__name__)


class ProductCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all().select_related(
        'camera',
        'lens',
        'file_format',
        'file',
        'author',
    )
    serializer_class = ProductCreateSerializer

    def perform_create(self, serializer):
        file = serializer.validated_data.get("file")
        if file and file.author != self.request.user:
            raise serializers.ValidationError(
                {"error": "You can only associate your own files with products."}
            )
        # Сохраняем продукт с текущим пользователем как автором
        product = serializer.save(author=self.request.user)

        # Генерация QR-кода после сохранения продукта
        product.generate_qr_code()
        product.save()

        response_data = {
            "message": "Product successfully created!",
            "product_id": product.id,
            "qr_code_url": product.qr_code.url if product.qr_code else None,
            "access_type": product.access_type,
            "category": product.category,
            "camera": product.camera.model_name if product.camera else None,
            "lens": product.lens.model_name if product.lens else None,
            "file_format": product.file_format.format_type if product.file_format else None,
            "price": product.price,
            "description": product.description,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthorOrReadOnly]
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class CameraListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Camera.objects.filter(is_active=True)
    serializer_class = CameraSerializer


class FormatListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Format.objects.all()
    serializer_class = FormatSerializer


class LensListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Lens.objects.filter(is_active=True)
    serializer_class = LensSerializer


class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class ProductListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = [
        "author__username",
        "category",
        "file_format__format_type",
        "camera__model_name",
        "lens__brand",
        "lens__model_name",
    ]
    filterset_fields = {
        "camera": ["exact"],
        "lens": ["exact"],
        "file_format": ["exact"],
        "access_type": ["exact"],
        "price": ["gte", "lte"],
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        access_type = self.request.query_params.get("access_type")
        if access_type:
            queryset = queryset.filter(access_type=access_type)
        return queryset


class FileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def upload(self, request):
        """Эндпоинт для загрузки файла на FTP."""
        file = request.FILES.get("file")

        camera = request.data.get("camera")
        lens_manufacturer = request.data.get("lensManufacturer")
        lens_model = request.data.get("lensModel")
        description = request.data.get("description")
        file_format = request.data.get("fileFormat")

        if not file:
            return Response(
                {"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        if not all([camera, lens_manufacturer, lens_model, description]):
            return Response(
                {"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Сохраняем файл на локальном диске
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Создание записи о файле в базе данных с использованием сериализатора
        file_data = {"file": file, "name": file.name, "author": request.user.id}
        serializer = FileSerializer(data=file_data)
        if serializer.is_valid():
            file_instance = serializer.save()

            upload_file_to_ftp_api.delay(file_path, str(file_instance.id))

            camera_model_lower = camera.lower()
            lens_brand_lower = lens_manufacturer.lower()
            lens_model_lower = lens_model.lower()

            with transaction.atomic():
                camera_instance = Camera.objects.filter(
                    Q(model__icontains=camera_model_lower) | Q(model__iexact=camera_model_lower)
                ).first()

                if not camera_instance:
                    camera_instance = Camera.objects.create(
                        model=camera,
                        is_active=False,
                    )

                lens_instance = Lens.objects.filter(
                    Q(brand__icontains=lens_brand_lower) & Q(model__icontains=lens_model_lower)
                ).first()

                if not lens_instance:
                    lens_instance = Lens.objects.create(
                        brand=lens_manufacturer,
                        model_name=lens_model,
                        is_active=False,
                    )

                format_file = Format.objects.filter(format_type__icontains=file_format).first()
                if not format_file:
                    return Response(
                        {"error": "Unsupported file format not found"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                Product.objects.create(
                    access_type=AccessType.FREE,
                    category=AssetCategory.DISTORTION_GRIDS,
                    is_approved=False,
                    camera=camera_instance,
                    lens=lens_instance,
                    file_format=format_file,
                    description=description,
                    file=file_instance,
                    author=request.user,
                )

            return Response({"id": file_instance.id}, status=status.HTTP_201_CREATED)

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
        download_file_from_ftp_api.delay(file_path, file_id)

        return Response(
            {"message": f"File downloaded to {file_path}"}, status=status.HTTP_200_OK
        )

    def delete(self, request, file_id):
        """Эндпоинт для удаления файла с FTP."""
        try:
            # Retrieve the file and check if the request user is the author
            file_instance = File.objects.get(id=file_id, author=request.user)
        except File.DoesNotExist:
            return Response(
                {"error": "File not found or you don't have permission to delete it."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Удаление файла с FTP
        delete_file_from_ftp_api.delay(file_id)

        # Удаление файла из базы данных
        file_instance.delete()

        return Response(
            {"message": f"File {file_id} successfully deleted."},
            status=status.HTTP_200_OK,
        )


class ApprovedProductsAPIView(ListAPIView):
    """Возвращает список продуктов, которые прошли модерацию (is_approved=True)."""

    queryset = Product.objects.filter(is_approved=True)
    serializer_class = ProductSerializer
    pagination_class = StandardPagination
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = [
        "author__username",
        "category",
        "file_format__format_type",
        "camera__model_name",
        "lens__brand",
        "lens__model_name",
    ]
    filterset_fields = {
        "camera": ["exact"],
        "lens": ["exact"],
        "file_format": ["exact"],
        "access_type": ["exact"],
        "price": ["gte", "lte"],
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        access_type = self.request.query_params.get("access_type")
        if access_type:
            queryset = queryset.filter(access_type=access_type)
        return queryset


class UserProductsAPIView(ListAPIView):
    """Возвращает список всех продуктов текущего пользователя, вне зависимости от статуса модерации."""

    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_queryset(self):
        return Product.objects.filter(author=self.request.user)
