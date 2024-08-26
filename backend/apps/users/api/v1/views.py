from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.users.api.v1.serializers import (
    EmailAndCodeSerializer,
    UserRegistrationSerializer,
    UserTokenObtainPairSerializer
)
from apps.users.tasks import send_confirm_code
from apps.exeptions.api_exeptions import InvalidCode

from apps.users.models.code import CodePurpose, ConfirmCode


User = get_user_model()


class UserRegisterView(APIView):
    """Вьюсет регистрации."""
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            validate_data = serializer.validated_data
            password = validate_data.pop("password")
            user = User.objects.create_user(
                password=password,
                **validate_data,
            )
            user.save()
            send_confirm_code.delay(
                user_id=user.pk,
                code_purpose=CodePurpose.CONFIRM_EMAIL
            )
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ConfirmCodeMixin:
    @classmethod
    def validate_code(cls, user, code, purpose):
        """Проверка кода пользователя."""
        confirm_code = ConfirmCode.objects.filter(
            user=user,
            code=code,
            purpose=purpose,
            is_used=False,
        ).first()

        if not confirm_code or confirm_code.is_expired:
            raise InvalidCode


class EmailVerificationCodeAPIView(ConfirmCodeMixin, APIView):
    """Представление для верификации кода при регистрации пользователя."""
    email_serializer = EmailAndCodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.email_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        user = User.objects.get(email=email)
        try:
            self.validate_code(
                user=user,
                code=code,
                purpose=CodePurpose.CONFIRM_EMAIL,
            )
        except InvalidCode:
            return Response(
                {'message': InvalidCode.default_detail},
                status=status.HTTP_400_BAD_REQUEST
            )
        with transaction.atomic():
            user.is_verified = True
            user.save()
            ConfirmCode.objects.filter(code=code).update(is_used=True)
        refresh_token = RefreshToken.for_user(user)
        return Response(
            {
                'user': str(user.id),
                'refresh': str(refresh_token),
                'access': str(refresh_token.access_token)
            }, status=status.HTTP_201_CREATED
        )


class UserLoginView(TokenObtainPairView):
    """Вьюсет логина."""

    serializer_class = UserTokenObtainPairSerializer


class UserLogoutView(APIView):
    """Вьюсет для логаута."""
    def post(self, request):
        try:
            logout_token = request.data["refresh"]
            token = RefreshToken(logout_token)
            token.blacklist()
            return Response(
                {"message": "Logged out successfully."},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
