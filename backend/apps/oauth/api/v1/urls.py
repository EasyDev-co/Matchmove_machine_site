from django.urls import path
from apps.oauth.api.v1.providers import google
from apps.oauth.api.v1 import views

urlpatterns = [
    # Google URLs
    path('login/google/', google.google_login, name='oauth_google_login'),
    path('callback/google/', google.google_callback, name='oauth_google_callback'),
    # Login
    path('login/oauth_token/', views.oauth_token_login, name='oauth_token_login'),

    # Logout
    path('logout/', views.logout_view, name='oauth_logout'),
]