from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.users.api.v1.serializers import (
    UserRegistrationSerializer,
    UserTokenObtainPairSerializer
)


User = get_user_model()


class UserRegisterView(APIView):
    """Вьюсет регистрации."""
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            validate_data = serializer.validated_data
            password = validate_data.pop("password")
            with transaction.atomic():
                user = User.objects.create_user(
                    password=password,
                    **validate_data,
                )
                user.save()
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
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
