import os
import logging

from functools import wraps
from celery import Celery, Task

from config.settings import CELERY_BROKER_URL

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

app = Celery("app", broker=CELERY_BROKER_URL)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

logger = logging.getLogger(__name__)


class BaseTask(Task):
    """Base Celery Task."""

    auto_retry_for = (Exception,)
    default_retry_delay = 3
    max_retries = 5
    countdown = 5

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.auto_retry_for and not hasattr(self, "_orig_run"):
            self._wrap_run_with_retry()

    def _wrap_run_with_retry(self):
        @wraps(self.run)
        def run(*args, **kwargs):
            try:
                return self._orig_run(*args, **kwargs)
            except self.auto_retry_for as exc:
                options = {"countdown": self.countdown, "exc": exc}
                raise self.retry(**options)

        self._orig_run, self.run = self.run, run

    def __call__(self, *args, **kwargs):
        return super().__call__(*args, **kwargs)

    def process(self, *args, **kwargs):
        raise NotImplementedError("Subclasses must implement this method")

    def run(self, *args, **kwargs):
        self.process(*args, **kwargs)

    def on_failure(self, exc, task_id, args, kwargs, einfo):
        logger.error(f"Task {self.name} (ID: {task_id}) failed. Error: {exc}. Details: {einfo}")

    def on_success(self, retval, task_id, args, kwargs):
        """Called after successful task processing"""
        logger.info(f"Task {self.name} (ID: {task_id}) completed successfully. Result: {retval}")
