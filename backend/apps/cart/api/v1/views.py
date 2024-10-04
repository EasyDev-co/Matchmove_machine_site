from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.cart.services import CartService
from .serializers import CartSerializer, CartItemSerializer


class CartAPIView(APIView):

    def get(self, request):
        cart_service = CartService(user=request.user)
        cart = cart_service.get_or_create_cart()
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        cart_service = CartService(user=request.user)
        product_id = request.data.get('product')
        try:
            cart_item = cart_service.add_product(product_id)
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cart_service = CartService(user=request.user)
        try:
            cart_service.delete_item(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
