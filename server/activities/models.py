# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models
from elders.models import Elder



# Create your models here.
class ActivityType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=30)


class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    volunteer = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete = models.SET_NULL, null = True)
    elder = models.ForeignKey(Elder, on_delete = models.SET_NULL, null = True)
    activity_type = models.ForeignKey('ActivityType',on_delete = models.SET_NULL, null = True)
    duration = models.SmallIntegerField()
    date = models.DateField(auto_now_add=False, blank = True)
    status = models.CharField(max_length=10, blank = True)
    
