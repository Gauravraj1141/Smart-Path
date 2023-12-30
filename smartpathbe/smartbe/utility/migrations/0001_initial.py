# Generated by Django 5.0 on 2023-12-29 08:55

import datetime
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserStatus',
            fields=[
                ('status_id', models.AutoField(primary_key=True, serialize=False)),
                ('status_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('profile_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(default=None, max_length=100, null=True)),
                ('last_name', models.CharField(default=None, max_length=100, null=True)),
                ('email_id', models.EmailField(default=None, max_length=100, null=True)),
                ('username', models.CharField(default=None, max_length=100, null=True)),
                ('password', models.CharField(default=None, max_length=100, null=True)),
                ('phone_no', models.CharField(default=None, max_length=100, null=True)),
                ('phone_code', models.CharField(default=91, max_length=100, null=True)),
                ('added_date', models.DateTimeField(default=datetime.datetime.now)),
                ('is_verified', models.BooleanField(default=False)),
                ('status', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='utility.userstatus')),
            ],
        ),
    ]