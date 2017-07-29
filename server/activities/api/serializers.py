from rest_framework import serializers
from activities.models import Activity, ActivityType


class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = '__all__'
        #type_name

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'
        #elder.firstname elder.lastname activity_type.type_name
