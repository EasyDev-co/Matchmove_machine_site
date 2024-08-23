import re
from rest_framework import serializers


def validate_custom_password(value):
    """"
    Дополнительная валидация пароля,
    остальные валидации уже есть в базовом модуле Джанго.
    """
    if not re.search(r"[0-9]", value):
        raise serializers.ValidationError(
            "Password must contain at least one digit."
        )
    return value
