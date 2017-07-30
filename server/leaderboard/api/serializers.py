from rest_framework import serializers
from activities.models import Activity, ActivityType


class LeaderBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
