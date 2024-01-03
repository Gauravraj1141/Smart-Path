from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from ...models import UserProfile, UserSession,UserStatus
from ...serializers import UserProfileSerializer, UserSessionSerializer
from random import randint
import uuid
from utility.apis.generate_token.generate_access_token import generate_user_access_token
from utility.apis.auth_decorator.session_authentication_decorator import authenticate_post_login_api_call
from utility.apis.communication.send_single_email import send_otp_to_user


class FetchUserProfile(APIView):
    """
    This API is used to fetch user profile
    """

    @authenticate_post_login_api_call
    def get(self, request):
        
        input_json = request.data
        json_params = input_json
        output_json = fetch_user_profile_json(json_params)
        return Response(output_json)


def fetch_user_profile_json(request):
    input_json, output_json = request, []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################
        user_details = UserProfile.objects.filter(profile_id=input_json['user_profile_id'])
        user_details_serializer = UserProfileSerializer(user_details, many=True).data

        for details in user_details_serializer:
            if details['status']==2:
                details['usertype'] = "Doctor"
            elif details['status']==1:
                details['usertype'] = "Patient"
        

        output_json = dict(zip(['Status', 'Message', 'Payload'],
                               [200, "User Profile Fetched Successfully!", user_details_serializer]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
