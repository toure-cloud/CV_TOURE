from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import (
    Profil, CompetenceCategorie, Experience, Formation, Projet
)
from .serializers import (
    ProfilSerializer, CompetenceCategorieSerializer,
    ExperienceSerializer, FormationSerializer, ProjetSerializer
)


@api_view(['GET'])
def profil_detail(request):
    profil = Profil.objects.first()
    if not profil:
        return Response({})
    serializer = ProfilSerializer(profil, context={'request': request})
    return Response(serializer.data)


class CompetenceCategorieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompetenceCategorie.objects.prefetch_related('competences')
    serializer_class = CompetenceCategorieSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class FormationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer


class ProjetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer