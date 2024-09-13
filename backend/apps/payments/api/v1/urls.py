from apps.payments.api.v1.views import CreateTransactionAPIView
from django.urls import path

urlpatterns = [
    path('transactions/create/', CreateTransactionAPIView.as_view(), name='create-transaction'),
]
