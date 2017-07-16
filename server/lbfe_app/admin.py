# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Volunteer, Elder, Activity, ActivityType, MyUser

admin.site.register(Volunteer)
admin.site.register(Elder)
admin.site.register(Activity)
admin.site.register(ActivityType)
admin.site.register(MyUser)
