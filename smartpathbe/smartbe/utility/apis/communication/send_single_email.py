from django.core.mail import EmailMessage
from django.template.loader import get_template
import base64

from django.conf import settings
EMAIL_ADMIN  = settings.EMAIL_HOST_USER

def send_otp_to_user(request):
    customer_detail = request
    message = get_template("emailtemplate/send_otp_to_user_email_template.html").render({
        'data': customer_detail
    })
    mail = EmailMessage(
        subject= "Email Verification for Smart Pathfinders",
        body=message,
        from_email=EMAIL_ADMIN,
        to=[customer_detail['email']],
        reply_to=[EMAIL_ADMIN],
    )
    mail.content_subtype = "html"
    return mail.send()

