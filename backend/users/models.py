from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        VIEWER = 'viewer', 'Viewer'
        ANALYST = 'analyst', 'Analyst'
        ADMIN = 'admin', 'Admin'

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.VIEWER)

    def __str__(self):
        return f'{self.username} ({self.role})'

# Create your models here.
