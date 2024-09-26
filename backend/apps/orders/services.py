from decimal import Decimal

from django.db import transaction

from apps.cart.models import Cart
from apps.orders.models import Order, OrderItem


class OrderService:
    """Сервис для создания и обработки заказов."""

    def __init__(self, user):
        self.user = user

    def create_order_from_cart(self):
        """Создание заказа из корзины пользователя."""

        with transaction.atomic():  # Обеспечиваем атомарность транзакций
            # Получение корзины пользователя
            cart = Cart.objects.filter(user=self.user, is_active=True).first()
            if not cart:
                raise ValueError("Cart not found or inactive.")
            if not cart.items:
                raise ValueError("Cart is empty, could not create order.")

            # Создание заказа
            order = Order.objects.create(
                user=self.user, total_price=Decimal('0.00')
            )

            # Создание элементов заказа из корзины
            for cart_item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=cart_item.product,
                    quantity=cart_item.quantity,
                    price=cart_item.total_price
                )

            # Обновление общей стоимости заказа
            order.total_price = order.calculate_total_price()
            order.save()

            return order

    def get_last_order(self):
        """Получить последний заказ пользователя."""

        # Получаем последний заказ пользователя
        last_order = Order.objects.filter(user=self.user).order_by('-created_at').first()

        if not last_order:
            raise ValueError("No orders found for the user.")

        return last_order