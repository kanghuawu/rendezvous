from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from elders.models import Elder
from .serializers import ElderSerializer

class ElderListAPIView(ListAPIView, CreateAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer


class ElderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    lookup_field = 'elder_id'
