# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.db import models


class Volunteer(models.Model):
	volunteer_id = models.AutoField(primary_key=True)
	first_name = models.CharField(max_length=20)
	last_name = models.CharField(max_length=20)
	phone = models.CharField(max_length=15, blank = True)
	hearts = models.SmallIntegerField()
	badges = models.SmallIntegerField()

	def __str__(self):
		return self.first_name + " "+ self.last_name
