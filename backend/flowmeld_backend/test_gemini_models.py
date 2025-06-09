# test_gemini_models.py
import google.generativeai as genai
import os
from dotenv import load_dotenv # <--- ADD THIS LINE!

# Load environment variables from .env file
load_dotenv() # <--- ADD THIS LINE!

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("GEMINI_API_KEY not found in environment variables. Make sure your .env is loaded.")
    exit()

genai.configure(api_key=GEMINI_API_KEY)

print("Available Gemini Models (look for 'generateContent' support):")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"  {m.name} (Supports: {m.supported_generation_methods})")
except Exception as e:
    print(f"Error listing models: {e}")