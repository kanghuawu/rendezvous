# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from leaderboard.models import LeaderBoard
from .serializers import LeaderBoardSerializer


class LeaderBoardListAPIView(ListAPIView, CreateAPIView):
	queryset = LeaderBoard.objects.all()
    serializer_class = LeaderBoardSerializer
   ''' 
	def get_queryset(self, *args, **kwargs):
    	queryset_list = LeaderBoard.objects.filter(volunteer_id = self.request.user)
    	return queryset_list
    '''

