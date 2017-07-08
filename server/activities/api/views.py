# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from activities.models import Activity, ActivityType
from .serializers import ActivitySerializer, ActivityTypeSerializer

class ActivityListAPIView(ListAPIView, CreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    # def get_queryset(self, *args, **kwargs):
    #     queryset_list = Post.objects.all().filter(user=self.request.user)

    # def perform_create(self, serializer):
    #     serializer.save(user = self.request.user)


class ActivityDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    lookup_field = 'activity_id'


class ActivityTypeListAPIView(ListAPIView, CreateAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer


class ActivityTypeDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    lookup_field = 'type_id'
