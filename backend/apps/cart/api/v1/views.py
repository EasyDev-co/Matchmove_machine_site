from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.cart.models import Cart
from .serializers import CartSerializer


class CartAPIView(APIView):

    def get(self, request):
        """Получение текущей активной корзины пользователя."""
        cart = get_object_or_404(Cart, user=request.user, is_active=True)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        """Создание новой корзины или получение существующей."""
        cart, created = Cart.objects.get_or_create(user=request.user, is_active=True)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    def delete(self, request):
        """Удаление корзины пользователя."""
        cart = get_object_or_404(Cart, user=request.user, is_active=True)
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
