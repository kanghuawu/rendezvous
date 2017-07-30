from __future__ import unicode_literals

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

class PingAPIView(APIView):
	permission_classes = [AllowAny]
	
	def get(self, request):
		return Response({'message': 'ping successful'})
