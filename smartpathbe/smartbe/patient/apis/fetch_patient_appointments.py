from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from utility.models import UserProfile, UserSession,UserStatus
from patient.models  import Appointment
from patient.serializers  import AppointmentSerializer
from utility.serializers import UserProfileSerializer, UserSessionSerializer
from random import randint
from django.db.models import Q
import uuid
from utility.apis.generate_token.generate_access_token import generate_user_access_token
from utility.apis.communication.send_single_email import send_otp_to_user
from utility.apis.auth_decorator.session_authentication_decorator import authenticate_post_login_api_call
from datetime import datetime


class FetchPatientAppointments(APIView):
    """
    This API is used to fetch appointments for doctor
    """
    @authenticate_post_login_api_call
    def get(self, request):
        input_json = request.data
        json_params = input_json
        output_json = fetch_patient_appointments_json(json_params)
        return Response(output_json)


def fetch_patient_appointments_json(request):
    input_json, output_json = request, []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################
        patient = input_json['user_profile_id']
        
        is_doctor = UserProfile.objects.filter(profile_id=patient,status_id = 1,is_verified=True).exists()
        if not is_doctor :
            output_json = dict(zip(['Status', 'Message', 'Payload'],
                               [404, "Profile Doesn't exist", None]))
        
        appointments_var = Appointment.objects.filter(patient_id = patient)
        appointments_details = AppointmentSerializer(appointments_var, many=True).data
        for appointment in appointments_details :
            doctor_profile = UserProfile.objects.get(profile_id=appointment['doctor'])
            appointment['doctor_name'] = f"{doctor_profile.first_name} {doctor_profile.last_name}"
        
        output_payload = appointments_details
        output_json = dict(zip(['Status', 'Message', 'Payload'],
                               [200, "Patient Appointments has been fetched", output_payload]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
