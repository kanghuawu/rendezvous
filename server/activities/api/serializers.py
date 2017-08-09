from rest_framework import serializers
from activities.models import Activity, ActivityType
from datetime import timedelta
import datetime
from django.utils.timezone import now
from django.db.models import Sum

class ActivityTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityType
        fields = '__all__'

class ActivityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    activity_name = serializers.PrimaryKeyRelatedField(source='activity_type.type_name', read_only=True)
    elder_fullname = serializers.SerializerMethodField()
    class Meta:
        model = Activity
        fields = ('activity_id', 'activity_name', 'date', 'duration', 'status', 'elder_fullname')
    def get_elder_fullname(self, obj):
        return obj.elder.getFullName()
