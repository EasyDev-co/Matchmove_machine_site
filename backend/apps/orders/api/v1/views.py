from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.orders.services import OrderService
from .serializers import OrderSerializer
from apps.products.api.v1.serializers import ProductSerializer
from django.core.paginator import EmptyPage


class UserOrdersAPIView(APIView):
    def get(self, request):
        """Получение заказов пользователя с пагинацией."""
        page_number = request.query_params.get("page", 1)
        order_service = OrderService(user=request.user)
        try:
            orders = order_service.get_user_orders(page_number=page_number)
            serializer = OrderSerializer(orders, many=True)
            return Response(
                {
                    "orders": serializer.data,
                    "total_pages": orders.paginator.num_pages,
                    "current_page": orders.number,
                }
            )
        except EmptyPage:
            return Response(
                {"error": "Page not found"}, status=status.HTTP_404_NOT_FOUND
            )


class UserProductsAPIView(APIView):
    def get(self, request):
        """Получение продуктов пользователя с пагинацией."""
        page_number = request.query_params.get("page", 1)
        order_service = OrderService(user=request.user)
        try:
            products = order_service.get_user_products(page_number=page_number)
            serializer = ProductSerializer(products, many=True)
            return Response(
                {
                    "products": serializer.data,
                    "total_pages": products.paginator.num_pages,
                    "current_page": products.number,
                }
            )
        except EmptyPage:
            return Response(
                {"error": "Page not found"}, status=status.HTTP_404_NOT_FOUND
            )
