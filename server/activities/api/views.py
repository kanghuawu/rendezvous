# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from activities.models import Activity, ActivityType
from .serializers import ActivitySerializer, ActivityTypeSerializer, ActivityCreateSerializer
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from .pagination import PostPageNumberPagination
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED

class ActivityCreateAPIView(CreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivityCreateSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(volunteer = self.request.user)
        return Response(status=HTTP_201_CREATED)


class ActivityListAPIView(ListAPIView):
    #queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    pagination_class = PostPageNumberPagination
    def get_queryset(self, *args, **kwargs):
        queryset_list = Activity.objects.filter(volunteer = self.request.user).order_by('-date')
        return queryset_list

class ActivityDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    lookup_field = 'activity_id'
    def get_queryset(self, *args, **kwargs):
        queryset_list = self.queryset.filter(volunteer = self.request.user)
        return queryset_list


class ActivityTypeListAPIView(ListAPIView, CreateAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer



class ActivityTypeDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    lookup_field = 'type_id'
