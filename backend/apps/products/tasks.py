from celery import shared_task

from apps.products.services import get_ftp_service


@shared_task
def upload_file_to_ftp(file_path, file_id):
    """Загрузка файла на FTP с именем по ID."""
    ftp_service = get_ftp_service()
    try:
        ftp_service.upload_file(file_path, file_id)
        return f"File ID {file_id} has been successfully uploaded."
    except Exception as e:
        print(f"Error uploading file ID {file_id}: {str(e)}")


@shared_task
def download_file_from_ftp(file_path, file_id):
    """Скачивание файла с FTP по его ID."""
    ftp_service = get_ftp_service()
    try:
        ftp_service.download_file(file_path, file_id)
        return f"File ID {file_id} has been successfully downloaded."
    except Exception as e:
        print(f"Error downloading file ID {file_id}: {str(e)}")
