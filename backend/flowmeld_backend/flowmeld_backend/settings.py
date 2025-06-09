# flowmeld_backend/settings.py

import os
from pathlib import Path
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file
load_dotenv(os.path.join(BASE_DIR, '.env')) # Make sure .env is in the backend root

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/ # Updated Django version link

# --- Core Security Settings ---
# SECURITY WARNING: keep the secret key used in production secret!
# The os.getenv() line for SECRET_KEY should be the only one.
# It prioritizes the environment variable, falling back to a default (only for dev).
SECRET_KEY = os.getenv('SECRET_KEY', 'default-insecure-key-for-development-only-replace-me-in-prod')

# SECURITY WARNING: don't run with debug turned on in production!
# Properly convert the environment variable string to a boolean.
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

# ALLOWED_HOSTS for security.
# Split by comma and filter out empty strings, and include common dev hosts.
ALLOWED_HOSTS = [host.strip() for host in os.getenv('ALLOWED_HOSTS', '127.0.0.1,localhost').split(',') if host.strip()]


# --- Application Definition ---

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',         # Django REST Framework
    'corsheaders',            # For Cross-Origin Resource Sharing (CORS)
    'channels',               # For real-time features (WebSockets)

    # Your apps
    'core',                   # Your core application
]

# --- Middleware Configuration ---
# CORS middleware must be placed very high, preferably first or second.
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # <--- Add this FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'flowmeld_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'flowmeld_backend.wsgi.application'

# --- Database Configuration ---
DATABASES = {
    'default': {
        # IMPORTANT: You had both sqlite3 and postgresql engines defined, which will cause issues.
        # We need to explicitly choose PostgreSQL and use environment variables.
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'), # Default to 'localhost' if not in .env
        'PORT': os.getenv('DB_PORT', '5432'),     # Default to '5432' if not in .env
    }
}


# --- Password Validation ---
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# --- Internationalization ---
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC' # Keep UTC for consistent time handling

USE_I18N = True

USE_TZ = True


# --- Static Files ---
# https://docs.djangoproject.com/en/5.0/howto/static-files/
STATIC_URL = 'static/'

# --- Default Primary Key Field Type ---
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- CORS Headers Configuration ---
# Specify allowed origins for your frontend application.
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React development server
    "http://127.0.0.1:3000",  # Another common local dev address
    # Add your frontend production domain here when deploying to Render!
    # E.g., "https://your-flowmeld-frontend.onrender.com",
]

# If you need to allow all origins for very early development, use this (less secure):
# CORS_ALLOW_ALL_ORIGINS = True # Comment out CORS_ALLOWED_ORIGINS if you enable this.

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# --- Django REST Framework (DRF) Configuration ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication', # Will add later for token auth
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', # Allow any user for now, tighten later
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

# --- Channels Configuration (for WebSockets/Real-time) ---
ASGI_APPLICATION = 'flowmeld_backend.asgi.application' # This points to your ASGI entry point

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.pubsub.RedisChannelLayer',
        'CONFIG': {
            # This should point to your Redis server (local or deployed)
            "hosts": [os.getenv('REDIS_URL', 'redis://localhost:6379/0')],
        },
    },
}