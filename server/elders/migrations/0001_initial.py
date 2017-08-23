# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-18 02:54
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Elder',
            fields=[
                ('elder_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=20)),
                ('last_name', models.CharField(blank=True, max_length=20)),
                ('phone', models.CharField(blank=True, max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='ElderVolunteer',
            fields=[
                ('match_id', models.AutoField(primary_key=True, serialize=False)),
                ('elder', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='elders.Elder')),
                ('volunteer', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
