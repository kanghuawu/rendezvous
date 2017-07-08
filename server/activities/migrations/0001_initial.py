# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-07 19:46
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('elders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('activity_id', models.AutoField(primary_key=True, serialize=False)),
                ('hours', models.IntegerField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('comment', models.CharField(blank=True, max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='ActivityType',
            fields=[
                ('type_id', models.AutoField(primary_key=True, serialize=False)),
                ('type_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_type',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='activities.ActivityType'),
        ),
        migrations.AddField(
            model_name='activity',
            name='elder',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='elders.Elder'),
        ),
        migrations.AddField(
            model_name='activity',
            name='user',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
