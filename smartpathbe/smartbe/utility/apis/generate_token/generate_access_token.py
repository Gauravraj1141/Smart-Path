from django.conf import settings
from datetime import datetime,timedelta
import jwt
access_token_secret = "?SYB%,KB1n%&K*lXOk_/KE:@XnXfL4rA"


def generate_user_access_token(request):
    input_json, output_json = request, []
    try:
        access_token_payload = {
            'user_profile_id': str(input_json['user_profile_id']),
            'exp': datetime.utcnow() + timedelta(days=4),
            'iat': datetime.utcnow(),
        }
        access_token = jwt.encode(access_token_payload,access_token_secret, algorithm='HS256')
        return access_token
    except Exception as ex:
        output_json = dict(zip(['Status', 'Message', 'Request_details', 'Payload'],
                               [403, f"Exception is : {ex}", None, None]))
        return output_json