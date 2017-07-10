from rest_framework.serializers import HyperlinkedIdentityField, ModelSerializer, SerializerMethodField
from volunteers.models import Volunteer


class VolunteerSerializer(ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
