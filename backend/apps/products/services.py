import logging
from contextlib import contextmanager
from ftplib import FTP

from apps.products.models.files import File

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


    def download_file(self, file_id: str, destination_path: str) -> None:
        """Скачивание файла с FTP по его ID."""
        remote_file_path = f"{file_id}"

        with self.ftp_manager.connect_and_login(self.host, self.username, self.password, self.port) as ftp:
            with open(destination_path, "wb") as local_file:
                ftp.retrbinary(f"RETR {remote_file_path}", local_file.write)


    def get_file_by_id(self, file_id: str) -> File:
        """Получение файла по его ID."""
        print(f"Fetching file with ID: {file_id}")
        return File.objects.get(id=file_id)
