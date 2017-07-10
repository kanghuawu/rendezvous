from django.conf.urls import url
from .views import VolunteerDetailAPIView,VolunteerListAPIView

urlpatterns = [
    url(r'^all/$', VolunteerListAPIView.as_view()),
    url(r'^(?P<volunteer_id>[0-9]+)/$', VolunteerDetailAPIView.as_view()),
]