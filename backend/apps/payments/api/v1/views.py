from rest_framework import views
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import logging

from apps.products.models.products import Product
from apps.payments.services import (
    fetch_or_create_customer,
    fetch_or_create_product,
    create_price,
    create_transaction,
    get_latest_address,
    create_address
)


logger = logging.getLogger(__name__)


class CreateTransactionAPIView(views.APIView):
    """
    Вьюсет для создания транзакции в Paddle.
    Пример body api запроса:
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
    Если адрес у клиента уже есть то его не нужно подтягивать в теле запроса
    """

    def post(self, request):
        user = request.user
        product = get_object_or_404(Product, id=request.data['product_id'])
        quantity = request.data.get('quantity', 1)
        address_data = request.data.get('address', None)  # Получаем данные адреса из запроса

        try:
            customer_id, _ = fetch_or_create_customer(user, address_data)

            if address_data:
                # Используем адрес из запроса
                address_id = create_address(customer_id, address_data).get('id')
            else:
                # Подтягиваем адрес из Paddle
                address_id = get_latest_address(customer_id)
                if not address_id:
                    logger.warning(f"No existing address found for customer {customer_id}.")

            product_id = fetch_or_create_product(product.id)
            price_id = create_price(product_id, product.price)
            transaction_response = create_transaction(
                price_id, customer_id, quantity, address_id
            )

            return Response(transaction_response.json())
        except Exception as e:
            logger.error(f"Transaction error: {str(e)}")
            return Response({"error": str(e)}, status=500)
