# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import Activity


def index(request):
    recent_activities = Activity.objects.order_by('-date')[:5]
    output = ', '.join([a.activity_type.type_name for a in recent_activities])
    return HttpResponse(output)