from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ElderListAPIView, ElderDetailAPIView

urlpatterns = [
    url(r'^$', ElderListAPIView.as_view()),
    url(r'^(?P<elder_id>[0-9]+)/$', ElderDetailAPIView.as_view()),
]
