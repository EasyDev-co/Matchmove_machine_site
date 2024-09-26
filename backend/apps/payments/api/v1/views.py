import logging

from apps.orders.models import Order
from apps.payments.services.transaction_service import TransactionService
from django.shortcuts import get_object_or_404
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
from paddle_billing.Notifications import Secret, Verifier
from apps.payments.services.paddle_webhook_service import PaddleWebhookService


logger = logging.getLogger(__name__)


class CreateTransactionAPIView(views.APIView):
    """
    Вьюсет для создания транзакции Paddle на основе существующего заказа.
    Создает в Puddle adress, customer, price, products,
    И на их основании создает транзакцию
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


class PaddleWebhookAPIView(views.APIView):
    """
    API для приема уведомлений вебхуков Paddle о оплаченных транзакциях.
    Вам нужно настроить уведомления на этот API для событий transaction.paid в вашей панели управления Paddle.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Создаем экземпляр сервиса с request
        webhook_service = PaddleWebhookService(request)

        # Проверяем подпись вебхука
        if not webhook_service.verify_signature():
            logger.error("Проверка подписи не удалась.")
            return Response({'detail': 'Неверная подпись'}, status=status.HTTP_403_FORBIDDEN)

        logger.info(f"Получено действительное уведомление от Paddle: {request.data}")

        # Обрабатываем событие, если проверка успешна
        response_data, response_status = webhook_service.process_event()
        return Response(response_data, status=response_status)