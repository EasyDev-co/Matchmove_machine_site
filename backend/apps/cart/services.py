from django.shortcuts import get_object_or_404
from apps.cart.models import Cart, CartItem
from apps.orders.models import Order, OrderItem
from apps.products.models import Product


class CartService:
    def __init__(self, user):
        self.user = user

    def get_or_create_cart(self):
        """Получаем активную корзину пользователя или создаем новую, если необходимо."""
        cart = Cart.objects.filter(user=self.user).first()
        if not cart:
            cart = Cart.objects.create(user=self.user)
        elif not cart.is_active:
            cart.is_active = True
            cart.save()
        return cart

    def add_product(self, product_id):
        """Добавляет продукт в корзину пользователя, проверяя на наличие в оплаченных заказах или дублирование"""
        product = Product.objects.get(id=product_id)
        cart = self.get_or_create_cart()

        # Проверяем, есть ли продукт в уже оплаченных заказах
        paid_orders = Order.objects.filter(
            user=self.user, is_paid=True
        )
        paid_order_items = OrderItem.objects.filter(
            order__in=paid_orders, product=product
        )
        if paid_order_items.exists():
            raise ValueError("Product has already been purchased.")

        # Проверяем, есть ли продукт уже в корзине
        existing_cart_item = CartItem.objects.filter(
            cart=cart, product=product
        ).first()
        if existing_cart_item:
            raise ValueError("Product is already in the cart.")

        # Добавляем товар в корзину
        cart_item = CartItem.objects.create(
            cart=cart, product=product
        )
        return cart_item

    @staticmethod
    def delete_item(cart_item_id):
        """Удаление товара из корзины."""
        cart_item = get_object_or_404(CartItem, id=cart_item_id)
        cart_item.delete()

    def close_cart(self):
        """Закрытие корзины. Нельзя закрыть пустую корзину."""
        cart = self.get_or_create_cart()
        if not cart.items.exists():
            raise ValueError("Корзина пуста. Невозможно закрыть корзину.")
        cart.is_active = False
        cart.save()
        return cart
