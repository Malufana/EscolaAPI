from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, listar_disciplinas, DisciplinasView, DisciplinasDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('professores/', listar_professores),
    path('prof/', ProfessoresView.as_view()),
    path('professores/<int:pk>/', ProfessoresDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('disciplinas/', listar_disciplinas),
    path('disc/', DisciplinasView.as_view()),
    path('disciplinaAula/<int:pk>/', DisciplinasDetailView.as_view())
]
