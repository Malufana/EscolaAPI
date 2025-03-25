from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('professores/', listar_professores),
    path('prof/', ProfessoresView.as_view()),
    path('professores/<int:pk>/', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('disciplinas/', listar_disciplinas),
    path('disc/', DisciplinasView.as_view()),
    path('disciplinaAula/<int:pk>/', DisciplinasDetailView.as_view()),
    path('deleteFile/<str:fileName>/', delete_file)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)