from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from elders.models import Elder, ElderVolunteer
from .serializers import ElderSerializer, ElderVolunteerCustomSerializer, ElderVolunteerCreateListSerializer, ElderVolunteerSerializer
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    )
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST


class ElderListAPIView(ListAPIView, CreateAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        volunteer_elderlist = ElderVolunteer.objects.filter(volunteer = self.request.user)
        queryset = Elder.objects.exclude(elder_id__in = [match.elder_id for match in volunteer_elderlist])
        elder_firstname = self.request.query_params.get('firstname', None)
        elder_lastname = self.request.query_params.get('lastname', None)
        elder_phone = self.request.query_params.get('phone', None)
        if elder_firstname is not None and elder_firstname != '':
            queryset = queryset.filter(first_name__contains = elder_firstname)
        if elder_lastname is not None and elder_lastname != '':
            queryset = queryset.filter(last_name__contains = elder_lastname)
        if elder_phone is not None and elder_phone != '':
            queryset = queryset.filter(phone__contains = elder_phone)
        return queryset.order_by('last_name', 'first_name')
    


class ElderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    lookup_field = 'elder_id'
    permission_classes = [IsAuthenticated]



class ElderVolunteerListAPIView(ListAPIView):
    queryset = ElderVolunteer.objects.all()
    serializer_class = ElderVolunteerCustomSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        queryset_list = ElderVolunteer.objects.filter(volunteer_id = self.request.user)
        return queryset_list


class ElderVolunteerCreateListAPIView(CreateAPIView):
    queryset = ElderVolunteer.objects.all()
    serializer_class = ElderVolunteerSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        eldersArr = []
        for elder in self.request.data.get('addelders'):
            eldersArr.append({'elder': int(elder)})
        serializer = self.get_serializer(data=eldersArr, many=True)
        if serializer.is_valid():
            serializer.save(volunteer=self.request.user)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


