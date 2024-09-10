from django.shortcuts import get_object_or_404
from apps.cart.models import Cart, CartItem
from apps.products.models import Product


class CartService:
    def __init__(self, user):
        self.user = user

    def get_or_create_cart(self):
        """Получаем активную корзину пользователя или создаем новую, если необходимо."""
        cart = Cart.objects.filter(user=self.user, is_active=True).first()
        if not cart:
            cart = Cart.objects.create(user=self.user)
        return cart

    def add_product(self, product_id, quantity=1):
        """Добавление товара в корзину."""
        cart = self.get_or_create_cart()
        product = get_object_or_404(Product, id=product_id)

        if product.stock < quantity:
            raise ValueError(f"Недостаточно товара '{product.name}' на складе")

        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not item_created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)

        cart_item.save()
        return cart_item

    def update_quantity(self, cart_item_id, quantity):
        """Обновление количества товара в корзине."""
        cart_item = get_object_or_404(CartItem, id=cart_item_id)

        if quantity < 1:
            raise ValueError("Количество товара не может быть меньше 1")

        cart_item.quantity = int(quantity)
        cart_item.save()
        return cart_item

    def delete_item(self, cart_item_id):
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
