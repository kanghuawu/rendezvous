# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf import settings
from django.db import models


# Create your models here.
class Elder(models.Model):
    elder_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=20, blank = True)
    last_name = models.CharField(max_length=20, blank = True)
    phone = models.CharField(max_length=15, blank = True)

    def getFullName(self):
        return self.first_name + " " + self.last_name


class ElderVolunteer(models.Model):
    match_id = models.AutoField(primary_key=True)
    elder = models.ForeignKey('Elder', on_delete = models.SET_NULL, default=1, null = True)
    volunteer = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete = models.SET_NULL, null = True)
    class Meta:
    	unique_together = ("elder", "volunteer")

