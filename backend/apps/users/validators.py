import re
from rest_framework import serializers


def validate_custom_password(value):
    """"
    Дополнительная валидация пароля.
    """
    if not re.match(r'^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$', value):
        raise serializers.ValidationError(
            "Password must be at least 8 characters long and contain both letters and digits."
        )
    return value
