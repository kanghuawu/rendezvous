from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import models
Volunteer = get_user_model()

class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        volunteer = Volunteer(
            email=validated_data['email'],
            hearts=0,
            badges=0
        )
        volunteer.set_password(validated_data['password'])
        volunteer.save()
        return volunteer


class VolunteerLoginSerializer(serializers.ModelSerializer):
    token = models.CharField(blank=True)
    class Meta:
        model = Volunteer
        fields = ['email', 'password', 'token',]
        extra_kwargs = {"password": {"write_only": True}}

class VolunteerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['first_name', 'last_name', 'phone', 'hearts', 'badges']
        extra_kwargs = {'password': {'write_only': True}, 'hearts': {'read_only': True}, 'badges': {'read_only': True}}


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

