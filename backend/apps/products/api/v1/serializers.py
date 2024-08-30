from rest_framework import serializers
from apps.products.models.products import Product
from apps.products.models import Camera, Format, Lens


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = '__all__'


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = '__all__'


class LensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lens
        fields = '__all__'
