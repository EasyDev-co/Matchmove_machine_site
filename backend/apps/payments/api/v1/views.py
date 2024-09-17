import logging

from apps.orders.services import OrderService
from apps.payments.services.transaction_service import TransactionService
from rest_framework import views
from rest_framework.response import Response

logger = logging.getLogger(__name__)


class CreateTransactionAPIView(views.APIView):
    """
    Вьюсет для создания транзакции Paddle на основе существующего заказа.
    """

    def post(self, request):
        user = request.user

        try:
            # Создаем заказ из корзины пользователя
            order_service = OrderService(user)
            order = order_service.create_order_from_cart()

            # Проводим транзакцию по заказу
            transaction_service = TransactionService()
            transaction_response = transaction_service.process_transaction(
                user, order.id
            )

            # Возвращаем ответ с данными о транзакции
            return Response(transaction_response)
        except Exception as e:
            logger.error(f"Ошибка транзакции: {str(e)}")
            return Response({"error": str(e)}, status=500)