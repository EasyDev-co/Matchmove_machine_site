import logging

from apps.orders.models import Order
from django.conf import settings
from django.shortcuts import get_object_or_404
from paddle_billing.Notifications import Secret, Verifier
from rest_framework import status

logger = logging.getLogger(__name__)


class PaddleWebhookService:

    def __init__(self, request):
        self.endpoint_secret_key = settings.PADDLE_NOTIFICATION_KEY
        self.request = request

    def verify_signature(self):
        return Verifier().verify(self.request, Secret(self.endpoint_secret_key))

    def process_event(self):
        request_data = self.request.data
        alert_name = request_data.get('event_type')
        transaction_id = request_data.get('data', {}).get('id')

        if alert_name == 'transaction.paid':
            order = get_object_or_404(Order, transaction_id=transaction_id)
            order.is_paid = True
            order.save()
            logger.info(f"Заказ {order.id} обновлен как оплаченный.")
            return {'status': 'успех'}, status.HTTP_200_OK

        logger.warning(f"Необработанный тип события: {alert_name}")
        return {'detail': 'Необработанный тип события'}, status.HTTP_400_BAD_REQUEST