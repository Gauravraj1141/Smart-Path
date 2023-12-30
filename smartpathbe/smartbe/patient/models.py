from django.db import models
import uuid
from datetime import datetime
from utility.models import UserProfile


class Appointment(models.Model):
    appointment_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='patient_appointment')
    doctor = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='doctor_appointment')
    illness_description = models.TextField()
    added_date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return str(self.appointment_id)
