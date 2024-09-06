from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.cart.models import Cart, CartItem, Order, OrderItem
from apps.products.models.products import Product
from .serializers import CartSerializer, CartItemSerializer


class CartAPIView(APIView):

    def get(self, request):
        """Получение активной корзины пользователя и всех товаров в ней."""
        cart, created = Cart.objects.get_or_create(user=request.user, is_active=True)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        """Добавление товаров в корзину или обновление существующих."""
        cart, created = Cart.objects.get_or_create(user=request.user, is_active=True)
        product_id = request.data.get('product')
        quantity = request.data.get('quantity', 1)

        product = get_object_or_404(Product, id=product_id)
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

    def checkout(self, request):
        """Формирование заказа и закрытие корзины."""
        cart = get_object_or_404(Cart, user=request.user, is_active=True)

        if not cart.items.exists():
            return Response({"error": "Корзина пуста"}, status=status.HTTP_400_BAD_REQUEST)

        # Подсчет общей стоимости
        total_price = sum(item.total_price for item in cart.items.all())

        # Создаем заказ
        order = Order.objects.create(user=request.user, total_price=total_price)

        # Переносим товары из корзины в заказ
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        # Закрываем корзину
        cart.close_cart()

        return Response({"status": "Заказ успешно сформирован", "order_id": order.id}, status=status.HTTP_200_OK)
