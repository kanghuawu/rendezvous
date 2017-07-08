from rest_framework.serializers import HyperlinkedIdentityField, ModelSerializer, SerializerMethodField

from elders.models import Elder

class ElderSerializer(ModelSerializer):
    class Meta:
        model = Elder
        fields = '__all__'
