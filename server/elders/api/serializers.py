from rest_framework import serializers

from elders.models import Elder, ElderVolunteer

class ElderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elder
        fields = '__all__'


class ElderVolunteerCustomSerializer(serializers.ModelSerializer):
    elder_id = serializers.PrimaryKeyRelatedField(source='elder.elder_id', read_only=True)
    elder_fullname = serializers.SerializerMethodField()
    elder_phone = serializers.PrimaryKeyRelatedField(source='elder.phone', read_only=True)
    class Meta:
        model = ElderVolunteer
        fields = ('elder_id', 'match_id', 'elder_fullname', 'elder_phone')
    def get_elder_fullname(self, obj):
        return obj.elder.getFullName()


class ElderVolunteerCreateListSerializer(serializers.ListSerializer):
    def create(self, validate_data):
        eldervolunteer = [ElderVolunteer(**item) for item in validate_data]
        return ElderVolunteer.objects.bulk_create(eldervolunteer)


class ElderVolunteerSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(ElderVolunteerSerializer, self).__init__(many=many, *args, **kwargs)
    class Meta:
        model = ElderVolunteer
        fields = ('elder', 'volunteer')
        list_serializer_class = ElderVolunteerCreateListSerializer