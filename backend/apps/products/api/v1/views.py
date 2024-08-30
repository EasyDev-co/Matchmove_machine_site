import os

from apps.products.api.v1.serializers import FileSerializer
from apps.products.models.files import File
from apps.products.services import FTPDownloadUploadService, FTPManager
from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class FileViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.ftp_service = FTPDownloadUploadService(
            ftp_manager=FTPManager(),
            host=os.getenv('FTP_HOST'),
            username=os.getenv('FTP_USERNAME'),
            password=os.getenv('FTP_PASSWORD'),
        )

    def upload(self, request):
        """Эндпоинт для загрузки файла на FTP."""
        file = request.FILES.get('file')
        if not file:
            return Response(
                {'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST
            )
        # Сохраняем файл на локальном диске
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        # Создание записи о файле в базе данных с использованием сериализатора
        file_data = {'file': file.name}
        serializer = FileSerializer(data=file_data)
        if serializer.is_valid():
            file_instance = serializer.save()
            # Загрузка файла на FTP с ID как частью имени
            self.ftp_service.upload_file(file_path, str(file_instance.id))

            # Удаляем временный файл после загрузки
            os.remove(file_path)

            return Response(
                {'id': file_instance.id}, status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def download(self, request, file_uuid):
        """Эндпоинт для получения файла с FTP."""
        # Получаем объект файла из базы данных по его ID
        try:
            File.objects.get(id=file_uuid)
        except File.DoesNotExist:
            return Response(
                {'error': 'File not found.'}, status=status.HTTP_404_NOT_FOUND
            )
        # Путь для сохранения
        destination_path = os.path.join(settings.MEDIA_ROOT, f"{file_uuid}")  # Используем ID
        try:
            self.ftp_service.download_file(file_uuid, destination_path)  # Передаем ID для скачивания
            return Response(
                {'message': f'File downloaded to {destination_path}'}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
