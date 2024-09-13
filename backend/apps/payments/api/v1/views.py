from rest_framework import views
from rest_framework.response import Response
from django.conf import settings
import requests

from apps.products.models.products import Product
from django.shortcuts import get_object_or_404
import logging

logger = logging.getLogger(__name__)


class CreateTransactionAPIView(views.APIView):

    def post(self, request):
        # Получаем текущего пользователя
        user = request.user

        # Пример данных для клиента
        customer_data = {
            "email": user.email,
            "name": user.username,
        }

        # Ищем клиента по email через Paddle API
        list_customers_url = 'https://sandbox-api.paddle.com/customers'
        search_params = {'email': user.email}

        customer_list_response = requests.get(
            list_customers_url,
            params=search_params,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )

        # Проверяем ответ Paddle
        if customer_list_response.status_code == 200:
            customers_data = customer_list_response.json().get('data', [])
            if customers_data:
                # Если клиент найден, используем его ID
                customer_id = customers_data[0]['id']
                logger.info(f"Customer found with ID: {customer_id}")
            else:
                # Если клиента нет, создаем нового
                logger.warning(f"Customer with email {user.email} not found. Creating new customer...")

                customer_create_response = requests.post(
                    'https://sandbox-api.paddle.com/customers',
                    json=customer_data,
                    headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
                )
                
                if customer_create_response.status_code != 200:
                    logger.error(f"Error creating customer: {customer_create_response.text}")
                    return Response(
                        {"error": "Failed to create customer", "details": customer_create_response.text},
                        status=customer_create_response.status_code
                    )
                
                customer_id = customer_create_response.json()['data']['id']
                logger.info(f"Successfully created new customer with ID: {customer_id}")
        else:
            logger.error(f"Error fetching customers: {customer_list_response.text}")
            return Response(
                {"error": "Failed to fetch customers", "details": customer_list_response.text},
                status=customer_list_response.status_code
            )


        # Получаем продукт по ID из запроса
        product = get_object_or_404(Product, id=request.data['product_id'])

        # Попытка найти продукт по имени (используем product.id)
        search_product_url = 'https://sandbox-api.paddle.com/products'
        search_params = {'name': str(product.id)}

        product_search_response = requests.get(
            search_product_url,
            params=search_params,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )

        if product_search_response.status_code == 200:
            product_data_list = product_search_response.json().get('data', [])
            if product_data_list:
                # Продукт найден, получаем его ID
                product_id = product_data_list[0]['id']
                logger.info(f"Product found with ID: {product_id}")
            else:
                # Продукт не найден, создаем новый
                product_data = {
                    "name": str(product.id),
                    "tax_category": "standard",
                    "description": product.category or "",
                    "type": "standard",
                }
                logger.info(f"Creating product with data: {product_data}")
                product_create_response = requests.post(
                    'https://sandbox-api.paddle.com/products',
                    json=product_data,
                    headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
                )

                if product_create_response.status_code != 201:
                    return Response(
                        {"error": "Failed to create product", "details": product_create_response.text},
                        status=product_create_response.status_code
                    )

                product_id = product_create_response.json()['data']['id']
                logger.info(f"Successfully created product with ID: {product_id}")
        else:
            return Response(
                {"error": "Failed to search for products", "details": product_search_response.text},
                status=product_search_response.status_code
            )


        # Пример данных для цены
        price_data = {
            "description": "Base price for product",
            "product_id": product_id,
            "unit_price": {
                #умножаем цену на 100 так как puddle принимает целые числа за центы
                "amount": str(int(product.price * 100)),
                "currency_code": "USD"
            },
            "name": "Standard Price",
            "billing_cycle": None,
            "trial_period": None,
            "tax_mode": "account_setting",
            "quantity": {
                "minimum": 1,
                "maximum": 100
            }
        }

        # Логируем данные перед созданием цены
        logger.info(f"Creating price with data: {price_data}")

        # Создаем цену
        price_response = requests.post(
            'https://sandbox-api.paddle.com/prices',
            json=price_data,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )

        # Логируем статус ответа от Paddle
        logger.info(f"Price creation response status: {price_response.status_code}")
        logger.info(f"Price creation response data: {price_response.text}")

        # Проверяем, если произошла ошибка
        if price_response.status_code != 201:
            logger.error(f"Error creating price: {price_response.text}")
            return Response(
                {"error": "Failed to create price", "details": price_response.text},
                status=price_response.status_code
            )

        price_response_data = price_response.json()
        price_id = price_response_data['data']['id']
        logger.info(f"Successfully created price with ID: {price_id}")

        # Формируем данные для транзакции
        transaction_data = {
            "items": [
                {
                    'price_id': price_id,
                    "quantity": request.data.get('quantity', 1)
                }
            ],
            "customer_id": customer_id,
            "currency_code": "USD",
            "collection_mode": "automatic"
        }

        # Проведение транзакции
        transaction_response = requests.post(
            'https://sandbox-api.paddle.com/transactions',
            json=transaction_data,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )

        # Возвращаем ответ
        return Response(transaction_response.json())
