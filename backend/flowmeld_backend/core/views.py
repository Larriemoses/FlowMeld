from rest_framework import viewsets, permissions, serializers # <--- Make sure 'serializers' is here!
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.views import APIView # <--- Import APIView
from .models import Persona, Task
from .serializers import PersonaSerializer, TaskSerializer, UserSerializer # These are YOUR serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .services.ai_service import generate_persona_details 
from django.views.decorators.csrf import csrf_exempt # <--- Add this import!
from .serializers import UserSerializer
from .services.ai_service import generate_daily_plan



User = get_user_model()


# --- User Related Views ---
@api_view(['POST'])
@permission_classes([permissions.AllowAny]) # Allow anyone to register
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True): # raise_exception=True gives better error messages
        user = serializer.save() # Password hashing is now handled by the serializer's create method
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# --- Persona Views ---
class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can manage their persona

    def get_queryset(self):
        """
        Optionally restricts the returned personas to a given user,
        by filtering against a `user_id` query parameter in the URL.
        """
        # Ensure users can only see/edit their own persona
        return Persona.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Ensure that a persona is created for the authenticated user
        and trigger AI generation.
        """
        if Persona.objects.filter(user=self.request.user).exists():
            raise serializers.ValidationError({"detail": "User already has a persona."})

        # Get inputs from the serializer's validated data
        daily_challenges = serializer.validated_data.get('daily_challenges_input', '')
        goals = serializer.validated_data.get('goals_input', '')

        # Call AI service to generate persona details
        ai_details = generate_persona_details(daily_challenges, goals)

        # Add AI-generated details to the data before saving
        serializer.save(
            user=self.request.user,
            ai_generated_persona_summary=ai_details['summary'],
            ai_personality_traits=ai_details['personality_traits']
        )

    def perform_update(self, serializer):
        """
        Ensure only the owner can update their persona and trigger AI re-generation
        if input fields are changed.
        """
        # get_queryset already filters by user, so this implicitly ensures ownership.

        # Get inputs for AI re-generation
        daily_challenges = serializer.validated_data.get(
            'daily_challenges_input', serializer.instance.daily_challenges_input
        )
        goals = serializer.validated_data.get(
            'goals_input', serializer.instance.goals_input
        )

        # Check if relevant input fields have changed to trigger AI re-gen
        if (daily_challenges != serializer.instance.daily_challenges_input or
            goals != serializer.instance.goals_input):

            ai_details = generate_persona_details(daily_challenges, goals)
            serializer.save(
                ai_generated_persona_summary=ai_details['summary'],
                ai_personality_traits=ai_details['personality_traits']
            )
        else:
            # If no relevant input fields changed, just save without AI call
            serializer.save()

# --- Task Views ---
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can manage their tasks

    def get_queryset(self):
        """
        Ensure users can only see/edit their own tasks.
        """
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Ensure that a task is created for the authenticated user.
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """
        Ensure only the owner can update their tasks.
        """
        # get_queryset already filters by user, so this implicitly ensures ownership.
        serializer.save()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_daily_suggestions(request):
    """
    API endpoint for the Daily Planner Agent to provide suggestions based on persona and tasks.
    """
    user = request.user

    # 1. Retrieve user's persona
    try:
        persona = Persona.objects.get(user=user)
        persona_summary = persona.ai_generated_persona_summary
        personality_traits = persona.ai_personality_traits
    except Persona.DoesNotExist:
        return Response(
            {"detail": "No persona found for this user. Please create one first."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # 2. Retrieve user's active tasks (e.g., pending or in progress)
    active_tasks_queryset = Task.objects.filter(
        user=user,
        status__in=['pending', 'in_progress'] # Filter for relevant statuses
    ).order_by('due_date', '-ai_suggested_priority') # Order for AI context

    # Serialize tasks to pass to AI service (AI doesn't need ORM objects)
    tasks_data = []
    for task in active_tasks_queryset:
        tasks_data.append({
            'title': task.title,
            'description': task.description,
            'status': task.status,
            'ai_suggested_priority': task.ai_suggested_priority
        })

    # 3. Call AI service to generate daily plan
    ai_plan = generate_daily_plan(persona_summary, personality_traits, tasks_data)

    return Response(ai_plan, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated] # Only authenticated users can access

    def get(self, request):
        """
        Returns the current authenticated user's details.
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)