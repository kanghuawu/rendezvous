from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(r'^volunteer/$',VolunteerListAPIView.as_view())
]
