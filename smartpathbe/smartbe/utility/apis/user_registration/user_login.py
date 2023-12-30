from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from ...models import UserProfile, UserSession,UserStatus
from ...serializers import UserProfileSerializer, UserSessionSerializer
from random import randint
from django.db.models import Q
import uuid
from utility.apis.generate_token.generate_access_token import generate_user_access_token
from utility.apis.communication.send_single_email import send_otp_to_user


class UserLogin(APIView):
    """
    This API is used to login user for the given Creds
    """
    def post(self, request):
        """
        :param request:

        {
            "payload": {
                "username": "gaurav1141",
                "password": "44444",
                "user_status":1
            }
        }
            
        """
        input_json = request.data
        json_params = input_json
        output_json = user_login_json(json_params)
        return Response(output_json)


def user_login_json(request):
    input_json, output_json = request, []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################


        if input_json['user_status'] == 2:
            user_details_qs = UserProfile.objects.filter(Q(email_id = input_json['username']) | Q(username = input_json['username']) & Q(status=input_json['user_status']) & Q(is_verified=True)).values()
        
            if len(user_details_qs) == 0:
                output_json = dict(zip(['Status', 'Message', 'Payload'],
                                    [404, "username or email not found.",
                                        None]))
                return output_json
        

        elif input_json['user_status'] == 1:
            user_details_qs = UserProfile.objects.filter(Q(email_id = input_json['username']) | Q(username = input_json['username']) & Q(status=input_json['user_status']) & Q(is_verified=True)).values()

            if len(user_details_qs) == 0:
                output_json = dict(zip(['Status', 'Message', 'Payload'],
                                    [404, "username or email not found.",
                                        None]))
                return output_json
        
        # check user hashed passwords with input password
        user_hashed_password = user_details_qs[0]['password']
        input_password = input_json['password']
        password_correct  = check_password(input_password,user_hashed_password)
        
        if not password_correct :
            output_json = dict(zip(['Status', 'Message', 'Payload'],
                                   [404, "Incorrect Password.", None]))
            return output_json
        
        user_profile_id = user_details_qs[0]['profile_id']
        input_json['user_profile_id'] = user_profile_id

        # get user profile status 
        user_status = UserStatus.objects.filter(status_id=input_json['user_status']).values()[0]

        # Step 2: generate access token when all the conditions are full filled
        access_token = generate_user_access_token(input_json)
        user_detail = dict(zip(["user_profile_id","access_token","user_status"],[user_profile_id,access_token,user_status['status_id']]))

        # Step 3: return access token with profile id 
        output_json = dict(zip(['Status', 'Message', 'Payload'],
                               [200, "Logged in Successfully!", user_detail]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
