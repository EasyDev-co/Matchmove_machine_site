import os

from apps.products.api.v1.serializers import FileSerializer
from apps.products.models.files import File
from apps.products.tasks import download_file_from_ftp, upload_file_to_ftp
from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class FileViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

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
