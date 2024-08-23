from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from apps.users.validators import validate_custom_password

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
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
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Сериализатор для авторизации пользователя."""

    def validate(self, attrs):
        authenticate_kwargs = {
            'username': attrs['username'],
            'password': attrs['password'],
        }
        user = authenticate(**authenticate_kwargs)
        if user is None or not user.is_active:
            raise ValidationError('Нет такого пользователя.')
        refresh = RefreshToken.for_user(user)
        refresh['username'] = user.username
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
