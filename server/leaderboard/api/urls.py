from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from .views import LeaderBoardListAPIView

urlpatterns = [
    url(r'^$', LeaderBoardListAPIView.as_view())
]
