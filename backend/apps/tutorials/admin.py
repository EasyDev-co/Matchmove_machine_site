# admin.py
from django.contrib import admin
from polymorphic.admin import (
    PolymorphicInlineModelAdmin,
    PolymorphicInlineSupportMixin,
)
from adminsortable2.admin import SortableInlineAdminMixin
from .models import Tutorial, TextBlock, ImageBlock, TutorialBlock


class MySortableInlineAdminMixin(SortableInlineAdminMixin):
    def __init__(self, *args, **kwargs):
        # Удаляем лишний параметр, который передаёт polymorphic inline
        kwargs.pop('parent_inline', None)
        super().__init__(*args, **kwargs)


class TextBlockInline(MySortableInlineAdminMixin, admin.StackedInline):
    model = TextBlock
    extra = 0


class ImageBlockInline(MySortableInlineAdminMixin, admin.StackedInline):
    model = ImageBlock
    extra = 0


class TutorialBlockInline(PolymorphicInlineModelAdmin):
    model = TutorialBlock
    child_inlines = [TextBlockInline, ImageBlockInline]
    sortable_field_name = "order"


@admin.register(Tutorial)
class TutorialAdmin(PolymorphicInlineSupportMixin, admin.ModelAdmin):
    inlines = [TutorialBlockInline]
