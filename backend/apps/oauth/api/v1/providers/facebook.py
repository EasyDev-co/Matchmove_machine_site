import requests
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from django.core.mail import send_mail
from requests.exceptions import RequestException
from apps.oauth.api.v1.utils import create_or_get_user


@api_view(["GET"])
@permission_classes([AllowAny])
def facebook_login(request):
    """Логин через Facebook"""
    try:
        callback_url = settings.FACEBOOK_REDIRECT_URI
        authorization_url = (
            "https://www.facebook.com/v21.0/dialog/oauth?response_type=code"
            f"&client_id={settings.FACEBOOK_CLIENT_ID}"
            f"&redirect_uri={callback_url}"
            f"&scope=email,public_profile"
        )
        return redirect(authorization_url)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def facebook_callback(request):
    """Обработка callback после авторизации через Facebook"""
    code = request.GET.get("code")
    if not code:
        return Response(
            {"error": "No code provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    data = {
        "code": code,
        "client_id": settings.FACEBOOK_CLIENT_ID,
        "client_secret": settings.FACEBOOK_CLIENT_SECRET,
        "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    try:
        # Получение access_token
        token_response = requests.get(
            "https://graph.facebook.com/v21.0/oauth/access_token", params=data
        )
        token_response.raise_for_status()
        token_data = token_response.json()
        access_token = token_data.get("access_token")

        # Получение информации о пользователе
        user_info_response = requests.get(
            "https://graph.facebook.com/me",
            params={
                "access_token": access_token,
                "fields": "email,first_name,last_name",
            },
        )
        user_info_response.raise_for_status()
        user_info = user_info_response.json()

        email = user_info.get("email")
        first_name = user_info.get("first_name")
        last_name = user_info.get("last_name")

        # Создание или получение пользователя
        user, created = create_or_get_user(email, first_name, last_name)

        if created:
            # Отправка приветственного письма (опционально)
            send_mail(
                "Добро пожаловать!",
                "Пожалуйста, подтвердите ваш email.",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )

        # Авторизация пользователя
        login(request, user, backend="django.contrib.auth.backends.ModelBackend")

        # Редирект на фронтенд с токеном
        frontend_url = settings.FRONTEND_URL
        redirect_url = f"{frontend_url}/auth/callback?token={access_token}"
        return redirect(redirect_url)

    except RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
