 
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()

from rest_framework import serializers
from lbfe_app.models import Activity, ActivityType, Elder, Volunteer

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserLoginSerializer(ModelSerializer):
    token = models.CharField(blank=True)
    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'token',
        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                            }


class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class ElderSerializer(ModelSerializer):
    class Meta:
        model = Elder
        fields = '__all__'

class VolunteerSerializer(ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'