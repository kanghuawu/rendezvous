from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from app.models import Volunteer
from .serializers import VolunteerSerializer

class VolunteerListAPIView(ListAPIView, CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    # permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        queryset_list = Volunteer.objects.all()
        print queryset_list
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()
