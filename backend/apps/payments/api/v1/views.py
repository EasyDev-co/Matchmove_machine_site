import logging

from apps.orders.models import Order
from apps.payments.services.transaction_service import TransactionService
from django.shortcuts import get_object_or_404
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


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
    API для принятия вебхуков оплаченных транзакций.
    В кабинете Puddle требуется поставить notifications на этот api для событий transaction.paid
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        body = request.data

        if not isinstance(body, dict):
            logger.error("Получен неверный формат данных.")
            return Response({'detail': 'Неверный формат данных'}, status=status.HTTP_400_BAD_REQUEST)

        logger.info(f"Получено действительное уведомление от Paddle: {body}")

        # Получаем тип транзакции
        alert_name = body.get('event_type')
        # Получаем id транзакции
        transaction_id = body.get('data', {}).get('id')

        if alert_name == 'transaction.paid':
            order = get_object_or_404(Order, transaction_id=transaction_id)
            # Отмечаем заказ с transaction.paid как оплаченный
            order.is_paid = True
            order.save()
            logger.info(f"Заказ {order.id} обновлен как оплаченный.")
            logger.info("Транзакция оплачена.")
            return Response({'status': 'успех'}, status=status.HTTP_200_OK)

        logger.warning(f"Необработанный тип события: {alert_name}")
        return Response({'detail': 'Необработанный тип события'}, status=status.HTTP_400_BAD_REQUEST)
