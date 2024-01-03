
from django.urls import path,include,re_path
from patient.apis.book_appointment import BookAppointment
from patient.apis.fetch_patient_appointments import FetchPatientAppointments

urlpatterns = [
    path('book_appointment/', BookAppointment.as_view()),
    path('patient_appointments/', FetchPatientAppointments.as_view())
]
