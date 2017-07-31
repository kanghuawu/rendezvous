# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models

from activities.models import Activity
from accounts.models import Volunteer


# Create your models here.
class LeaderBoard(models.Model):
    leaderboard_id = models.AutoField(primary_key=True)
    volunteer_id = models.ForeignKey(Volunteer, on_delete = models.DO_NOTHING) 
    hours = models.SmallIntegerField()

class Meta:
	managed = False
	db_table = 'LeaderBoard'

# select volunteer_id, sum(duration) as score from activities_activity where month(date) = month(curdate()) group by volunteer_id;
