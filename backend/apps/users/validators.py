import re
from rest_framework import serializers

from loguru import logger

def validate_custom_password(value):
    """Дополнительная валидация пароля."""

    if len(value) <= 8:
        logger.error("Error len")
        raise serializers.ValidationError(
            "Password must be at least 8 characters long."
        )

    if not re.search(r'[A-Za-z]', value):
        logger.info("Error char")
        raise serializers.ValidationError(
            "Password must contain at least one letter."
        )

    if not re.search(r'\d', value):
        logger.info("Error number")
        raise serializers.ValidationError(
            "Password must contain at least one digit."
        )

    return value