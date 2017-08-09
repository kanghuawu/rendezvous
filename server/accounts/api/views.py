from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .serializers import VolunteerSerializer, VolunteerProfileSerializer, ChangePasswordSerializer
from rest_framework_jwt.settings import api_settings


Volunteer = get_user_model()

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class VolunteerCreateAPIView(CreateAPIView):
    serializer_class = VolunteerSerializer
    queryset = Volunteer.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = VolunteerSerializer(data=request.data)
        queryset = Volunteer.objects.filter(email = self.request.data['email'])
        if queryset.exists():
            return Response({"error": "User already exists"}, HTTP_422_UNPROCESSABLE_ENTITY)
        if serializer.is_valid(raise_exception=True):
            serializer.save(email=self.request.data['email'])
            user = Volunteer.objects.get(email = self.request.data['email'])
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({'token': token}, HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class VolunteerDetailAPIView(RetrieveUpdateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        obj = self.queryset.get(email = self.request.user)
        return obj

# https://stackoverflow.com/questions/23275887/django-rest-change-users-password-view
class ChangePasswordView(UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = Volunteer
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"error": ["Wrong password."]}, status=HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            payload = jwt_payload_handler(self.request.user)
            token = jwt_encode_handler(payload)
            return Response({'token': token}, status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

# -*- coding: utf-8 -*-
# from __future__ import unicode_literals

# from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
# from volunteers.models import Volunteer
# from .serializers import VolunteerSerializer
# from rest_framework.permissions import (
#     AllowAny,
#     IsAuthenticated,
#     IsAdminUser,
#     IsAuthenticatedOrReadOnly,
#     )


# class VolunteerListAPIView(ListAPIView, CreateAPIView):
#     queryset = Volunteer.objects.all()
#     serializer_class = VolunteerSerializer
#     # permission_classes = [IsAuthenticated]

