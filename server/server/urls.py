"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from server.views import PingAPIView
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # jwt token
    url(r'^api/users/signin/', obtain_jwt_token),

    # api definition
    url(r'^api/users/', include("accounts.api.urls", namespace='users-api')),
    url(r'^api/elders/', include("elders.api.urls", namespace='elders-api')),
    url(r'^api/activities/', include("activities.api.urls", namespace='activities-api')),
    # url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^', PingAPIView.as_view()),
]
