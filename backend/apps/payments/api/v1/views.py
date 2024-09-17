import logging

from apps.orders.models import Order
from apps.payments.services.transaction_service import TransactionService
from django.shortcuts import get_object_or_404
from rest_framework import views
from rest_framework.response import Response

logger = logging.getLogger(__name__)


class CreateTransactionAPIView(views.APIView):
    """
    Вьюсет для создания транзакции Paddle на основе существующего заказа.
    Пример body api запроса:
    {
        "order_id": "22",
        "address": {
            "description": "Head Office",
            "first_line": "4050 Jefferson Plaza, 41st Floor",
            "city": "New York",
            "postal_code": "10021",
            "region": "NY",
            "country_code": "US"
        }
    }
    """

    def post(self, request):
        user = request.user
        order_id = request.data.get("order_id")

        try:
            # Получаем заказ по его ID
            order = get_object_or_404(Order, id=order_id, user=user)

            # Проводим транзакцию по заказу
            transaction_service = TransactionService()
            transaction_response = transaction_service.process_transaction(user, order.id)

            # Возвращаем ответ с данными о транзакции
            return Response(transaction_response)
        except Exception as e:
            logger.error(f"Ошибка транзакции: {str(e)}")
            return Response({"error": str(e)}, status=500)
