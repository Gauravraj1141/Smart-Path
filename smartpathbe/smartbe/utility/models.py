from django.db import models
import uuid
from datetime import datetime

# Create your models here.
class UserStatus(models.Model):
    status_id = models.AutoField(primary_key=True)
    status_name = models.CharField(max_length=200)

    def __str__(self):
        return str(self.status_id)


class UserProfile(models.Model):
    profile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100, default=None, null=True)
    last_name = models.CharField(max_length=100, default=None, null=True)
    email_id = models.EmailField(max_length=100, default=None, null=True)
    username = models.CharField(max_length=100, default=None, null=True)
    password = models.CharField(max_length=100, default=None, null=True)
    phone_no = models.CharField(default=None, null=True, max_length=100)
    phone_code = models.CharField(default=91, null=True, max_length=100)
    added_date = models.DateTimeField(default=datetime.now)
    status = models.ForeignKey(UserStatus, default=1, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
  
    def __str__(self):
        return str(self.profile_id)

class UserSession(models.Model):
    session_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_profile = models.ForeignKey(UserProfile,  on_delete=models.CASCADE)
    otp = models.IntegerField()

    def __str__(self):
        return str(self.session_id)
