from django.urls import path
from doctor.apis.fetch_all_doctors import FetchAllDoctors
from doctor.apis.fetch_appointments import FetchAppointments

urlpatterns = [
    path('fetch_doctors/', FetchAllDoctors.as_view()),
    path('fetch_appointments/', FetchAppointments.as_view()),
]
