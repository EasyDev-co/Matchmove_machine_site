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
            ftp_service.upload_file(file_path, file_id)
            return f"File ID {file_id} has been successfully uploaded."
        except Exception as e:
            self.on_failure(exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None)
            print(f"Error uploading file ID {file_id}: {str(e)}")
            raise e


class DownloadFileFromFtpTask(BaseTask):
    """Задача для скачивания файла с FTP по его ID."""
    name = "download_file_from_ftp"

    def process(self, file_path, file_id, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            ftp_service.download_file(file_path, file_id)
            return f"File ID {file_id} has been successfully downloaded."
        except Exception as e:
            self.on_failure(exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None)
            print(f"Error downloading file ID {file_id}: {str(e)}")
            raise e

# Регистрация задач в Celery
upload_file_to_ftp = app.register_task(UploadFileToFtpTask())
download_file_from_ftp = app.register_task(DownloadFileFromFtpTask())
