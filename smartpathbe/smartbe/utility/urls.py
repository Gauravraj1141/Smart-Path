from django.urls import path,include,re_path
from utility.apis.user_registration.register_new_user import UserSignUp
from utility.apis.user_registration.verify_user_otp import VerifyUser
from utility.apis.user_registration.user_login import UserLogin

urlpatterns = [
    path('register_user/', UserSignUp.as_view()),
    path('verify_user_otp/', VerifyUser.as_view()),
    path('user_login/', UserLogin.as_view()),
]
