# core/serializers.py
from rest_framework import serializers
from .models import Persona, Task
from django.contrib.auth import get_user_model # To get the currently active User model

User = get_user_model() # Get the User model

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8) # Add password field for write-only

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password'] # Include password
        read_only_fields = ['id'] # Keep id as read-only

    def create(self, validated_data):
        # Override the create method to handle password hashing
        password = validated_data.pop('password') # Remove password from validated_data
        user = User.objects.create_user(**validated_data) # Create user using create_user
        user.set_password(password) # Set and hash the password
        user.save()
        return user

    def update(self, instance, validated_data):
        # Handle password update separately if needed, otherwise exclude it
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data) # Use super() for other fields

class PersonaSerializer(serializers.ModelSerializer):
    # Nested serializer to include user details when fetching a persona
    user = serializers.ReadOnlyField(source='user.username') # Changed this for simplicity with nested user display

    class Meta:
        model = Persona
        fields = [
            'id', 'user', 'daily_challenges_input', 'goals_input',
            'ai_generated_persona_summary', 'ai_personality_traits',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

class TaskSerializer(serializers.ModelSerializer):
    # Nested serializer to include user details when fetching a task
    user = serializers.ReadOnlyField(source='user.username') # Changed this for simplicity with nested user display

    class Meta:
        model = Task
        fields = [
            'id', 'user', 'title', 'description', 'due_date',
            'status', 'ai_suggested_priority', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']   