from rest_framework import serializers
from apps.tutorials.models import Tutorial, TextBlock, ImageBlock


class TextBlockSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = TextBlock
        fields = ('id', 'order', 'type', 'text')

    def get_type(self, obj):
        return "TextBlock"


class ImageBlockSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = ImageBlock
        fields = ('id', 'order', 'type', 'image')

    def get_type(self, obj):
        return "ImageBlock"


class TutorialBlockPolymorphicSerializer(serializers.Serializer):
    """
    Универсальный сериализатор для полиморфных блоков.
    В зависимости от типа экземпляра выбираем нужный сериализатор.
    """
    def to_representation(self, instance):
        if isinstance(instance, TextBlock):
            return TextBlockSerializer(instance, context=self.context).data
        elif isinstance(instance, ImageBlock):
            return ImageBlockSerializer(instance, context=self.context).data
        else:
            return {
                'id': instance.id,
                'order': instance.order,
                'type': instance.__class__.__name__,
            }


class TutorialListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = ('id', 'title', 'short_description', 'cover', 'pdf')


class TutorialDetailSerializer(serializers.ModelSerializer):
    blocks = serializers.SerializerMethodField()

    class Meta:
        model = Tutorial
        fields = ('id', 'title', 'short_description', 'cover', 'pdf', 'blocks')

    def get_blocks(self, obj):
        blocks = obj.blocks
        serializer = TutorialBlockPolymorphicSerializer(blocks, many=True, context=self.context)
        return serializer.data
