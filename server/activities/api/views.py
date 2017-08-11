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

from datetime import timedelta
import datetime
from django.utils.timezone import now
from django.db.models import Sum

class ActivityCreateAPIView(CreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivityCreateSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(volunteer = self.request.user)
        return Response(status=HTTP_201_CREATED)


class ActivityListAPIView(ListAPIView):
    serializer_class = ActivitySerializer
    pagination_class = PostPageNumberPagination
    def get_queryset(self, *args, **kwargs):
        queryset_list = Activity.objects.filter(volunteer = self.request.user).order_by('-date')
        return queryset_list
    def list(self,request,*args, **kwargs):
        response = super(ActivityListAPIView, self).list(request, args, kwargs)
        oneweek = now() - timedelta(days=7)
        onemonth = now() - timedelta(days=31)
        last_week_hours = Activity.objects.filter(date__gt=oneweek, volunteer=self.request.user).aggregate(
            last_week=Sum('duration'))
        #print last_week_hours
        last_month_hours = Activity.objects.filter(date__gt=onemonth, volunteer=self.request.user).aggregate(
            ast_month=Sum('duration'))
        #print last_month_hours
        hourlist = [last_week_hours, last_month_hours]
        print hourlist
        response.data["last week"] = last_week_hours
        response.data["last month"] = last_month_hours
        return response

class ActivityDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivitySerializer
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
