from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from elders.models import Elder, ElderVolunteer
from .serializers import ElderSerializer, ElderVolunteerSerializer
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
    


class ElderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    lookup_field = 'elder_id'
    permission_classes = [IsAuthenticated]
    


class ElderVolunteerListAPIView(ListAPIView, CreateAPIView):
    queryset = ElderVolunteer.objects.all()
    serializer_class = ElderVolunteerSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        print "this is ElderVolunteerListAPIView"
        queryset_list = ElderVolunteer.objects.all().filter(volunteer = self.request.user)
        return queryset_list

    def perform_create(self, serializer):
        serializer.save(volunteer = self.request.user)