import logging
import os
from contextlib import contextmanager
from ftplib import FTP

logger = logging.getLogger(__name__)


class FTPConnectionError(Exception):
    pass


class FTPManager:
    @contextmanager
    def connect_and_login(
        self, host: str, username: str, password: str, port: int = 21
    ):
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
                logger.info("Disconnected from FTP server")


class FTPDownloadUploadService:
    def __init__(
        self,
        ftp_manager: FTPManager,
        host: str,
        username: str,
        password: str,
        port: int = 21,
    ):
        self.ftp_manager = ftp_manager
        self.host = host
        self.username = username
        self.password = password
        self.port = port

    def upload_file(self, file_path: str, file_id: str) -> None:
        """Загрузка файла на FTP с расширением."""
        file_extension = os.path.splitext(file_path)[1]
        if not file_extension:
            logger.error(f"У файла {file_path} нет расширения. Операция прервана.")
            return

        remote_file_path = f"{file_id}{file_extension}"
        logger.info(f"Загрузка файла на FTP: {file_path} -> {remote_file_path}")

        if not os.path.exists(file_path):
            logger.error(f"Файл {file_path} не найден на локальном сервере.")
            return

        with self.ftp_manager.connect_and_login(
            self.host, self.username, self.password, self.port
        ) as ftp:
            with open(file_path, "rb") as local_file:
                ftp.storbinary(f"STOR {remote_file_path}", local_file)

    def download_file(self, file_path: str, file_id: str) -> None:
        """Скачивание файла с FTP по его ID и расширению."""
        file_extension = os.path.splitext(file_path)[1]
        if not file_extension:
            logger.error(f"У файла {file_path} нет расширения. Операция прервана.")
            return

        remote_file_path = f"{file_id}{file_extension}"
        logger.info(f"Загрузка файла с FTP: {remote_file_path} -> {file_path}")

        with self.ftp_manager.connect_and_login(
            self.host, self.username, self.password, self.port
        ) as ftp:
            with open(file_path, "wb") as local_file:
                ftp.retrbinary(f"RETR {remote_file_path}", local_file.write)

    def delete_file(self, file_id: str, file_extension: str) -> None:
        """Удаление файла с FTP по его ID и расширению."""
        remote_file_path = f"{file_id}{file_extension}"
        logger.info(f"Попытка удаления файла с FTP: {remote_file_path}")

        with self.ftp_manager.connect_and_login(
            self.host, self.username, self.password, self.port
        ) as ftp:
            try:
                files_list = ftp.nlst()
                logger.info(f"Список файлов на FTP: {files_list}")

                if remote_file_path in files_list:
                    ftp.delete(remote_file_path)
                    logger.info(f"Файл {remote_file_path} успешно удален с FTP.")
                else:
                    logger.error(f"Файл {remote_file_path} не найден на FTP.")
            except Exception as e:
                logger.error(f"Ошибка при удалении файла {remote_file_path}: {str(e)}")
                raise


def get_ftp_service():
    """Создает и возвращает экземпляр FTPDownloadUploadService."""
    return FTPDownloadUploadService(
        ftp_manager=FTPManager(),
        host=os.getenv("FTP_HOST"),
        username=os.getenv("FTP_USERNAME"),
        password=os.getenv("FTP_PASSWORD"),
    )
