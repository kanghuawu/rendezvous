from __future__ import unicode_literals

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class PingAPIView(APIView):
    def get(self, request):
        return Response({'message': 'ping successful'})
