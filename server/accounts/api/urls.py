from django.conf.urls import url
from django.contrib import admin
from .views import VolunteerCreateAPIView

urlpatterns = [
    # url(r'^signin/$', UserSignInAPIView.as_view(), name='signin'),
    url(r'^signup/$', VolunteerCreateAPIView.as_view(), name='signup'),
    # url(r'^$', VolunteerListAPIView.as_view()),
    # url(r'^(?P<volunteer_id>[0-9]+)/$', VolunteerDetailAPIView.as_view()),
]
