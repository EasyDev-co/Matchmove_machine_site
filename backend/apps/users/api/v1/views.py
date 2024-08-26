from django.db import IntegrityError
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.users.models import User
from .serializers import UserDetailSerializer, UserUpdateSerializer


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
