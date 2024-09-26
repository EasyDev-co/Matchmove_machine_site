import logging

from apps.orders.models import Order
from apps.orders.services import OrderService
from apps.utils.pagination import StandardPagination
from rest_framework import generics, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import OrderSerializer


logger = logging.getLogger(__name__)


class UserOrdersAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")


class CreateOrderAPIView(views.APIView):
    """Вьюсет для создания заказа из корзины пользователя."""

    def post(self, request):
        user = request.user

        try:
            # Создаем заказ из корзины пользователя
            order_service = OrderService(user)
            order = order_service.create_order_from_cart()

            # Возвращаем информацию о заказе
            return Response({
                "order_id": order.id,
                "total_price": order.total_price,
                "created_at": order.created_at
            })
        except Exception as e:
            logger.error(f"Ошибка при создании заказа: {str(e)}")
            return Response({"error": str(e)}, status=500)


class LastOrderAPIView(views.APIView):
    """APIView для получения последнего заказа пользователя и списка товаров."""

    def get(self, request):
        user = request.user
        order_service = OrderService(user)

        try:
            # Получаем последний заказ пользователя
            last_order = order_service.get_last_order()

            # Сериализуем данные заказа
            order_serializer = OrderSerializer(last_order)

            return Response({
                "order": order_serializer.data,
            })
        except ValueError as e:
            return Response({"error": str(e)}, status=404)
