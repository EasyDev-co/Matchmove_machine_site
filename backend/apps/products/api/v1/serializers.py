from rest_framework import serializers
from apps.products.models.products import Product
from apps.products.models.cameras import Camera
from apps.products.models.lens import Lens
from apps.products.models.file_formats import Format
from apps.users.models.users import User
from apps.products.models.files import File


class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = "__all__"


class LensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lens
        fields = "__all__"


class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "profile_picture",
            "qr_code",
            "facebook",
            "twitter",
            "linkedin",
            "instagram",
            "reddit",
        ]


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    camera = CameraSerializer()
    lens = LensSerializer()
    file_format = FormatSerializer()
    author = UserSerializer()
    file = FileSerializer()

    class Meta:
        model = Product
        fields = "__all__"


class ProductCreateSerializer(serializers.ModelSerializer):
    camera = serializers.PrimaryKeyRelatedField(queryset=Camera.objects.all(), required=False)
    lens = serializers.PrimaryKeyRelatedField(queryset=Lens.objects.all(), required=False)
    file_format = serializers.PrimaryKeyRelatedField(queryset=Format.objects.all(), required=False)
    file = serializers.PrimaryKeyRelatedField(queryset=File.objects.all(), required=False)
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Product
        fields = "__all__"


class ProductDetailSerializer(serializers.ModelSerializer):
    camera = CameraSerializer()
    lens = LensSerializer()
    file_format = FormatSerializer()
    author = UserSerializer()
    file = FileSerializer()

    class Meta:
        model = Product
        fields = "__all__"
