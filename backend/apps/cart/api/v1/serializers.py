from rest_framework import serializers
from apps.cart.models import Cart


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'user', 'is_active', 'created_at', 'updated_at']
