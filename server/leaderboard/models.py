# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models, connection


# Create your models here.
class LeaderBoard(models.Model):
    leaderboard_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20, blank = True)
    last_name = models.CharField(max_length=20, blank = True) 
    hours = models.SmallIntegerField()
    date = models.DateField(auto_now_add=False)


def updateLeaderBoard():
	cursor = connection.cursor()
	checkQuery = 'select month(date) from leaderboard_leaderboard where month(date) = month(curdate())-1 and year(date)=year(curdate());'
	sumQuery = 'select volunteer_id, sum(duration) as score from activities_activity where month(date) = month(curdate())-1 and year(date)=year(curdate()) group by volunteer_id;' 
	
	
	cursor.execute(checkQuery)
	# if previous month doesn't exist then update
	if (cursor.fetchone() is None):
		cursor.execute(sumQuery)   
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





