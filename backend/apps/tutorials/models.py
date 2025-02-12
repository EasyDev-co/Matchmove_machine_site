from django.db import models
from polymorphic.models import PolymorphicModel
from apps.utils.models_mixins.models_mixins import UUIDMixin

class Tutorial(UUIDMixin):
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    short_description = models.CharField(max_length=1024, verbose_name="Короткое описание")
    cover = models.ImageField(verbose_name="Обложка", upload_to="tutorials")
    pdf = models.FileField(verbose_name="PDF", upload_to="tutorials/pdf")

    class Meta:
        verbose_name = "Tutorial"
        verbose_name_plural = "Tutorials"

    @property
    def blocks(self):
        text_blocks = list(self.tutorials_textblock_set.all())
        image_blocks = list(self.tutorials_imageblock_set.all())
        return sorted(text_blocks + image_blocks, key=lambda block: block.order)


class TutorialBlock(UUIDMixin, PolymorphicModel):
    tutorial = models.ForeignKey(
        Tutorial,
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)ss",
        verbose_name="Tutorial",
        null=True,
        default=None,
    )
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self._meta.model_name} ({self.order})"


class TextBlock(TutorialBlock):
    text = models.TextField(
        verbose_name="Текст",
        max_length=10024,
        default=None,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Текст"
        verbose_name_plural = "Текста"


class ImageBlock(TutorialBlock):
    image = models.ImageField(
        verbose_name="Изображение",
        upload_to="tutorials/images",
        default=None,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"
