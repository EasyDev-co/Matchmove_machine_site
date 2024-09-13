import logging
import os
from contextlib import contextmanager
from ftplib import FTP


logger = logging.getLogger(__name__)


class FTPConnectionError(Exception):
    pass


class FTPManager:
    @contextmanager
    def connect_and_login(self, host: str, username: str, password: str, port: int = 21):
        """Контекстный менеджер для установления и закрытия FTP соединения."""
        ftp = None
        try:
            ftp = FTP()
            ftp.connect(host=host, port=port)
            ftp.login(username, password)
            yield ftp
        except Exception as e:
            logger.exception("FTP connection error: %s", e)
            raise FTPConnectionError(e)
        finally:
            if ftp:
                ftp.quit()
                print("Disconnected from FTP server")


class FTPDownloadUploadService:
    def __init__(self, ftp_manager: FTPManager, host: str, username: str, password: str, port: int = 21):
        self.ftp_manager = ftp_manager
        self.host = host
        self.username = username
        self.password = password
        self.port = port

    def upload_file(self, file_path: str, file_id: str) -> None:
        """Загрузка файла на FTP с именем по ID."""
        remote_file_path = f"{file_id}"

        with self.ftp_manager.connect_and_login(self.host, self.username, self.password, self.port) as ftp:
            with open(file_path, "rb") as local_file:
                ftp.storbinary(f"STOR {remote_file_path}", local_file)
        self.delete_local_file(file_path)

    def download_file(self, file_path: str, file_id: str) -> None:
        """Скачивание файла с FTP по его ID."""
        remote_file_path = f"{file_id}"

        with self.ftp_manager.connect_and_login(self.host, self.username, self.password, self.port) as ftp:
            with open(file_path, "wb") as local_file:
                ftp.retrbinary(f"RETR {remote_file_path}", local_file.write)

    def delete_file(self, file_id: str) -> None:
        """Удаление файла с FTP по его ID."""
        remote_file_path = f"{file_id}"

        with self.ftp_manager.connect_and_login(self.host, self.username, self.password, self.port) as ftp:
            ftp.delete(remote_file_path)


    def delete_local_file(self, file_path: str) -> None:
        """Удаляет файл с локального сервера."""
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info(f"File {file_path} was successfully deleted from the local server.")
            except Exception as e:
                logger.error(f"Error deleting file {file_path}: {str(e)}")
        else:
            logger.warning(f"File {file_path} was not found on the local server.")


def get_ftp_service():
    """Создает и возвращает экземпляр FTPDownloadUploadService."""
    return FTPDownloadUploadService(
        ftp_manager=FTPManager(),
        host=os.getenv("FTP_HOST"),
        username=os.getenv("FTP_USERNAME"),
        password=os.getenv("FTP_PASSWORD"),
    )
