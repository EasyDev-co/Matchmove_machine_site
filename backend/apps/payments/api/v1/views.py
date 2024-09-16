import logging

from rest_framework import views
from rest_framework.response import Response

from apps.payments.services.transaction_service import TransactionService

logger = logging.getLogger(__name__)


class CreateTransactionAPIView(views.APIView):
    """
    Вьюсет для создании транзакции Paddle.
    Пример API request body:
    {
        "product_id": "e99955f1-cf57-4ac0-83f9-a5e4b89ad269",
        "address": {
            "description": "Head Office",
            "first_line": "4050 Jefferson Plaza, 41st Floor",
            "city": "New York",
            "postal_code": "10021",
            "region": "NY",
            "country_code": "US"
        }
    }
    Если пользователь ранее совершал транзакции, то адрес подтянется из Puddle
    """

    def post(self, request):
        user = request.user
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)
        address_data = request.data.get("address", None)

        transaction_service = TransactionService()

        try:
            transaction_response = transaction_service.process_transaction(
                user, product_id, quantity, address_data
            )
            return Response(transaction_response)
        except Exception as e:
            logger.error(f"Ошибка транзакции: {str(e)}")
            return Response({"error": str(e)}, status=500)
