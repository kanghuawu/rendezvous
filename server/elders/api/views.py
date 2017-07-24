from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from elders.models import Elder
from .serializers import ElderSerializer
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    )



class ElderListAPIView(ListAPIView, CreateAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        queryset_list = Elder.objects.all().filter(volunteer = self.request.user)
        print queryset_list
        return queryset_list

    def perform_create(self, serializer):
        serializer.save(volunteer = self.request.user)


class ElderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    lookup_field = 'elder_id'
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        print Elder.objects.all()
        queryset_list = Elder.objects.all().filter(volunteer = self.request.user)
        return queryset_list
