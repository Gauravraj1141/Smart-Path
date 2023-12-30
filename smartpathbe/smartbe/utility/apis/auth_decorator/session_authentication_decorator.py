import uuid
from functools import wraps
import jwt
from rest_framework.response import Response
from ..generate_token.generate_access_token import generate_user_access_token
from django.conf import settings
access_token_secret = "?SYB%,KB1n%&K*lXOk_/KE:@XnXfL4rA"


def authenticate_post_login_api_call(func):
    """
    decorator to check if API key is passed correctly or not for any post-login api call
    """
    @wraps(func)
    def authenticate_post_login_api_call_json(self, request):
        
        request_header_params = dict(zip(['access_token_header'],
                                         [request.headers.get('accesstoken')]))
        access_payload, input_json = None, {}
    
      
    
        try:
            access_token = request_header_params['access_token_header']
            access_payload = jwt.decode(access_token, access_token_secret, algorithms=['HS256'])
            request.data['access_token'] = access_token
            request.data['user_profile_id'] = access_payload['user_profile_id']
            request.data['exp_time_minute'] = 30
            request.data['access_token'] = generate_user_access_token(request.data)
        except jwt.InvalidSignatureError:
            output_json = dict(zip(["Status", "Message", "Payload"], [451, "InvalidSignatureError", None]))
            return Response(output_json)
        except jwt.DecodeError:
            output_json = dict(zip(["Status", "Message", "Payload"], [451, "Invalid Token", None]))
            return Response(output_json)
        except IndexError as ex:
            output_json = dict(zip(["Status", "Message", "Payload"], [451, f"Token prefix missing {ex}", None]))
            return Response(output_json)

        except jwt.ExpiredSignatureError:
            output_json = dict(zip(["Status", "Message", "Payload"], [451, "Token prefix expired", None]))
            return Response(output_json)
        return func(self, request)
    return authenticate_post_login_api_call_json
