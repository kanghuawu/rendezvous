from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class PostPageNumberPagination(PageNumberPagination):
	page_size = 5


'''
UnorderedObjectListWarning: Pagination may yield inconsistent results with an unordered object_list:

sort by date: latest -> oldest
'''