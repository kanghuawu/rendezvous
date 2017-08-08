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

import itertools

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
        oneweek = now() - timedelta(days=7)
        onemonth = now() - timedelta(days=30)
        #last_week_hours = Activity.objects.filter(date__gt=oneweek,volunteer=self.request.user).annotate(sum = Sum('duration')),
        #last_month_hours = Activity.objects.filter(date__gt=onemonth,volunteer=self.request.user).annotate(sum = Sum('duration'))


        last_week_hours = Activity.objects.filter(date__gt=oneweek,volunteer=self.request.user).aggregate(lastweek = Sum('duration'))
        print last_week_hours
        last_month_hours = Activity.objects.filter(date__gt=onemonth,volunteer=self.request.user).aggregate(lastmonth = Sum('duration'))
        print last_month_hours

        hourlist = [last_week_hours,last_month_hours]
        print hourlist
        # hourlist = (
        #     Activity.objects.values('date').filter(date__gt=oneweek,volunteer=self.request.user).annotate(sum=Sum('duration')),
        #     Activity.objects.values('date').filter(date__gt=onemonth,volunteer=self.request.user).annotate(sum=Sum('duration'))
        # )
        queryset_list = Activity.objects.filter(volunteer = self.request.user).order_by('-date')
        print queryset_list.__class__.__name__
        return queryset_list



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
