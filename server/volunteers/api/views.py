# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from volunteers.models import Volunteer
from .serializers import VolunteerSerializer


class VolunteerListAPIView(ListAPIView, CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer


class VolunteerDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    lookup_field = 'volunteer_id'
