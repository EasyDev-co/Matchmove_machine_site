from rest_framework import serializers
from apps.users.models import User
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from apps.users.validators import validate_custom_password

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Сериалайзер пользователя для регистрации."""

    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_custom_password, validate_password],
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password",
            "qr_code",
            "occupation",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.generate_qr_code()  # Генерация QR-кода при создании пользователя
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "website",
            "portfolio",
            "about_me",
            "whatsapp",
            "messenger",
            "twitter",
            "telegram",
            "reddit",
            "linkedin",
            "instagram",
            "youtube",
            "facebook",
            "vimeo",
            "profile_picture",
            "password",
            "occupation",
        ]
        extra_kwargs = {"password": {"write_only": True}}


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "website",
            "portfolio",
            "about_me",
            "whatsapp",
            "messenger",
            "twitter",
            "telegram",
            "reddit",
            "linkedin",
            "instagram",
            "youtube",
            "facebook",
            "vimeo",
            "profile_picture",
            "occupation",
            "qr_code",
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "website",
            "portfolio",
            "about_me",
            "whatsapp",
            "messenger",
            "twitter",
            "telegram",
            "reddit",
            "linkedin",
            "instagram",
            "youtube",
            "facebook",
            "vimeo",
            "profile_picture",
            "occupation",
        ]


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Сериализатор для авторизации пользователя."""

    def validate(self, attrs):
        authenticate_kwargs = {
            # Используем email вместо username для аутентификации
            "email": attrs.get("email"),
            "username": attrs.get("username"),
            "password": attrs["password"],
        }
        user = authenticate(**authenticate_kwargs)

        if user is None or not user.is_active:
            raise ValidationError("Нет такого пользователя.")
        if not user.is_verified:
            raise ValidationError("Email не подтвержден.")

        refresh = RefreshToken.for_user(user)
        refresh["email"] = user.email
        refresh["username"] = user.username

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class EmailSerializer(serializers.Serializer):
    """Сериализатор для проверки email."""

    email = serializers.EmailField()

    def validate_email(self, value):
        user = User.objects.filter(email=value).first()
        if not user:
            raise ValidationError("Нет такого пользователя.")
        return value

class ContactUsSerializer(serializers.Serializer):
    """Сериализатор для связи с администратопром"""

    email = serializers.EmailField()
    text = serializers.CharField()


class EmailAndCodeSerializer(EmailSerializer):
    """Сериализатор для проверки кода."""

    code = serializers.CharField()


class PasswordChangeSerializer(EmailAndCodeSerializer):
    """Сериализатор для смены пароля."""

    new_password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[
            validate_custom_password,
            validate_password,
        ],
    )
    confirm_password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[
            validate_custom_password,
            validate_password,
        ],
    )


class UserRankingSerializer(serializers.ModelSerializer):
    total_products = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'profile_picture', 'total_products')

class RecaptchaSerializer(serializers.Serializer):
    recaptcha_token = serializers.CharField(required=True)
    # Добавь другие поля, если необходимо