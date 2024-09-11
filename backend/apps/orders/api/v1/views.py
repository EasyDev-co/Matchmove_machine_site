from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.orders.models import Order
from .serializers import OrderSerializer
from apps.utils.pagination import StandardPagination


class UserOrdersAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")
