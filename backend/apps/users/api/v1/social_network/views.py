import requests
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from config import settings

from loguru import logger

User = get_user_model()


class GoogleAuthCodeView(APIView):
    """
    Обработчик авторизации через Google по Authorization Code Flow.
    Ожидается, что фронтенд отправит параметр 'code'.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        code = request.data.get('code')
        logger.info(f"code: {code}")
        if not code:
            return Response(
                {"error": "Authorization code не передан."}, status=status.HTTP_400_BAD_REQUEST
            )

        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "code": code,
            "client_id": settings.GOOGLE_OAUTH_CLIENT_ID,
            "client_secret": settings.GOOGLE_OAUTH_SECRET,
            "redirect_uri": settings.GOOGLE_OAUTH_REDIRECT_URI,
            "grant_type": "authorization_code"
        }

        token_response = requests.post(token_url, data=data)
        if token_response.status_code != 200:
            return Response(
                {"error": "Обмен кода на токены не удался.", "details": token_response.json()},
                status=status.HTTP_400_BAD_REQUEST
            )

        token_data = token_response.json()
        access_token = token_data.get("access_token")
        id_token = token_data.get("id_token")

        if not access_token or not id_token:
            return Response(
                {"error": "Не удалось получить необходимые токены."},
                status=status.HTTP_400_BAD_REQUEST
            )

        userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        userinfo_response = requests.get(userinfo_url, params={"access_token": access_token})

        if userinfo_response.status_code != 200:
            return Response(
                {"error": "Не удалось получить данные пользователя."}, status=status.HTTP_400_BAD_REQUEST)

        userinfo_data = userinfo_response.json()
        email = userinfo_data.get("email")

        if not email:
            return Response(
                {"error": "Email не найден в данных пользователя."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = User.objects.get_or_create(email=email, defaults={
            "username": userinfo_data.get("name"),
            "is_verified": True,
        })
        if created:
            user.set_unusable_password()
            user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_info": userinfo_data
        }, status=status.HTTP_200_OK)

class FacebookAuthCodeView(APIView):
    """
    Обработчик авторизации через Facebook по Authorization Code Flow.
    Ожидается, что фронтенд отправит параметр 'code'.
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        code = request.data.get('code')

        if not code:
            return Response(
                {"error": "Authorization code не передан."},
                status=status.HTTP_400_BAD_REQUEST
            )

        token_url = "https://graph.facebook.com/v12.0/oauth/access_token"

        params = {
            "client_id": settings.FB_APP_ID,
            "redirect_uri": settings.FB_OAUTH_REDIRECT_URI,
            "client_secret": settings.FB_APP_SECRET,
            "code": code,
        }

        token_response = requests.get(token_url, params=params)
        if token_response.status_code != 200:
            return Response(
                {"error": "Не удалось обменять код на токен.", "details": token_response.json()},
                status=status.HTTP_400_BAD_REQUEST
            )

        token_data = token_response.json()
        access_token = token_data.get("access_token")

        if not access_token:
            return Response(
                {"error": "access_token не получен."},
                status=status.HTTP_400_BAD_REQUEST
            )
        userinfo_url = "https://graph.facebook.com/me"
        userinfo_params = {
            "fields": "id,name,email,picture",
            "access_token": access_token,
        }
        userinfo_response = requests.get(userinfo_url, params=userinfo_params)

        if userinfo_response.status_code != 200:
            return Response(
                {"error": "Не удалось получить данные пользователя."},
                status=status.HTTP_400_BAD_REQUEST
            )

        userinfo_data = userinfo_response.json()

        email = userinfo_data.get("email")
        name = userinfo_data.get("name")
        facebook_id = userinfo_data.get("id")

        defaults = {
            "username": name or email,
            "is_verified": True,
            "fb_user_id": facebook_id,
        }

        if not email:
            facebook_id = userinfo_data.get("id")

            defaults["user_without_email"] = True

            if not facebook_id:
                return Response(
                    {"error": "Ни email, ни id не получены из профиля Facebook."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            email = f"fb_{facebook_id}@example.com"

        user, created = User.objects.get_or_create(email=email, defaults=defaults)
        if created:
            user.set_unusable_password()
            user.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_info": userinfo_data
        }, status=status.HTTP_200_OK)
