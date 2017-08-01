# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from django.db import connection
from leaderboard.models import LeaderBoard 
from activities.models import Activity
from activities.api.serializers import ActivitySerializer

query = 'select volunteer_id, sum(duration) as score from activities_activity where month(date) = month(curdate())-1 group by volunteer_id;'

class LeaderBoardListAPIView(ListAPIView, CreateAPIView):
	queryset = Activity.objects.all()
	serializer_class = ActivitySerializer

	cursor = connection.cursor()
	cursor.execute(query)   
	cursor.fetchall()

	for q in cursor:
		cursor.execute("insert into leaderboard_leaderboard values(null,%s,%s);"%(int(q[1]),int(q[0])))

	connection.close()
		


'''
from leaderboard.models import LeaderBoard
from .serializers import LeaderBoardSerializer

class LeaderBoardListAPIView(ListAPIView, CreateAPIView):
	queryset = LeaderBoard.objects.all()
	serializer_class = LeaderBoardSerializer


def get_queryset(self, *args, **kwargs):
    	queryset_list = LeaderBoard.objects.filter(volunteer_id = self.request.user)
    	return queryset_list
'''

