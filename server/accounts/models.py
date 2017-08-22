from django.db import models
from custom_user.models import AbstractEmailUser

class Volunteer(AbstractEmailUser):
    first_name = models.CharField(max_length=20, blank = True)
    last_name = models.CharField(max_length=20, blank = True)
    phone = models.CharField(max_length=15, blank = True)
    hearts = models.SmallIntegerField(default=0,blank = True)
    badges = models.SmallIntegerField(default=0,blank = True)

    @property
    def full_name(self):
    # def __unicode__(self):
        if self.first_name == '' and self.last_name == '':
            return 'Anonymous'
        return '%s %s' % (self.first_name, self.last_name)

    def increase_heart(self):
        self.hearts = self.hearts + 1
        self.save()

    def give_badge(self):
        if self.hearts >=10 and self.hearts <50:
            self.badges = 1
        elif self.hearts >=50 and self.hearts < 500:
            self.badges = 2
        elif self.hearts >=500 and self.hearts < 1000:
            self.badges = 3
        elif self.hearts >=1000 and self.hearts < 2000:
            self.badges = 4
        elif self.hearts >=2000:
            self.badges = 5
        self.save()
        print self.badges