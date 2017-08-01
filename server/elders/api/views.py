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

    def get_queryset(self):
        """
		Optionally restricts the returned purchases to a given user,
		by filtering against a `username` query parameter in the URL.
		"""
        queryset = Elder.objects.all()
        elder_firstname = self.request.query_params.get('firstname', None)
        elder_lastname = self.request.query_params.get('lastname', None)
        elder_phone = self.request.query_params.get('phone', None)
        if elder_firstname is not None:
            queryset = queryset.filter(first_name=elder_firstname)
        if elder_lastname is not None:
            queryset = queryset.filter(last_name=elder_lastname)
        if elder_phone is not None:
            queryset = queryset.filter(phone=elder_phone)
        return queryset
    


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