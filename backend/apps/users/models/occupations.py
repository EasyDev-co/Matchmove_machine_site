from django.db import models
from django.utils.translation import gettext_lazy as _


class Occupations(models.TextChoices):
    FIRST_AC = "1st AC", _("1st AC")
    THIRD_MODEL = "3D Modeler", _("3D Modeler")
    ANIMATOR = "Animator", _("Animator")
    CAMERAMAN = "Cameraman", _("Cameraman")
    CHARACTER_ARTIST = "Character Artist", _("Character Artist")
    COMPOSITOR = "Compositor", _("Compositor")
    CONCEPT_ARTIST = "Concept Artist", _("Concept Artist")
    DOP = "DoP", _("DoP")
    ENVIRONMENT_ARTIST = "Environment Artist", _("Environment Artist")
    LIGHTING_ARTIST = "Lighting Artist", _("Lighting Artist")
    ON_SET_SUPERVISOR = "On-set supervisor", _("On-set supervisor")
    VFX_ARTIST = "VFX Artist", _("VFX Artist")
    VFX_SUPERVISOR = "VFX supervisor", _("VFX supervisor")
    OTHER = "Other", _("Other")
