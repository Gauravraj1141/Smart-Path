
from django.urls import path,include,re_path
from patient.apis.book_appointment import BookAppointment

urlpatterns = [
    path('book_appointment/', BookAppointment.as_view()),
    # path('generate_otp/', admin.site.urls)
]
