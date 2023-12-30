from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from utility.apis.dboperators.dboperators import serializer_save,update_record
from ...models import UserProfile, UserSession
from ...serializers import UserProfileSerializer, UserSessionSerializer
from random import randint
import uuid
from utility.apis.communication.send_single_email import send_otp_to_user


class VerifyUser(APIView):
    """
    This API is used to Verify user for the given Creds
    """
    def post(self, request):
        """
        :param request:

        {
            "payload": {
                "session_id": "fgsgsdagsadgsdfsfd",
                "otp": "44444",
            }
        }
            
        """
        input_json = request.data
        json_params = input_json
        output_json = verify_user_otp_json(json_params)
        return Response(output_json)


def verify_user_otp_json(request):
    input_json, output_json = request, []
    try:
        # ######################################################
        # Write API Logic here
        # ######################################################
        session_id = input_json['session_id']
        user_session = UserSession.objects.filter(session_id=session_id)
        if not user_session.exists():
            output_json = dict(zip(['Status', 'Message', 'Payload'],
                                   [404, f"Session_id doesn't match.",
                                    None]))
            return output_json
        
        user_session_details = UserSessionSerializer(user_session, many=True).data[0]
        user_profile_id = user_session_details['user_profile']
        otp = user_session_details['otp']
        if input_json['otp'] != otp:
            output_json = dict(zip(['Status', 'Message', 'Payload'],
                                   [404, f"Otp doesn't match.",
                                    None]))
            return output_json
        
        user_email_present = UserProfile.objects.filter(profile_id=user_profile_id).update(is_verified=True)
       
        output_json = dict(zip(['Status', 'Message'],
                               [200, f"You has been verified; now, let's proceed to log in"]))

        # ##############################################################################################
        # Write API logic above
        # ##############################################################################################
        return output_json

    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [404, f"Exception is : {ex}", None, None]))
        return output_json
