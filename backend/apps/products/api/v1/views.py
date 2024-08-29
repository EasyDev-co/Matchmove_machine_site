from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from .serializers import ProductSerializer
from apps.products.models.products import Product


class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['author__username', 'category', 'file_format__name']
    filterset_fields = {
        'camera': ['exact'],
        'lens': ['exact'],
        'file_format': ['exact'],
        'access_type': ['exact'],
        'price': ['gte', 'lte'],
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        access_type = self.request.query_params.get('access_type')
        if access_type:
            queryset = queryset.filter(access_type=access_type)
        return queryset
