from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from apps.orders.models import Order
from .serializers import OrderSerializer


class OrderPagination(PageNumberPagination):
    page_size = 15


class UserOrdersAPIView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = OrderPagination

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")
