import os
from config.celery import BaseTask, app
from apps.products.services import get_ftp_service
import logging

from django.core.mail import send_mail
from config.settings import EMAIL_HOST_USER, CONTACT_US_EMAIL


logger = logging.getLogger(__name__)


class UploadFileToFtpApiTask(BaseTask):
    """Задача для загрузки файла на FTP по его ID."""
    name = "upload_file_to_ftp_api"

    def process(self, file_path, file_id, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            ftp_service.upload_file_api(file_path, file_id)
            return f"File ID {file_id} has been successfully uploaded."
        except Exception as e:
            self.on_failure(exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None)
            print(f"Error uploading file ID {file_id}: {str(e)}")
            raise e


class DownloadFileFromFtpApiTask(BaseTask):
    """Задача для скачивания файла с FTP по его ID."""
    name = "download_file_from_ftp_api"

    def process(self, file_path, file_id, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            ftp_service.download_file_api(file_path, file_id)
            return f"File ID {file_id} has been successfully downloaded."
        except Exception as e:
            self.on_failure(exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None)
            print(f"Error downloading file ID {file_id}: {str(e)}")
            raise e


class DeleteFileFromFtpApiTask(BaseTask):
    """Задача для удаления файла с FTP по его ID."""
    name = "delete_file_from_ftp_api"

    def process(self, file_id, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            ftp_service.delete_file_api(file_id)
            return f"File ID {file_id} has been successfully deleted."
        except Exception as e:
            self.on_failure(exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None)
            print(f"Error deleting file ID {file_id}: {str(e)}")
            raise e


class UploadFileToFtpTask(BaseTask):
    """Задача для загрузки файла на FTP по его ID."""

    name = "upload_file_to_ftp"

    def process(self, file_content, file_id, file_extension, *args, **kwargs):
        ftp_service = get_ftp_service()
        try:
            logger.info(f"Начинаем загрузку файла с ID {file_id} на FTP")
            ftp_service.upload_file_content(file_content, file_id, file_extension)
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
            logger.info(f"Файл ID {file_id} успешно удалён с FTP")
        except Exception as e:
            logger.error(f"Ошибка при удалении файла ID {file_id} с FTP: {str(e)}")
            self.on_failure(
                exc=e, task_id=self.request.id, args=args, kwargs=kwargs, einfo=None
            )
            raise e


class NotificationAboutUploadProductTask(BaseTask):

    product_url = "https://grids.matchmovemachine.com/admin/products/product/{product_id}/change/"

    def process(self, product_id, *args, **kwargs):
        text_to_send = f"Загружен новый продукт: {self.product_url.format(product_id=product_id)}"
        try:
            send_mail(
                subject="New product",
                message=text_to_send,
                from_email=EMAIL_HOST_USER,
                recipient_list=(CONTACT_US_EMAIL,),
                fail_silently=False,
            )
        except Exception as e:
            logger.error("Error send new product email", exc_info=e)

# Регистрация задач в Celery
send_notification_about_new_product = app.register_task(NotificationAboutUploadProductTask())
upload_file_to_ftp = app.register_task(UploadFileToFtpTask())
download_file_from_ftp = app.register_task(DownloadFileFromFtpTask())
delete_file_from_ftp = app.register_task(DeleteFileFromFtpTask())
upload_file_to_ftp_api = app.register_task(UploadFileToFtpApiTask())
download_file_from_ftp_api = app.register_task(DownloadFileFromFtpApiTask())
delete_file_from_ftp_api = app.register_task(DeleteFileFromFtpApiTask())
