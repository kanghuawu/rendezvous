from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ActivityListAPIView, ActivityDetailAPIView, ActivityTypeListAPIView, ActivityTypeDetailAPIView, ActivityCreateAPIView, ActivityLeaderboardAPIView

urlpatterns = [
    url(r'^$', ActivityListAPIView.as_view()),
    url(r'^leaderboard/$', ActivityLeaderboardAPIView.as_view()),
    url(r'^create/$', ActivityCreateAPIView.as_view()),
    url(r'^(?P<activity_id>[0-9]+)/$', ActivityDetailAPIView.as_view()),
    url(r'^types/$', ActivityTypeListAPIView.as_view()),
    url(r'^types/(?P<type_id>[0-9]+)/$', ActivityTypeDetailAPIView.as_view()),
]
