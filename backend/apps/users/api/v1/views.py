from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from apps.users.models import User
from apps.users.api.v1.serializers import UserGetSerializer, UserUpdateSerializer


class UserAPIView(APIView):
    permission_classes = [IsAuthenticated]

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
