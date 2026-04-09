from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Finance Dashboard', {'fields': ('role',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Finance Dashboard', {'fields': ('email', 'role')}),
    )
    list_display = ('id', 'username', 'email', 'role', 'is_staff')

# Register your models here.
