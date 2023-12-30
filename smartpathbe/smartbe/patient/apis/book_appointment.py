from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from utility.models import UserProfile, UserSession,UserStatus
from ..models  import Appointment
from ..serializers  import AppointmentSerializer
from utility.serializers import UserProfileSerializer, UserSessionSerializer
from random import randint
from django.db.models import Q
import uuid
from utility.apis.generate_token.generate_access_token import generate_user_access_token
from utility.apis.communication.send_single_email import send_otp_to_user
from utility.apis.auth_decorator.session_authentication_decorator import authenticate_post_login_api_call
from datetime import datetime

class BookAppointment(APIView):
    """
    This API is used to book a appointment to doctor
    """
    @authenticate_post_login_api_call
    def post(self, request):
        """
        :param request:
        {
            "payload": {
                "doctor": "sdflasjkdflkjaslfkjas",
                "description": "I have some headoc",
            }
        }
            
        """
        input_json = request.data
        json_params = input_json
        output_json = book_appointment_json(json_params)
        return Response(output_json)


def book_appointment_json(request):
    input_json, output_json = request, []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################
        patient = input_json['user_profile_id']
        appointment_creds = dict(zip(["patient","doctor","illness_description","added_date"],[patient, input_json['doctor'], input_json['description'], datetime.now()]))

        appointment_details = serializer_save(AppointmentSerializer,appointment_creds).data
        output_payload = appointment_details

        output_json = dict(zip(['Status', 'Message', 'Payload'],
                               [200, "Appointment has been booked!", output_payload]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
