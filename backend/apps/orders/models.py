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

    def calculate_total_price(self):
        return sum(item.price for item in self.items.all())

    def save(self, *args, **kwargs):
        # Если это новая запись (нет pk), сохраняем объект без рассчета цены
        if not self.pk:
            super().save(*args, **kwargs)

        self.total_price = self.calculate_total_price()

        Order.objects.filter(pk=self.pk).update(total_price=self.total_price)

    def __str__(self):
        return f"Заказ {self.id} для {self.user.username}"


class OrderItem(models.Model):
    """Модель элемента заказа."""

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} (x{self.quantity})"
