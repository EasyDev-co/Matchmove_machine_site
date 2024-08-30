from rest_framework import generics
from .serializers import ProductDetailSerializer
from apps.products.models.products import Product


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
