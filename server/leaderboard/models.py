# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import date, timedelta
from django.conf import settings
from django.db import models, connection
from accounts.models import Volunteer


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
#q[1] is hours
#q[0] volunteer id
	for q in cursor:
		v_id.append(int(q[0]))
		hours.append(int(q[1]))
		print(int(q[1]))
	print("-----")	
	hours.reverse()	
	for id in v_id:
		#print(id)
		cursor.execute("select first_name,last_name from accounts_volunteer where id = %s;"%(id))
		name = cursor.fetchone()
#		print(name[1])
#		print(hours.pop())
		cursor.execute("insert into leaderboard_leaderboard values(null,%s,%s,%d,curdate;"%("tets","test",hours.pop()))
	connection.close()