from django.conf.urls import url
from django.contrib import admin
from .views import UserCreateAPIView, AccountsListAPIView #, #UserSignInAPIView

urlpatterns = [
    # url(r'^signin/$', UserSignInAPIView.as_view(), name='signin'),
    url(r'^signup/$', UserCreateAPIView.as_view(), name='signup'),
    url(r'^$', AccountsListAPIView.as_view()),
]
