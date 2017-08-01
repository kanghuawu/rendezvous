# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models, connection
from accounts.models import Volunteer


# Create your models here.
class LeaderBoard(models.Model):
    leaderboard_id = models.AutoField(primary_key=True)
    volunteer = models.ForeignKey(Volunteer, on_delete = models.DO_NOTHING) 
    hours = models.SmallIntegerField()
    date = models.DateField(auto_now_add=False)


def updateLeaderBoard():
	query = 'select volunteer_id, sum(duration) as score from activities_activity where month(date) = month(curdate()) group by volunteer_id;' # month()-1
	cursor = connection.cursor()
	cursor.execute(query)   
	cursor.fetchall()
#[1] is hours
	for q in cursor:
		cursor.execute("insert into leaderboard_leaderboard values(null,%s,%s, curdate());"%(int(q[1]),int(q[0])))

	connection.close()