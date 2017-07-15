from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from django.db import models
from accounts.models import User
User = get_user_model()

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
class AccountSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'