# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models, connection
from accounts.models import Volunteer
import time


# Create your models here.
class LeaderBoard(models.Model):
    leaderboard_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20, blank = True)
    last_name = models.CharField(max_length=20, blank = True)
    #volunteer = models.ForeignKey(Volunteer, on_delete = models.DO_NOTHING) 
    hours = models.SmallIntegerField()
    date = models.DateField(auto_now_add=False)


def updateLeaderBoard():
	query = 'select volunteer_id, sum(duration) as score from activities_activity where month(date) = month(curdate()) group by volunteer_id;' # month()-1
	cursor = connection.cursor()
	cursor.execute(query)   
	cursor.fetchall()
	hours = list()
	v_id  = list()
	for q in cursor:
		v_id.append(int(q[0]))  #q[0] volunteer id
		hours.append(int(q[1])) #q[1] is hours

	hours.reverse()
	for id in v_id:
		cursor.execute("select email from accounts_volunteer where id = %s;"%(id))
		name = "'%s'"%cursor.fetchone()
		cursor.execute("insert into leaderboard_leaderboard values(null,%s,%s,%s,curdate());"%(name,name,hours.pop()))
	connection.close()





