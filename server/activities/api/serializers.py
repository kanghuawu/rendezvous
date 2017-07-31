from rest_framework import serializers
from activities.models import Activity, ActivityType


class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    activity_name = serializers.PrimaryKeyRelatedField(source='activity_type.type_name', read_only=True)
    elder_firstname = serializers.PrimaryKeyRelatedField(source='elder.first_name',read_only=True)
    elder_lastname = serializers.PrimaryKeyRelatedField(source='elder.last_name', read_only=True)
    class Meta:
        model = Activity
        #fields = '__all__'
        fields = ('elder_firstname','elder_lastname','activity_name','date','duration','status')
