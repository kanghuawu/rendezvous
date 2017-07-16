
from django.conf.urls import url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserCreateAPIView, ElderListAPIView, ElderDetailAPIView, ActivityListAPIView, ActivityDetailAPIView, ActivityTypeListAPIView, ActivityTypeDetailAPIView, VolunteerListAPIView, VolunteerActivitiesView, EldersByName

urlpatterns = [
    # url(r'^signin/$', UserSignInAPIView.as_view(), name='signin'),
    url(r'^signup/$', UserCreateAPIView.as_view(), name='signup'),
    url(r'^elders/$', ElderListAPIView.as_view()),
    url(r'^elders/(?P<elder_id>[0-9]+)/$', ElderDetailAPIView.as_view()),
    url(r'^volunteers/$', VolunteerListAPIView.as_view()),
    url(r'^activities/$', ActivityListAPIView.as_view()),
    url(r'^activity/(?P<activity_id>[0-9]+)/$', ActivityDetailAPIView.as_view()),
    # url(r'^activity/', ActivityDetailAPIView.as_view()),
    url(r'^activitytypes/$', ActivityTypeListAPIView.as_view()),
    url(r'^activitytype/(?P<type_id>[0-9]+)/$', ActivityTypeDetailAPIView.as_view()),
    url(r'^volunteeractivities/$', VolunteerActivitiesView.as_view()),
    url(r'eldersbyname/$', EldersByName.as_view())    
]
