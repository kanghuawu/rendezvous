from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from lbfe_app.api.views import ActivityListAPIView, ActivityDetailAPIView, ActivityTypeListAPIView, ActivityTypeDetailAPIView

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),

]
