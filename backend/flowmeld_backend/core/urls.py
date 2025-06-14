# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views # Import your views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'personas', views.PersonaViewSet, basename='persona')
router.register(r'tasks', views.TaskViewSet, basename='task')

urlpatterns = [
    # This path handles user registration
    path('register/', views.register_user, name='register_user'),

    # This includes the URLs generated by the router (for personas and tasks)
    # The '' means these will be at the root of whatever path 'core.urls' is included at.
    path('', include(router.urls)),

    # You'll also need authentication URLs, e.g., for login/logout
    # This provides DRF's default login/logout views for the browsable API.
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('daily-suggestions/', views.get_daily_suggestions, name='daily_suggestions'), 
    path('user/me/', views.CurrentUserView.as_view(), name='current_user'), 
]