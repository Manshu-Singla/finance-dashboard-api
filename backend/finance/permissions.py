from rest_framework.permissions import SAFE_METHODS, BasePermission

from users.models import User
from users.permissions import get_request_user


class RecordPermission(BasePermission):
    """Viewer/Analyst can read, Admin can manage records."""

    def has_permission(self, request, view):
        user = get_request_user(request)
        if not user:
            return False
        if request.method in SAFE_METHODS:
            return True
        return user.role == User.Role.ADMIN


class SummaryPermission(BasePermission):
    """Analyst/Admin can inspect aggregate data."""

    def has_permission(self, request, view):
        user = get_request_user(request)
        if not user:
            return False
        return user.role in [User.Role.ANALYST, User.Role.ADMIN]
