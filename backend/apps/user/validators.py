import re
from rest_framework import serializers


def validate_custom_password(value):
    """"
    Дополнительная валидация пароля.
    """
    if len(value) < 8:
        raise serializers.ValidationError(
            "Password must be at least 8 characters long."
        )
    if not re.search(r'[A-Za-z]', value):
        raise serializers.ValidationError(
            "Password must contain at least one letter."
        )
    if not re.search(r'[0-9]', value):
        raise serializers.ValidationError(
            "Password must contain at least one digit."
        )
    return value
