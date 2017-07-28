from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .serializers import VolunteerSerializer

Volunteer = get_user_model()

class VolunteerCreateAPIView(CreateAPIView):
    serializer_class = VolunteerSerializer
    queryset = Volunteer.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = VolunteerSerializer(data=request.data)
        queryset = Volunteer.objects.filter(email=self.request.data['email'])
        if queryset.exists():
            return Response({"error": "User already exists"}, HTTP_422_UNPROCESSABLE_ENTITY)
        if serializer.is_valid(raise_exception=True):
            serializer.save(email=self.request.data['email'])
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


# class VolunteerDetailAPIView(RetrieveUpdateDestroyAPIView):
#     queryset = Volunteer.objects.all()
#     serializer_class = VolunteerSerializer
#     lookup_field = 'volunteer_id'
#     # permission_classes = [IsAuthenticated]