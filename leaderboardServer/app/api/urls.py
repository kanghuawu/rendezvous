from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from views import VolunteerListAPIView
urlpatterns = [
	url(r'^volunteer/$',VolunteerListAPIView.as_view())
]
