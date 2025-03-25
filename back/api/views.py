from django.shortcuts import render
from .models import Professor, Disciplinas
from .serializers import ProfessorSerializer, DisciplinasSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
import os
from django.conf import settings

@api_view(['GET', 'POST'])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Professor.objects.all()
        serializer = ProfessorSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else: 
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
class ProfessoresView(ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET', 'POST'])
def listar_disciplinas(request):
    if request.method == 'GET':
        queryset = Disciplinas.objects.all()
        serializer = DisciplinasSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DisciplinasSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
class DisciplinasView(ListCreateAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsAuthenticated]

class DisciplinasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Disciplinas.objects.all()
    serializer_class = DisciplinasSerializer
    permission_classes = [IsAuthenticated]
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_file(request, fileName):
    file_path = os.path.join(settings.MEDIA_ROOT, 'fotos', fileName)

    if os.path.exists(file_path):
        os.remove(file_path)
        return Response({"message": "Arquivo excluido com sucesso!"})
    else:
        return Response({"message": "Arquivo não escontrado!"}, status=404)