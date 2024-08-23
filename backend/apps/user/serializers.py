from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from apps.user.validators import validate_custom_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """"Сериалайзер пользователя."""
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[
            validate_custom_password,
            validate_password
        ]
    )

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password',
            'name',
            'website',
            'portfolio',
            'about_me',
            'linkedin',
            'instagram',
            'youtube',
            'facebook',
            'vimeo',
            'profile_picture',
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }
