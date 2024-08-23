from rest_framework import serializers
from apps.users.models import User


class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "website",
            "portfolio",
            "about_me",
            "linkedin",
            "instagram",
            "youtube",
            "facebook",
            "vimeo",
            "profile_picture",
        ]


