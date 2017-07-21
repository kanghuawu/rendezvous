# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models
from elders.models import Elder
from volunteers.models import Volunteer



# Create your models here.
class ActivityType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=30)


class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete = models.SET_NULL, null = True)
    volunteer = models.ForeignKey(Volunteer, on_delete = models.SET_NULL, null = True)
    elder = models.ForeignKey(Elder, on_delete = models.SET_NULL, null = True)
    activity_type = models.ForeignKey('ActivityType',on_delete = models.SET_NULL, null = True)
    duration = models.DurationField(default=timedelta(seconds=0))
    date = models.DateField(auto_now=False,auto_now_add=False)
    comment = models.CharField(max_length=300, blank = True)
    status = models.CharField(default="OK",max_length=10, blank = False) #OK or NOT OK
    elaborate = models.CharField(max_length=10, blank = True) #311 411 911

'''
{
    "hours":1,
    "comment": "happy"
}

'''
