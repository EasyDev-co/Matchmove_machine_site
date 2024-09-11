from apps.orders.models import Order
from django.core.paginator import Paginator


class OrderService:
    def __init__(self, user):
        self.user = user

    def get_user_orders(self, page_number=1, items_per_page=15):
        """Получение всех заказов пользователя с пагинацией."""
        orders = Order.objects.filter(user=self.user).order_by("-created_at")
        paginator = Paginator(orders, items_per_page)
        return paginator.get_page(page_number)

    def get_user_products(self, page_number=1, items_per_page=15):
        """Получение всех продуктов пользователя с пагинацией."""
        products = self.user.products.all()
        paginator = Paginator(products, items_per_page)
        return paginator.get_page(page_number)
