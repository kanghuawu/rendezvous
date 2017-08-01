from django.db import models
from custom_user.models import AbstractEmailUser

class Volunteer(AbstractEmailUser):
    first_name = models.CharField(max_length=20, blank = True)
    last_name = models.CharField(max_length=20, blank = True)
    phone = models.CharField(max_length=15, blank = True)
    hearts = models.SmallIntegerField(default=0,blank = True)
    badges = models.SmallIntegerField(default=0,blank = True)
