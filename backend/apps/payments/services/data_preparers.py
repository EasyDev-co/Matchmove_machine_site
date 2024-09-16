class DataPreparer:
    """Структура api запросов для транзакций"""

    @staticmethod
    def prepare_transaction_data(
        price_id, customer_id, quantity, address_id=None
    ):
        """Данные для проведения транзакции в Paddle."""
        return {
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

    @staticmethod
    def prepare_price_data(product_id, price_amount):
        """Данные для создании цены в Paddle."""
        return {
            "description": "Base price for product",
            "product_id": product_id,
            "unit_price": {
                # 100 amount = 1 dollar
                "amount": str(int(price_amount * 100)),
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

    @staticmethod
    def prepare_product_data(product):
        """Данные для создания продукта в Paddle."""
        return {
            "name": str(product.id),
            "tax_category": "standard",
            "description": product.category or "",
            "type": "standard",
        }
