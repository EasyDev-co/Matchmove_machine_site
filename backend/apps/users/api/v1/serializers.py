from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.models import User


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Сериализатор для авторизации пользователя."""

    def validate(self, attrs):
        authenticate_kwargs = {
            "email": attrs["email"],
            "password": attrs["password"],
        }
        user = authenticate(**authenticate_kwargs)

        if user is None or not user.is_active:
            raise ValidationError("Нет такого пользователя.")
        if not user.is_verified:
            raise ValidationError("Email не подтвержден.")

        refresh = RefreshToken.for_user(user)
        refresh["email"] = user.email
        refresh["role"] = user.role

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "website",
            "portfolio",
            "about_me",
            "linkedin",
            "instagram",
            "youtube",
            "facebook",
            "vimeo",
            "profile_picture",
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "website",
            "portfolio",
            "about_me",
            "linkedin",
            "instagram",
            "youtube",
            "facebook",
            "vimeo",
            "profile_picture",
        ]
