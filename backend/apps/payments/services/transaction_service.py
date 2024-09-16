import logging

import requests
from django.conf import settings
from django.shortcuts import get_object_or_404

from apps.payments.services.data_preparers import DataPreparer
from apps.products.models.products import Product

logger = logging.getLogger(__name__)


class PaddleService:
    """Набор функций для создания транзакций."""

    def __init__(self):
        self.base_url = settings.PADDLE_API_BASE_URL
        self.api_key = settings.PADDLE_API_KEY
        self.headers = {"Authorization": f"Bearer {self.api_key}"}

    def _get(self, url, params=None):
        try:
            response = requests.get(
                url,
                params=params,
                headers=self.headers
            )
            response.raise_for_status()
            return response.json().get("data", [])
        except requests.RequestException as e:
            logger.error(f"Ошибка при выполнении GET запроса: {str(e)}")
            logger.error(f"Содержимое ответа GET запроса: {response.content}")
            raise Exception("Запрос не выполнен")

    def _post(self, url, data):
        try:
            response = requests.post(
                url,
                json=data,
                headers=self.headers
            )
            response.raise_for_status()
            return response.json().get("data", {})
        except requests.RequestException as e:
            logger.error(f"Ошибка при выполнении POST запроса: {str(e)}")
            logger.error(f"Данные POST запроса: {data}")
            logger.error(f"Содержимое ответа POST запроса: {response.content}")
            raise Exception("Запрос не выполнен")

    def get_customer(self, email):
        list_customers_url = f"{self.base_url}/customers"
        search_params = {"email": email}
        return self._get(list_customers_url, search_params)

    def create_customer(self, email, name):
        create_customer_url = f"{self.base_url}/customers"
        customer_data = {"email": email, "name": name}
        return self._post(create_customer_url, customer_data)

    def get_latest_address(self, customer_id):
        list_addresses_url = f"{self.base_url}/customers/{customer_id}/addresses"
        addresses = self._get(list_addresses_url)
        if addresses:
            addresses.sort(key=lambda x: x["updated_at"], reverse=True)
            return addresses[0]["id"]
        return None

    def create_address(self, customer_id, address_data):
        create_address_url = f"{self.base_url}/customers/{customer_id}/addresses"
        return self._post(create_address_url, address_data)

    def get_product(self, product_name):
        search_product_url = f"{self.base_url}/products"
        search_params = {"name": product_name}
        return self._get(search_product_url, search_params)

    def create_product(self, product_data):
        create_product_url = f"{self.base_url}/products"
        return self._post(create_product_url, product_data)

    def create_price(self, product_id, price_amount):
        create_price_url = f"{self.base_url}/prices"
        price_data = DataPreparer.prepare_price_data(product_id, price_amount)
        return self._post(create_price_url, price_data)

    def create_transaction(
            self, price_id, customer_id, quantity, address_id=None
    ):
        create_transaction_url = f"{self.base_url}/transactions"
        transaction_data = DataPreparer.prepare_transaction_data(
            price_id, customer_id, quantity, address_id
        )
        return self._post(create_transaction_url, transaction_data)


class TransactionService:
    """"Формирования сценария взаимодействия при проведении транзакции."""

    def __init__(self):
        self.paddle_service = PaddleService()

    def process_transaction(
        self, user, product_id, quantity=1, address_data=None
    ):
        # Получаем или создаем покупателя в Puddle
        customers = self.paddle_service.get_customer(user.email)
        if customers:
            customer_id = customers[0]["id"]
            latest_address_id = self.paddle_service.get_latest_address(
                customer_id
            )
            if address_data and not latest_address_id:
                created_address = self.paddle_service.create_address(
                    customer_id, address_data
                )
                latest_address_id = created_address.get("id")
            address_id = latest_address_id
        else:
            customer = self.paddle_service.create_customer(
                user.email, user.username
            )
            customer_id = customer["id"]
            if address_data:
                created_address = self.paddle_service.create_address(
                    customer_id, address_data
                )
                address_id = created_address.get("id")
            else:
                address_id = None

        # Получаем или создаем продукт в Puddle
        product = get_object_or_404(Product, id=product_id)
        products = self.paddle_service.get_product(str(product.id))
        if products:
            product_id = products[0]["id"]
        else:
            product_data = DataPreparer.prepare_product_data(product)
            created_product = self.paddle_service.create_product(product_data)
            product_id = created_product["id"]

        # Создаем цену и транзакцию в Puddle
        price = self.paddle_service.create_price(product_id, product.price)
        price_id = price["id"]

        transaction_response = self.paddle_service.create_transaction(
            price_id, customer_id, quantity, address_id
        )

        return transaction_response
