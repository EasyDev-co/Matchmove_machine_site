from django.db import models
from django.utils.translation import gettext_lazy as _


class Occupations(models.TextChoices):
    EDITOR = "editor", _("Editor")
    DIRECTOR = "director", _("Director")
    SCRIPTWRITER = "scriptwriter", _("Scriptwriter")
    PRODUCER = "producer", _("Producer")
