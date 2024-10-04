from apps.payments.api.v1.views import (CreateTransactionAPIView,
                                        PaddleWebhookAPIView)
from django.urls import path

urlpatterns = [
    path("transactions/create/", CreateTransactionAPIView.as_view(), name="create-transaction"),
    path('paddle-webhook/', PaddleWebhookAPIView.as_view(), name='paddle-webhook'),

]
