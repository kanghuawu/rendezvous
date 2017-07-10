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
    elder = models.ForeignKey(Elder, default=1)
    type = models.ForeignKey('ActivityType', default=1, on_delete = models.SET_NULL, null = True)
    duration = models.DurationField(default=timedelta(seconds=0))
    date = models.DateField(default=date.today())
    comment = models.CharField(max_length=300, blank = True)

'''
{
    "hours":1,
    "comment": "happy"
}

'''
