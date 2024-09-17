from apps.orders.models import Order, OrderItem
from apps.products.api.v1.serializers import ProductSerializer
from rest_framework import serializers


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = Order
        fields = ["id", "user", "total_price", "items", "created_at", "updated_at"]
