# flowmeld_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import ( # <--- Add this import!
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView, # Optional, for token validation
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    # JWT Authentication Endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # <--- ADD THIS
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # <--- ADD THIS
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),   # <--- ADD THIS (Optional)
]