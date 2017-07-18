from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from lbfe_app.models import Elder, Activity, ActivityType, Volunteer
from .serializers import ElderSerializer, ActivitySerializer, ActivityTypeSerializer, VolunteerSerializer
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    )
from django.db.models import Q

User = get_user_model()
from lbfe_app.models import Volunteer, MyUser

class UserCreateAPIView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        queryset = User.objects.filter(email=self.request.data['email'])
        if queryset.exists():
            return Response({"error": "User already exists"}, HTTP_422_UNPROCESSABLE_ENTITY)
        if serializer.is_valid(raise_exception=True):
            serializer.save(email=self.request.data['email'])
            #Create volunteer along with user
            U = MyUser.objects.filter(email=self.request.data['email'])[0]
            v = Volunteer(email=U)
            v.save()
            return Response(serializer.data, HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    # def create(self, request, *args, **kwargs):
    #     serializer = UserSerializer(data=request.data)
    #     queryset = User.objects.filter(email=self.request.data['email'])
    #     if queryset.exists():
    #         return Response({"error": "User already exists"}, HTTP_400_BAD_REQUEST)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save(email=self.request.data['email'])
    #         payload = jwt_payload_handler(serializer.data)
    #         token = jwt_encode_handler(payload)
    #     # return token
    #     return Response({"token": token}, HTTP_200_OK)
    # def create(self, request, *args, **kwargs):
    #     # print User.USERNAME_FIELD
    #     # return Response({"msg":"ok"}, HTTP_200_OK)
    #     data = request.data
    #     serializer = UserSerializer(data=data)
    #
    #
    #     # return Response(token, status=HTTP_200_OK)
    #     if serializer.is_valid(raise_exception=True):
    #         print serializer.data
    #         # print help(jwt_payload_handler)
    #         # payload = jwt_payload_handler(serializer.data)
    #         # token = jwt_encode_handler(payload)
    #         # return Response(token, status=HTTP_200_OK)
    #         return Response({"msg":"ok"}, HTTP_200_OK)
    #     else:
    #         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


# class UserSignInAPIView(APIView):
#     permission_classes = [AllowAny]
#     serializer_class = UserLoginSerializer
#
#     def post(self, request, *args, **kwargs):
#         data = request.data
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             new_data = serializer.data
#             return Response(new_data, status=HTTP_200_OK)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ElderListAPIView(ListAPIView, CreateAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        queryset_list = Elder.objects.all()
        print queryset_list
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()

class VolunteerListAPIView(ListAPIView, CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        queryset_list = Volunteer.objects.all()
        print queryset_list
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()

class ElderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Elder.objects.all()
    serializer_class = ElderSerializer
    lookup_field = 'elder_id'
    permission_classes = [IsAuthenticated]
    def get_queryset(self, *args, **kwargs):
        print Elder.objects.all()
        queryset_list = Elder.objects.all()
        return queryset_list


class ActivityListAPIView(ListAPIView, CreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    def get_queryset(self, *args, **kwargs):
        print Activity.objects.all()
        queryset_list = Activity.objects.all()
        return queryset_list

    def perform_create(self, serializer):
        serializer.save()


class ActivityDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ActivitySerializer
    lookup_field = 'activity_id'
    def get_queryset(self, *args, **kwargs):
        queryset_list = Activity.objects.all()
        return queryset_list

# Input: Volunteer primary key
class VolunteerActivitiesView(ListAPIView):
    print 'Invoked Volunteer Activities View'
    serializer_class = ActivitySerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Activity.objects.all()
        volunteer_id = self.request.query_params.get('volunteer_id', None)
        print 'Volunteer ID: ' + volunteer_id
        if volunteer_id is not None:
            queryset = Activity.objects.filter(volunteer_id=volunteer_id).order_by('volunteer_id')[:3] 
        return queryset


class ActivityTypeListAPIView(ListAPIView, CreateAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer


class ActivityTypeDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = ActivityType.objects.all()
    serializer_class = ActivityTypeSerializer
    lookup_field = 'type_id'

# Input: Elder's name
class EldersByName(ListAPIView):
    print 'Invoked Elders View'
    serializer_class = ElderSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Elder.objects.all()
        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = Elder.objects.filter(Q(first_name__icontains=name) | Q(last_name__icontains=name))
        return queryset
