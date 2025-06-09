# core/services/ai_service.py
import google.generativeai as genai
import os
import json # To parse potential JSON responses from AI

# Configure the Gemini API key from environment variables
# Ensure GEMINI_API_KEY is set in your .env file
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")
genai.configure(api_key=GEMINI_API_KEY)

def generate_persona_details(daily_challenges: str, goals: str) -> dict:
    """
    Calls the Gemini API to generate a persona summary and personality traits.

    Args:
        daily_challenges: User's input about their daily challenges.
        goals: User's input about their goals.

    Returns:
        A dictionary containing 'summary' and 'personality_traits'.
    """
    # You can choose a different model if you prefer (e.g., 'gemini-pro-vision' for multimodal)
    model = genai.GenerativeModel('models/gemini-1.5-flash')

    # Craft a detailed prompt for the AI
    prompt = f"""
    Based on the following user inputs, generate a concise persona summary and list key personality traits.
    The persona summary should describe their core motivations and current situation.
    The personality traits should be comma-separated or a brief sentence.

    User's Daily Challenges: {daily_challenges}
    User's Goals: {goals}

    Format the output as a JSON object with two keys:
    "summary": "Concise persona summary here."
    "personality_traits": "Comma-separated traits or a brief description."

    Example:
    {{
      "summary": "A highly ambitious individual seeking efficiency to balance demanding work and personal growth.",
      "personality_traits": "Organized, Goal-oriented, Proactive, Self-aware"
    }}
    """

    try:
        response = model.generate_content(prompt)
        # Access the text part of the Content object
        ai_output_text = response.text.strip()

        # Attempt to parse as JSON
        # Sometimes AI might add markdown backticks, try to clean it
        if ai_output_text.startswith('```json'):
            ai_output_text = ai_output_text[7:]
        if ai_output_text.endswith('```'):
            ai_output_text = ai_output_text[:-3]

        ai_data = json.loads(ai_output_text)

        # Validate expected keys
        summary = ai_data.get('summary', '')
        personality_traits = ai_data.get('personality_traits', '')

        return {
            'summary': summary,
            'personality_traits': personality_traits
        }

    except Exception as e:
        print(f"Error calling Gemini API for persona generation: {e}")
        # You might want to log this error properly with a logging framework
        return {
            'summary': "AI could not generate a persona summary at this time.",
            'personality_traits': "N/A"
        }

# You can add more AI service functions here later, e.g., for task suggestions
def get_task_suggestions(persona_summary: str, current_tasks: list) -> list:
    """
    Placeholder for an AI function to suggest tasks.
    """
    print(f"DEBUG: Generating task suggestions for persona: {persona_summary}, tasks: {current_tasks}")
    # In a real implementation, you'd craft a prompt with persona and tasks
    # and call the AI model to get suggestions.
    return ["Review Q2 project plan", "Schedule sync with team", "Research new productivity tools"]


def generate_daily_plan(persona_summary: str, personality_traits: str, tasks: list) -> dict:
    """
    Generates a daily plan/suggestions based on user's persona and current tasks.

    Args:
        persona_summary: AI-generated summary of the user's persona.
        personality_traits: AI-generated personality traits.
        tasks: A list of current tasks, each being a dictionary (e.g., {'title': '...', 'description': '...', 'status': '...'}).

    Returns:
        A dictionary containing a 'plan_summary' (overall plan) and 'suggested_tasks' (list of prioritized tasks).
    """
    model = genai.GenerativeModel('models/gemini-1.5-flash') # Consider 'gemini-1.5-pro' for more complex reasoning

    # Format tasks for the prompt
    formatted_tasks = "\n".join([
        f"- Title: {task['title']}, Description: {task['description']}, Status: {task['status']}, Priority: {task['ai_suggested_priority']}"
        for task in tasks
    ]) if tasks else "No specific tasks provided. Suggest general productivity steps."

    prompt = f"""
    You are a highly effective AI productivity assistant.
    Based on the following user persona and their current tasks, generate a concise daily plan and prioritize/suggest specific actions.

    User Persona Summary: {persona_summary}
    User Personality Traits: {personality_traits}

    Current Tasks:
    {formatted_tasks}

    If there are no specific tasks, suggest general productivity steps aligned with the user's persona.
    Prioritize tasks and provide actionable advice.
    Focus on steps that improve productivity and align with their goals.

    Format the output as a JSON object with two keys:
    "plan_summary": "Overall summary of the suggested plan for the day."
    "suggested_tasks": [
        {{"title": "Task 1 Title", "description": "Details", "priority": "high", "time_estimate": "30m"}},
        {{"title": "Task 2 Title", "description": "Details", "priority": "medium", "time_estimate": "1h"}},
        // ... more tasks
    ]

    Example:
    {{
      "plan_summary": "Focus on high-priority tasks, allocate distraction-free blocks, and review progress.",
      "suggested_tasks": [
        {{"title": "Deep work on Q2 report", "description": "Allocate 2 hours of uninterrupted time.", "priority": "critical", "time_estimate": "2h"}},
        {{"title": "Clear email inbox", "description": "Process urgent emails and archive others.", "priority": "medium", "time_estimate": "30m"}}
      ]
    }}
    """

    try:
        response = model.generate_content(prompt)
        ai_output_text = response.text.strip()

        if ai_output_text.startswith('```json'):
            ai_output_text = ai_output_text[7:]
        if ai_output_text.endswith('```'):
            ai_output_text = ai_output_text[:-3]

        ai_data = json.loads(ai_output_text)

        plan_summary = ai_data.get('plan_summary', 'Could not generate plan summary.')
        suggested_tasks = ai_data.get('suggested_tasks', [])

        return {
            'plan_summary': plan_summary,
            'suggested_tasks': suggested_tasks
        }

    except Exception as e:
        print(f"Error calling Gemini API for daily plan generation: {e}")
        return {
            'plan_summary': "AI could not generate a daily plan at this time.",
            'suggested_tasks': [
                {"title": "Review your tasks", "description": "Check priorities and due dates.", "priority": "high"},
                {"title": "Take a short break", "description": "Clear your mind.", "priority": "low"}
            ]
        }
