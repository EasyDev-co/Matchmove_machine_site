from django.db import models
from django.contrib.auth import get_user_model
from apps.products.models import Product


User = get_user_model()


class Order(models.Model):
    """Модель заказа."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_paid = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=255, blank=True, null=True)

    def calculate_total_price(self):
        return sum(item.price for item in self.items.all())

    def __str__(self):
        return f"Заказ {self.id} для {self.user.username}"


class OrderItem(models.Model):
    """Модель элемента заказа."""

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
