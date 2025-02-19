from rest_framework import pagination
from rest_framework.response import Response

class TutorialPagination(pagination.PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'total_items': self.page.paginator.count,
            'total_page': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next_page': self.page.next_page_number() if self.page.has_next() else None,
            'previus_page': self.page.previous_page_number() if self.page.has_previous() else None,
            'data': data
        })
