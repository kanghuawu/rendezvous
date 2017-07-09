# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf import settings
from django.db import models
from elders.models import Elder

# Create your models here.
class ActivityType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=30)

class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete = models.SET_NULL, null = True)
    elder = models.ForeignKey(Elder, on_delete = models.SET_NULL, default=1, null = True)
    activity_type = models.ForeignKey('ActivityType', default=1, on_delete = models.SET_NULL, null = True)
    hours = models.IntegerField()
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
    comment = models.CharField(max_length=300, blank = True)

'''
{
    "hours":1,
    "comment": "happy"
}

'''
