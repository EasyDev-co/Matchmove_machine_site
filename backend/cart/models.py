from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Cart(models.Model):
    """Модель корзины."""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='cart',
        verbose_name='Пользователь',
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Корзина активна',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def close_cart(self):
        """Закрыть корзину и подготовить к созданию заказа."""
        self.is_active = False
        self.save()

    def __str__(self):
        return f"Корзина для {self.user.username}"
