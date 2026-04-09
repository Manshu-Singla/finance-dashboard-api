from rest_framework.permissions import BasePermission

from .models import User


def get_request_user(request):
    user_id = request.headers.get('X-User-Id')
    if not user_id:
        return None

    try:
        return User.objects.get(pk=user_id)
    except (User.DoesNotExist, ValueError, TypeError):
        return None


class IsAuthenticatedByHeader(BasePermission):
    """A lightweight auth layer for assignment/demo purposes."""

    def has_permission(self, request, view):
        return get_request_user(request) is not None


class IsAdminByHeader(BasePermission):
    def has_permission(self, request, view):
        user = get_request_user(request)
        return bool(user and user.role == User.Role.ADMIN)
