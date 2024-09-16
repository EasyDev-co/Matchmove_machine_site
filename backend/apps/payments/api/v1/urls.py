from django.urls import path

from apps.payments.api.v1.views import CreateTransactionAPIView

urlpatterns = [
    path("transactions/create/", CreateTransactionAPIView.as_view(), name="create-transaction"),
]
