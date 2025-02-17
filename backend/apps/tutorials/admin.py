from django.contrib import admin
from django.utils.html import format_html
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse
from django.urls import path

from polymorphic.admin import (
    PolymorphicInlineSupportMixin,
    StackedPolymorphicInline,
)
from .models import Tutorial, TutorialBlock, TextBlock, ImageBlock


class TextBlockInline(StackedPolymorphicInline.Child):
    model = TextBlock
    fields = ('order', 'text')
    extra = 0


class ImageBlockInline(StackedPolymorphicInline.Child):
    model = ImageBlock
    fields = ('order', 'image', 'image_preview')
    readonly_fields = ('image_preview',)
    extra = 0

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Предпросмотр изображения"


class TutorialBlockInline(StackedPolymorphicInline):
    model = TutorialBlock
    child_inlines = (TextBlockInline, ImageBlockInline)
    extra = 0


@admin.register(Tutorial)
class TutorialAdmin(PolymorphicInlineSupportMixin, admin.ModelAdmin):
    list_display = ('title', 'short_description')
    inlines = [TutorialBlockInline]
    # Используем свой шаблон change_form, чтобы добавить кнопку предпросмотра
    change_form_template = "admin/tutorial_change_form.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '<uuid:object_id>/preview/',
                self.admin_site.admin_view(self.preview_view),
                name='tutorial-preview',
            ),
        ]
        return custom_urls + urls

    def preview_view(self, request, object_id):
        tutorial = get_object_or_404(Tutorial, pk=object_id)
        context = dict(
            self.admin_site.each_context(request),
            tutorial=tutorial,
            blocks=tutorial.blocks,
        )
        return TemplateResponse(request, "admin/tutorial_preview.html", context)
