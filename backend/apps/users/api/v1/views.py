from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import transaction, IntegrityError
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.db.models import Q, Count
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.users.api.v1.serializers import (
    EmailAndCodeSerializer,
    EmailSerializer,
    PasswordChangeSerializer,
    UserRegistrationSerializer,
    UserTokenObtainPairSerializer,
    UserDetailSerializer,
    UserUpdateSerializer,
    UserRankingSerializer,
    ContactUsSerializer,
)
from apps.users.api.v1.pagination import CustomPagination
from apps.users.utils import send_notification_email
from apps.users.tasks import send_confirm_code, send_contact_us_tasks
from apps.exeptions.api_exeptions import InvalidCode
from apps.users.models.code import CodePurpose, ConfirmCode
from apps.users.models.users import AdminNotificationLogs

from loguru import logger

User = get_user_model()


class UserDetailViewSet(viewsets.ReadOnlyModelViewSet):
    """Предоставление информации о пользователе по ID"""

    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        user_id = kwargs.get("pk")
        logger.info(f"userId: {user_id}")
        try:
            user = User.objects.get(pk=user_id)
            logger.info(f"user: {user}")
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        logger.info(f"user: {user.id} {user.username}")
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.GenericViewSet):
    """Обновление данных пользователя"""

    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = UserUpdateSerializer(
            instance=user, data=request.data, partial=True
        )
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except IntegrityError as e:
                error_message = str(e).lower()
                if "email" in error_message:
                    error_data = {"email": ["Адрес электронной почты недоступен"]}
                elif "phone_number" in error_message:
                    error_data = {"phone_number": ["Номер телефона недоступен"]}
                else:
                    error_data = {"message": "Произошла ошибка при сохранении"}
                return Response(data=error_data, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """Получение детальной информации о пользователе."""
        instance = request.user
        user_data = User.objects.get(pk=instance.pk)
        user_serializer = UserDetailSerializer(user_data)
        return Response(user_serializer.data)

    def patch(self, request, *args, **kwargs):
        """Изменение информации о пользователе."""
        instance = request.user
        serializer = UserUpdateSerializer(
            instance=instance, data=request.data, partial=True
        )
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except IntegrityError as e:
                error_message = str(e).lower()
                if "email" in error_message:
                    error_data = {"email": ["Адрес электронной почты недоступен"]}
                elif "phone_number" in error_message:
                    error_data = {"phone_number": ["Номер телефона недоступен"]}
                else:
                    error_data = {"message": "Произошла ошибка при сохранении"}
                return Response(data=error_data, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterView(APIView):
    """Вьюсет регистрации."""

    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        # Извлекаем данные из запроса
        email = request.data.get('email')

        # Проверка существования пользователя с такой электронной почтой
        user = User.objects.filter(email=email).first()

        if user:
            if not user.is_verified:
                # Отправляем email с кодом подтверждения
                send_confirm_code.delay(
                    user_id=user.pk, code_purpose=CodePurpose.CONFIRM_EMAIL
                )
                return Response(
                    {"message": "A confirmation code has been sent to your email."},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "User is already verified."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Если пользователь не существует, создаем нового пользователя
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Генерация QR-кода после сохранения пользователя
            user.generate_qr_code()
            user.save()

            # Отправляем email с кодом подтверждения
            send_confirm_code.delay(
                user_id=user.pk, code_purpose=CodePurpose.CONFIRM_EMAIL
            )

            return Response(
                {
                    "message": "Пользователь успешно зарегистрирован!",
                    "qr_code_url": user.qr_code.url,  # Возвращаем ссылку на QR-код
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

    permission_classes = [AllowAny]
    email_serializer = EmailAndCodeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.email_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]
        user = User.objects.get(email=email)
        try:
            self.validate_code(
                user=user,
                code=code,
                purpose=CodePurpose.CONFIRM_EMAIL,
            )
        except InvalidCode:
            return Response(
                {"message": InvalidCode.default_detail},
                status=status.HTTP_400_BAD_REQUEST,
            )
        with transaction.atomic():
            user.is_verified = True
            user.save()
            ConfirmCode.objects.filter(code=code).update(is_used=True)
        refresh_token = RefreshToken.for_user(user)
        return Response(
            {
                "user": str(user.id),
                "refresh": str(refresh_token),
                "access": str(refresh_token.access_token),
            },
            status=status.HTTP_201_CREATED,
        )


class ResetPasswordAPIView(APIView):
    """Представление для восстановления пароля."""

    permission_classes = [AllowAny]
    email_serializer = EmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.email_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        user = User.objects.get(email=email)

        send_confirm_code.delay(
            user_id=user.pk,
            code_purpose=CodePurpose.RESET_PASSWORD,
        )

        return Response(
            data={
                "message": "Код для восстановления пароля отправлен на указанный email."
            },
            status=status.HTTP_200_OK,
        )


class PasswordChangeAPIView(ConfirmCodeMixin, APIView):
    """Представление для смены пароля пользователя."""

    password_change_serializer = PasswordChangeSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.password_change_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        new_password = serializer.validated_data["new_password"]
        confirm_password = serializer.validated_data["confirm_password"]
        code = request.data.get("code")
        # добавлено двойное подтверждение пароля
        if new_password != confirm_password:
            return Response(
                {"message": "Пароли не совпадают."}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.get(email=email)
        self.validate_code(
            user=user,
            code=code,
            purpose=CodePurpose.RESET_PASSWORD,
        )
        with transaction.atomic():
            user.password = make_password(new_password)
            user.save()
            ConfirmCode.objects.filter(code=code).update(is_used=True)

        subject = "Password Change Notification"
        message = (
            f"Hello, {user.username}!\n\n"
            "Your password has been changed. If this was not you, please contact support."
        )
        send_notification_email(subject, message, user.email)
        return Response(
            {"message": "Пароль успешно изменен."}, status=status.HTTP_200_OK
        )


class UserLoginView(TokenObtainPairView):
    """Вьюсет логина."""

    permission_classes = [AllowAny]
    serializer_class = UserTokenObtainPairSerializer


class UserLogoutView(APIView):
    """Вьюсет для логаута."""

    def post(self, request):
        try:
            logout_token = request.data["refresh"]
            token = RefreshToken(logout_token)
            token.blacklist()
            return Response(
                {"message": "Успешный выход из системы."},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserRankingListView(ListAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserRankingSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = User.objects.filter(is_superuser=False, is_staff=False).annotate(
            total_products=Count('products', filter=Q(products__is_approved=True))
        ).order_by('-total_products', 'username')
        return queryset


class ContactAsApiView(APIView):
    permission_classes = (AllowAny, )
    contact_serializer = ContactUsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.contact_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        AdminNotificationLogs.objects.create(
            email=serializer.validated_data["email"],
            text=serializer.validated_data["text"],
            type=AdminNotificationLogs.TypeNotification.CONTACT_US,
        )

        send_contact_us_tasks.delay(serializer.validated_data["email"], serializer.validated_data["text"])
