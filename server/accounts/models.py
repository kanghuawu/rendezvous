from django.db import models
from django.utils import timezone
from custom_user.models import AbstractEmailUser

class Volunteer(AbstractEmailUser):
    first_name = models.CharField(max_length=20, blank = True)
    last_name = models.CharField(max_length=20, blank = True)
    token_last_expired = models.DateTimeField(default=timezone.now)
    phone = models.CharField(max_length=15, blank = True)
    hearts = models.SmallIntegerField(default=0,blank = True)
    badges = models.SmallIntegerField(default=0,blank = True)

    @property
    def full_name(self):
    # def __unicode__(self):
        if self.first_name == '' and self.last_name == '':
            return 'Anonymous'
        return '%s %s' % (self.first_name, self.last_name)
