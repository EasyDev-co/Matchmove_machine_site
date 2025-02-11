from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        page_number = self.page.number
        page_size = self.get_page_size(self.request) or len(data)
        start_index = (page_number - 1) * page_size

        new_data = []
        for idx, item in enumerate(data):
            item['position'] = start_index + idx + 1
            new_data.append(item)

        return Response({
            'total_items': self.page.paginator.count,
            'total_page': self.page.paginator.num_pages,
            'current_page': page_number,
            'next_page': self.page.next_page_number() if self.page.has_next() else None,
            'previus_page': self.page.previous_page_number() if self.page.has_previous() else None,
            'data': new_data,
        })
