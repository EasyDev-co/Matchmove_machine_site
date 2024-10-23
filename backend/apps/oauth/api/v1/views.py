import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import logout
from rest_framework_simplejwt.tokens import RefreshToken
from apps.oauth.api.v1.utils import create_or_get_user
from requests.exceptions import RequestException
from requests_oauthlib import OAuth1
from django.conf import settings


@api_view(['POST'])
@permission_classes([AllowAny])  # Разрешаем доступ без аутентификации
def oauth_token_login(request):
    """
    Вход через OAuth access_token.
    Ожидаемые данные POST:
    {
        'provider': 'google' или 'facebook',
        'access_token': 'строка access_token'
    }
    """
    provider = request.data.get('provider')
    access_token = request.data.get('access_token')
    oauth_token_secret = request.data.get('oauth_token_secret')

    if not provider or not access_token:
        return Response({"error": "Provider and access_token are required"}, status=status.HTTP_400_BAD_REQUEST)

    if provider == 'google':
        # Проверка токена с Google
        user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
        params = {'access_token': access_token}
        try:
            user_info_response = requests.get(user_info_url, params=params)
            user_info_response.raise_for_status()
            user_info = user_info_response.json()

            email = user_info.get('email')
            first_name = user_info.get('given_name')
            last_name = user_info.get('family_name')

            # Создание или получение пользователя
            user, created = create_or_get_user(email, first_name, last_name)

            # Генерация JWT токенов
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        except RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    elif provider == 'facebook':
        # Проверка токена с Facebook
        user_info_url = 'https://graph.facebook.com/me'
        params = {'access_token': access_token, 'fields': 'email,first_name,last_name'}
        try:
            user_info_response = requests.get(user_info_url, params=params)
            user_info_response.raise_for_status()
            user_info = user_info_response.json()

            email = user_info.get('email')
            first_name = user_info.get('first_name')
            last_name = user_info.get('last_name')

            if not email:
                return Response({"error": "No email provided by Facebook"}, status=status.HTTP_400_BAD_REQUEST)

            # Создание или получение пользователя
            user, created = create_or_get_user(email, first_name, last_name)

            # Генерация JWT токенов
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        except RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if provider == 'twitter':
        # Проверка токена с Twitter
        if not oauth_token_secret:
            return Response({"error": "oauth_token_secret is required for Twitter"}, status=status.HTTP_400_BAD_REQUEST)

        user_info_url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
        oauth = OAuth1(
            settings.TWITTER_CLIENT_ID,
            client_secret=settings.TWITTER_CLIENT_SECRET,
            resource_owner_key=access_token,
            resource_owner_secret=oauth_token_secret,
        )
        try:
            user_info_response = requests.get(user_info_url, auth=oauth)
            user_info_response.raise_for_status()
            user_info = user_info_response.json()

            email = user_info.get('email')
            first_name = user_info.get('name')
            last_name = None  # Twitter не предоставляет фамилию

            if not email:
                return Response({"error": "No email provided by Twitter"}, status=status.HTTP_400_BAD_REQUEST)

            user, created = create_or_get_user(email, first_name, last_name)

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        except RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if provider == 'microsoft':
        # Проверка токена с Microsoft
        user_info_url = 'https://graph.microsoft.com/v1.0/me'
        headers = {'Authorization': f'Bearer {access_token}'}
        try:
            user_info_response = requests.get(user_info_url, headers=headers)
            user_info_response.raise_for_status()
            user_info = user_info_response.json()

            email = user_info.get('mail') or user_info.get('userPrincipalName')
            first_name = user_info.get('givenName')
            last_name = user_info.get('surname')

            if not email:
                return Response({"error": "No email provided by Microsoft"}, status=status.HTTP_400_BAD_REQUEST)

            user, created = create_or_get_user(email, first_name, last_name)

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        except RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # Добавьте другие провайдеры как Google, Yandex, Mail.ru...
    else:
        return Response({"error": "Invalid provider"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    """Выход из аккаунта"""
    logout(request)
    return Response({"message": "Вы вышли из системы"}, status=status.HTTP_200_OK)