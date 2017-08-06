from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ElderListAPIView, ElderDetailAPIView, ElderVolunteerListAPIView, ElderVolunteerCreateListAPIView


# elder_by_firstname =ElderListAPIView.as_view({
#
# })
urlpatterns = [
	url(r'^mylist/$', ElderVolunteerListAPIView.as_view()),
    url(r'^mylist/add/$', ElderVolunteerCreateListAPIView.as_view()),
    url(r'^$', ElderListAPIView.as_view()),
    url(r'^(?P<elder_id>[0-9]+)/$', ElderDetailAPIView.as_view()),
]
