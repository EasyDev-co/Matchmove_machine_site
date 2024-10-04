from rest_framework import serializers
from apps.cart.models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(
        source="product.price", max_digits=10, decimal_places=2, read_only=True
    )
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "price", "product_name"]

    def get_product_name(self, obj):
        """Формирует название продукта из камеры и линзы"""
        camera_name = obj.product.camera
        lens_brand = obj.product.lens.brand
        lens_model = obj.product.lens.model_name
        return f"{camera_name} {lens_brand} {lens_model}"


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "user", "is_active", "items", "total_price"]

    def get_total_price(self, obj):
        """Подсчет общей стоимости всех товаров в корзине."""
        return sum(item.total_price for item in obj.items.all())
