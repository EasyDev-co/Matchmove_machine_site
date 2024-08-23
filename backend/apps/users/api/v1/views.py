from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserGetSerializer, UserUpdateSerializer


class UserAPIView(APIView):
    permission_classes = [
        IsAuthenticated
    ]  # Ограничиваем доступ только для авторизованных пользователей

    def get(self, request, *args, **kwargs):
        """Получение детальной информации о пользователе."""
        user = request.user
        serializer = UserGetSerializer(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        """Обновление информации о пользователе."""
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
