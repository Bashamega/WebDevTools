> pagination.py

```
class CustomPaginations(PageNumberPaginations):
    page_size = 10  #initial number of items per page
    page_size_query_param = 'page_size'  # Allow users to override page size
    max_page_size = 100  # Max allowed page size

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
            },
            'total_count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'page_size': self.page_size,
            'results': data,
        })
```

> settings.py

```
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPaginations',
    'PAGE_SIZE': 10,

}
```
