from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.cart.models import Cart, CartItem
from apps.products.models.products import Product
from .serializers import CartSerializer, CartItemSerializer


class CartAPIView(APIView):

    def get(self, request):
        """Получение текущей активной корзины пользователя."""
        cart, created = Cart.objects.get_or_create(user=request.user, is_active=True)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        """Добавление товаров в корзину или обновление существующих."""
        cart, created = Cart.objects.get_or_create(user=request.user, is_active=True)
        product_id = request.data.get('product')
        quantity = request.data.get('quantity', 1)

        product = get_object_or_404(Product, id=product_id)  # Правильная модель
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not item_created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)

        cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        """Обновление количества товара в корзине."""
        cart = get_object_or_404(Cart, user=request.user, is_active=True)
        cart_item = get_object_or_404(CartItem, cart=cart, id=pk)

        quantity = request.data.get('quantity', 1)
        cart_item.quantity = int(quantity)
        cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """Удаление товара из корзины."""
        cart = get_object_or_404(Cart, user=request.user, is_active=True)
        cart_item = get_object_or_404(CartItem, cart=cart, id=pk)
        cart_item.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
