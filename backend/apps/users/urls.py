from django.urls import path, include


urlpatterns = [
    path('registration/', include('apps.users.registration.urls'))
]
