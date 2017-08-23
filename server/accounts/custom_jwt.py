# from django.utils.dateformat import format

# from rest_framework import exceptions
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# class CustomJSONWebTokenAuthentication(JSONWebTokenAuthentication):
#     """ Expire token on password change and force user to re-authenticate. """

#     def authenticate_credentials(self, payload):
#         user = super().authenticate_credentials(payload)

#         orig_iat = int(payload['orig_iat'])
#         token_last_expired = int(format(token_last_expired, 'U'))
#         print orig_iat
#         print token_last_expired
#         print orig_iat < token_last_expired
#         if orig_iat < token_last_expired:
#             msg = 'Users must re-authenticate after logging out.'
#             raise exceptions.AuthenticationFailed(msg)

#         return user

from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings


def jwt_get_secret_key(payload=None):
    """
    For enhanced security you may want to use a secret key based on user.
    This way you have an option to logout only this user if:
        - token is compromised
        - password is changed
        - etc.
    """
    if api_settings.JWT_GET_USER_SECRET_KEY:
        return api_settings.JWT_SECRET_KEY + payload.password[-15:]
    return api_settings.JWT_SECRET_KEY