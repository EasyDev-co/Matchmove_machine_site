import urllib.parse
import uuid
import hashlib
import base64
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Функции для генерации PKCE
def generate_code_verifier():
    return base64.urlsafe_b64encode(uuid.uuid4().bytes).decode('utf-8').rstrip('=')

def generate_code_challenge(verifier):
    challenge = hashlib.sha256(verifier.encode('utf-8')).digest()
    return base64.urlsafe_b64encode(challenge).decode('utf-8').rstrip('=')


@api_view(['GET'])
def twitter_login(request):
    try:
        state = str(uuid.uuid4())  # Защита от CSRF
        code_verifier = generate_code_verifier()
        code_challenge = generate_code_challenge(code_verifier)

        # Сохранение значений в сессии
        request.session['oauth_state'] = state
        request.session['code_verifier'] = code_verifier

        # Параметры для ссылки авторизации
        params = {
            'response_type': 'code',
            'client_id': 'WlFsaFZXNmpZU2lLRlRHWkxBUjM6MTpjaQ',
            'redirect_uri': urllib.parse.quote('http://127.0.0.1/oauth/callback', safe=''),
            'scope': 'tweet.read follows.read mute.read like.read block.read offline.access',
            'state': state,
            'code_challenge': code_challenge,
            'code_challenge_method': 'S256'
        }

        # Генерация URL авторизации
        authorization_url = f"https://twitter.com/i/oauth2/authorize?{urllib.parse.urlencode(params)}"
        print(f"Redirecting to authorization URL: {authorization_url}")
        return redirect(authorization_url)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def twitter_callback(request):
    """Handle callback after authorization via Twitter"""
    code = request.GET.get('code')
    state = request.GET.get('state')

    if state != request.session.get('oauth_state'):
        return Response({"error": "Invalid state parameter"}, status=status.HTTP_400_BAD_REQUEST)

    if not code:
        return Response({"error": "Invalid callback data"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        token_url = 'https://api.x.com/2/oauth2/token'
        client_id = settings.TWITTER_CLIENT_ID
        client_secret = settings.TWITTER_CLIENT_SECRET
        callback_url = settings.TWITTER_CALLBACK_URI

        client_credentials = f"{client_id}:{client_secret}"
        b64_client_credentials = base64.b64encode(client_credentials.encode()).decode()

        headers = {
            'Authorization': f'Basic {b64_client_credentials}',
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        payload = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': callback_url,
        }

        response = requests.post(token_url, headers=headers, data=payload)
        response.raise_for_status()
        
        access_token_data = response.json()
        access_token = access_token_data.get('access_token')

        user_info_url = 'https://api.x.com/2/me' 
        user_info_headers = {
            'Authorization': f'Bearer {access_token}',
        }

        user_info_response = requests.get(user_info_url, headers=user_info_headers)
        user_info_response.raise_for_status()
        user_info = user_info_response.json()

        email = user_info.get('email')
        first_name = user_info.get('name') 
        last_name = None 

        user, created = create_or_get_user(email, first_name, last_name)

        login(request, user, backend='django.contrib.auth.backends.ModelBackend')

        frontend_url = settings.FRONTEND_URL
        redirect_url = f"{frontend_url}/auth/callback?token={access_token}"
        return redirect(redirect_url)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
