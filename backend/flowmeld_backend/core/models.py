# core/models.py
from django.db import models
from django.conf import settings # To link to the built-in User model

class Persona(models.Model):
    # Link to the User model (one-to-one relationship, a user has one persona)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='persona',
        help_text="The user associated with this persona."
    )

    # Raw questionnaire data (e.g., JSONField for flexibility, or individual CharFields)
    # We'll start simple, you can expand this with a JSONField later if needed.
    # For now, let's assume some basic inputs lead to the AI persona.
    # Example: What are your daily challenges? (This is part of the questionnaire)
    daily_challenges_input = models.TextField(
        blank=True,
        help_text="User's input regarding daily challenges."
    )
    # Example: What are your goals?
    goals_input = models.TextField(
        blank=True,
        help_text="User's input regarding their goals."
    )
    # ... add more questionnaire inputs as needed based on your MVP scope

    # AI-generated persona details
    ai_generated_persona_summary = models.TextField(
        blank=True,
        help_text="AI-generated summary of the user's persona based on inputs."
    )
    ai_personality_traits = models.TextField(
        blank=True,
        help_text="AI-generated description of personality traits (e.g., JSON, or simple text)."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta: # <--- ADD THIS BLOCK
        ordering = ['-created_at'] # Order by most recently created (descending)


    def __str__(self):
        return f"Persona for {self.user.username}"

class Task(models.Model):
    # Link to the User model (one-to-many, a user can have many tasks)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tasks',
        help_text="The user who owns this task."
    )

    title = models.CharField(
        max_length=255,
        help_text="Brief title of the task."
    )
    description = models.TextField(
        blank=True,
        help_text="Detailed description of the task."
    )
    due_date = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Optional due date and time for the task."
    )

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        help_text="Current status of the task."
    )

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    # AI-suggested priority (can be manual override)
    ai_suggested_priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        help_text="AI-suggested priority for the task."
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['due_date', 'ai_suggested_priority'] # Order by due date, then priority

    def __str__(self):
        return self.title