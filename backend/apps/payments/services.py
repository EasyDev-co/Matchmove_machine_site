import requests
import logging
from django.conf import settings
from apps.products.models.products import Product

logger = logging.getLogger(__name__)


def get_latest_address(customer_id):
    """Получить последний адрес клиента."""
    base_url = settings.PADDLE_API_BASE_URL
    list_addresses_url = f'{base_url}/customers/{customer_id}/addresses'

    try:
        response = requests.get(
            list_addresses_url,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )
        response.raise_for_status()
        addresses = response.json().get('data', [])

        if addresses:
            # Сортировка по дате обновления (последний адрес будет первым после сортировки)
            addresses.sort(key=lambda x: x['updated_at'], reverse=True)
            return addresses[0]['id']  # Возвращаем ID последнего адреса
        else:
            return None

    except requests.RequestException as e:
        logger.error(f"Error fetching addresses: {str(e)}")
        raise Exception("Failed to fetch addresses")


def create_address(customer_id, address_data):
    """Создать новый адрес для клиента."""
    base_url = settings.PADDLE_API_BASE_URL
    create_address_url = f'{base_url}/customers/{customer_id}/addresses'

    try:
        response = requests.post(
            create_address_url,
            json=address_data,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )
        response.raise_for_status()
        return response.json().get('data', {})
    except requests.RequestException as e:
        logger.error(f"Error creating address: {str(e)}")
        raise Exception("Failed to create address")


def fetch_or_create_customer(user, address_data=None):
    """Подтягиваем или создаем покупателя в Paddle."""
    base_url = settings.PADDLE_API_BASE_URL
    list_customers_url = f'{base_url}/customers'
    search_params = {'email': user.email}

    try:
        response = requests.get(
            list_customers_url,
            params=search_params,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )
        response.raise_for_status()
        customers_data = response.json().get('data', [])

        if customers_data:
            customer_id = customers_data[0]['id']
            # Получаем последний адрес клиента
            latest_address_id = get_latest_address(customer_id)
            if address_data and not latest_address_id:
                # Создаем новый адрес
                created_address = create_address(customer_id, address_data)
                latest_address_id = created_address.get('id')
            return customer_id, latest_address_id
        else:
            # Создаем нового клиента
            customer_data = {
                "email": user.email,
                "name": user.username,
            }
            logger.warning(f"Customer with email {user.email} not found. Creating new customer...")
            create_response = requests.post(
                f'{base_url}/customers',
                json=customer_data,
                headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
            )
            create_response.raise_for_status()
            customer_id = create_response.json()['data']['id']
            if address_data:
                created_address = create_address(customer_id, address_data)
                address_id = created_address.get('id')
            else:
                address_id = None
            return customer_id, address_id
    except requests.RequestException as e:
        logger.error(f"Error fetching or creating customer: {str(e)}")
        raise Exception("Failed to fetch or create customer")


def fetch_or_create_product(product_id):
    """Подтягиваем или создаем продукт в Paddle."""
    base_url = settings.PADDLE_API_BASE_URL
    search_product_url = f'{base_url}/products'
    search_params = {'name': str(product_id)}

    try:
        response = requests.get(
            search_product_url,
            params=search_params,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )
        response.raise_for_status()
        product_data_list = response.json().get('data', [])

        if product_data_list:
            return product_data_list[0]['id']
        else:
            product = Product.objects.get(id=product_id)
            product_data = {
                "name": str(product_id),
                "tax_category": "standard",
                "description": product.category or "",
                "type": "standard",
            }
            logger.info(f"Creating product with data: {product_data}")
            create_response = requests.post(
                f'{base_url}/products',
                json=product_data,
                headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
            )
            create_response.raise_for_status()
            return create_response.json()['data']['id']
    except requests.RequestException as e:
        logger.error(f"Error fetching or creating product: {str(e)}")
        raise Exception("Failed to fetch or create product")


def create_price(product_id, price_amount):
    """Создаем цену продукта Paddle."""
    base_url = settings.PADDLE_API_BASE_URL
    price_data = {
        "description": "Base price for product",
        "product_id": product_id,
        "unit_price": {
            "amount": str(int(price_amount * 100)),  # Умножаем на 100 так как Paddle принимает целые числа за центы
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

    try:
        response = requests.post(
            f'{base_url}/prices',
            json=price_data,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )
        response.raise_for_status()
        return response.json()['data']['id']
    except requests.RequestException as e:
        logger.error(f"Error creating price: {str(e)}")
        raise Exception("Failed to create price")


def create_transaction(price_id, customer_id, quantity, address_id=None):
    """Создаем транзакцию в Paddle."""
    base_url = settings.PADDLE_API_BASE_URL
    transaction_data = {
        "items": [
            {
                'price_id': price_id,
                "quantity": quantity
            }
        ],
        "customer_id": customer_id,
        "address_id": address_id,
        "currency_code": "USD",
        "collection_mode": "automatic",
    }

    try:
        response = requests.post(
            f'{base_url}/transactions',
            json=transaction_data,
            headers={'Authorization': f'Bearer {settings.PADDLE_API_KEY}'}
        )
        response.raise_for_status()
        return response
    except requests.RequestException as e:
        logger.error(f"Failed to create transaction: {response.text}")
        raise Exception("Failed to create transaction")
