from rest_framework import serializers
from activities.models import Activity, ActivityType
from accounts.models import Volunteer
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
        fields = ('activity_id', 'activity_name', 'date', 'duration', 'status', 'notes', 'elder_fullname')
    def get_elder_fullname(self, obj):
        return obj.elder.getFullName()

class ActivityLeaderboardSerializer(serializers.Serializer):
    volunteer_fullname = serializers.SerializerMethodField()
    hours = serializers.IntegerField()
    volunteer__hearts = serializers.IntegerField()
    volunteer__badges = serializers.IntegerField()

    def get_volunteer_fullname(self, obj):
        first_name = obj.get('volunteer__first_name')
        last_name = obj.get('volunteer__last_name')
        if first_name == '' and last_name == '':
            return 'Anonymous'
        return '%s %s' % (first_name, last_name)

