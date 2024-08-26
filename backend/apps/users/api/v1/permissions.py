from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Позволяет доступ только владельцу аккаунта.
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user
