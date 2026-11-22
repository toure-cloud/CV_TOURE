from rest_framework import serializers
from .models import (
    Profil, CompetenceCategorie, Competence,
    Experience, Formation, Projet
)


class ProfilSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    cv_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = Profil
        fields = '__all__'

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return None

    def get_cv_pdf_url(self, obj):
        if obj.cv_pdf:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.cv_pdf.url) if request else obj.cv_pdf.url
        return None


class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = ['id', 'nom', 'niveau', 'ordre']


class CompetenceCategorieSerializer(serializers.ModelSerializer):
    competences = CompetenceSerializer(many=True, read_only=True)

    class Meta:
        model = CompetenceCategorie
        fields = ['id', 'nom', 'description', 'icone', 'competences']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = '__all__'


class ProjetSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    technologies_list = serializers.ReadOnlyField()

    class Meta:
        model = Projet
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None