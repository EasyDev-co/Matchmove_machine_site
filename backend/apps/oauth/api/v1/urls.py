from django.urls import path
# from apps.oauth.api.v1.providers import google, yandex, mailru
from apps.oauth.api.v1.providers import google, facebook, twitter
from apps.oauth.api.v1 import views

urlpatterns = [
    # Google URLs
    path('login/google/', google.google_login, name='oauth_google_login'),
    path('callback/google/', google.google_callback, name='oauth_google_callback'),

    # Facebook URLs
    path('login/facebook/', facebook.facebook_login, name='oauth_facebook_login'),
    path('callback/facebook/', facebook.facebook_callback, name='oauth_facebook_callback'),

    path('login/twitter/', twitter.twitter_login, name='oauth_twitter_login'),
    path('callback/twitter/', twitter.twitter_callback, name='oauth_twitter_callback'),

    # Login
    path('login/oauth_token/', views.oauth_token_login, name='oauth_token_login'),

    # Logout
    path('logout/', views.logout_view, name='oauth_logout'),
]
