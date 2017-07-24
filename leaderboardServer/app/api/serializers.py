from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from django.db import models
from rest_framework import serializers
from app.models import Volunteer

class VolunteerSerializer(ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
