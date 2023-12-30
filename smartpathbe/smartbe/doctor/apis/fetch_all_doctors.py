from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from utility.models import UserProfile, UserSession,UserStatus
from utility.serializers import UserProfileSerializer, UserSessionSerializer

from django.db.models import Q
import uuid
from utility.apis.generate_token.generate_access_token import generate_user_access_token
from utility.apis.communication.send_single_email import send_otp_to_user


class FetchAllDoctors(APIView):
    """
    This API is used to fetch all doctors
    """
    def get(self, request):
        """
        :param request:

        {
           
        }
            
        """
        
        
        output_json = fetch_all_doctors_json()
        return Response(output_json)


def fetch_all_doctors_json():
    output_json =  []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################
        doctors_detail = UserProfile.objects.filter(is_verified=True, status=2)
        doctors_detail_var = UserProfileSerializer(doctors_detail, many=True).data
        for data in doctors_detail_var:
            data.pop("password")
        output_payload = doctors_detail_var

        # Step 3: return access token with profile id 
        output_json = dict(zip(['Status', 'Message', 'Payload'],
                               [200, "Successfully retrieved all doctors!", output_payload]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
