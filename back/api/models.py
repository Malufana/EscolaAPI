from django.db import models

class Professor(models.Model):
    ni = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    ocup = models.CharField(max_length=255)
    cel = models.CharField(max_length=255)
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)

class Disciplinas(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=255)
    qtdAula = models.IntegerField(null=False)