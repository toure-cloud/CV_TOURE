from django.contrib import admin
from .models import (
    Profil, CompetenceCategorie, Competence,
    Experience, Formation, Projet
)


class CompetenceInline(admin.TabularInline):
    model = Competence
    extra = 1


@admin.register(Profil)
class ProfilAdmin(admin.ModelAdmin):
    list_display = ('nom', 'titre', 'email')


@admin.register(CompetenceCategorie)
class CompetenceCategorieAdmin(admin.ModelAdmin):
    list_display = ('nom', 'icone', 'ordre')
    inlines = [CompetenceInline]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('poste', 'entreprise', 'date_debut', 'date_fin', 'en_cours')
    list_filter = ('en_cours',)


@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ('diplome', 'etablissement', 'en_cours')


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ('titre', 'statut', 'ordre')
    list_filter = ('statut',)