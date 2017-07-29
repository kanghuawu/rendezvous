from rest_framework.serializers import HyperlinkedIdentityField, ModelSerializer, SerializerMethodField

from elders.models import Elder, ElderVolunteer

class ElderSerializer(ModelSerializer):
    class Meta:
        model = Elder
        fields = '__all__'


class ElderVolunteerSerializer(ModelSerializer):
    class Meta:
        model = ElderVolunteer
        fields = '__all__'