from rest_framework import serializers
from apps.products.models.products import Product
from apps.products.models.cameras import Camera
from apps.products.models.lens import Lens
from apps.products.models.file_formats import Format
from apps.users.models.users import User
from apps.products.models.files import File


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = '__all__'


class LensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lens
        fields = '__all__'


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class ProductDetailSerializer(serializers.ModelSerializer):
    camera = CameraSerializer()
    lens = LensSerializer()
    file_format = FormatSerializer()
    author = UserSerializer()
    file = FileSerializer()

    class Meta:
        model = Product
        fields = '__all__'