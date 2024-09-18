import os
from config.celery import BaseTask, app
from apps.products.services import get_ftp_service
import logging

logger = logging.getLogger(__name__)


class UploadFileToFtpTask(BaseTask):
    """Задача для загрузки файла на FTP по его ID."""

    name = "upload_file_to_ftp"

    def process(self, file_path, file_id, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            logger.info(f"Начинаем загрузку файла с ID {file_id} на FTP")
            ftp_service.upload_file(file_path, file_id)
            logger.info(f"Файл ID {file_id} успешно загружен на FTP")
        except Exception as e:
            logger.error(f"Ошибка при загрузке файла ID {file_id} на FTP: {str(e)}")
            self.on_failure(
                exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None
            )
            raise e


class DownloadFileFromFtpTask(BaseTask):
    """Задача для скачивания файла с FTP по его ID."""

    name = "download_file_from_ftp"

    def process(self, file_path, file_id, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            logger.info(f"Начинаем загрузку файла с FTP с ID {file_id}")
            ftp_service.download_file(file_path, file_id)
            logger.info(f"Файл ID {file_id} успешно загружен с FTP")
        except Exception as e:
            logger.error(f"Ошибка при скачивании файла ID {file_id} с FTP: {str(e)}")
            self.on_failure(
                exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None
            )
            raise e


class DeleteFileFromFtpTask(BaseTask):
    """Задача для удаления файла с FTP по его ID."""

    name = "delete_file_from_ftp"

    def process(self, file_id, file_extension, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            logger.info(
                f"Начинаем удаление файла с FTP с ID {file_id} и расширением {file_extension}"
            )
            ftp_service.delete_file(file_id, file_extension)
            logger.info(f"Файл ID {file_id} успешно удален с FTP")
        except Exception as e:
            logger.error(f"Ошибка при удалении файла ID {file_id} с FTP: {str(e)}")
            self.on_failure(
                exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None
            )
            raise e


# Регистрация задач в Celery
upload_file_to_ftp = app.register_task(UploadFileToFtpTask())
download_file_from_ftp = app.register_task(DownloadFileFromFtpTask())
delete_file_from_ftp = app.register_task(DeleteFileFromFtpTask())
