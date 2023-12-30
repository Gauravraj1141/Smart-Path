from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from ...models import UserProfile, UserSession
from ...serializers import UserProfileSerializer, UserSessionSerializer
from random import randint
import uuid
from utility.apis.communication.send_single_email import send_otp_to_user


class UserSignUp(APIView):
    """
    This API is used to Register New user for the given Creds
    """
    def post(self, request):
        """
        :param request:

        {
            "payload": {
                "username": "garuav321r",
                "email_id": "raj@mailinator.com",
                "password": "raj321r",
                "first_name": null,
                "last_name": null,
            
            }
        }
            
        """
        input_json = request.data
        json_params = input_json
        output_json = user_sign_up_json(json_params)
        return Response(output_json)


def user_sign_up_json(request):
    input_json, output_json = request, []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################
        # Step 1: cehck if the user is not present in database with this email id after that create a new profile for this email
        user_email = input_json['email_id']
        user_email_present = UserProfile.objects.filter(is_verified=True, email_id = user_email).exists()
        if user_email_present:
            output_json = dict(zip(['Status', 'Message', 'Payload'],
                                   [404, f"Email already exist, Please login with this email.",
                                    None]))
            return output_json
        
        user_name_present = UserProfile.objects.filter(is_verified=True, username = input_json['username']).exists()
        if user_name_present:
            output_json = dict(zip(['Status', 'Message', 'Payload'],
                                   [404, f"Username already exist.",
                                    None]))
            return output_json
        
        # Change password to hashed and store the hashed password
        input_password = input_json['password']
        hashed_password = make_password(input_password)
        
        # create user profile 
        user_creds = dict(zip(['email_id', 'username', 'password', "first_name","last_name","status"], [user_email,input_json['username'],hashed_password,input_json['first_name'],input_json['last_name'],1]))

        register_new_user = serializer_save(UserProfileSerializer,user_creds).data

        # create otp for  this new user 
        otp_var = randint(100000, 999999)

        session_cred = dict(zip(["user_profile","otp"],[register_new_user['profile_id'],otp_var]))
        session_data = serializer_save(UserSessionSerializer,session_cred).data
        session_data.pop("user_profile")
        session_data.pop("otp")
        output_payload = session_data
        # send email to user 
        email_params = {
            "otp": otp_var,
            "email": input_json['email_id'],
        }
        send_otp_to_user(email_params)

        # Step 6: return profile_id with success code that user register successfully
        output_json = dict(zip(['Status', 'Message',"Payload"],
                               [200, f"User has been successfully reigstered",output_payload]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
