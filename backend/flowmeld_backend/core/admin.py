# core/admin.py
from django.contrib import admin
from .models import Persona, Task # Import your new models

admin.site.register(Persona)
admin.site.register(Task)