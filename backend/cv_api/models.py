from django.db import models


class Profil(models.Model):
    nom = models.CharField(max_length=100)
    titre = models.CharField(max_length=200)
    bio = models.TextField()
    email = models.EmailField()
    telephone = models.CharField(max_length=20, blank=True)
    localisation = models.CharField(max_length=150, blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    cv_pdf = models.FileField(upload_to='cv/', blank=True, null=True)

    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profil"

    def __str__(self):
        return self.nom


class CompetenceCategorie(models.Model):
    """Catégorie regroupant les compétences (ex: Développement Web)"""
    nom = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    icone = models.CharField(
        max_length=50, blank=True,
        help_text="Nom d'icône lucide-react, ex: code, smartphone, network, database, chart"
    )
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordre', 'nom']

    def __str__(self):
        return self.nom


class Competence(models.Model):
    categorie = models.ForeignKey(
        CompetenceCategorie, on_delete=models.CASCADE, related_name='competences'
    )
    nom = models.CharField(max_length=100)
    niveau = models.PositiveIntegerField(
        default=3, help_text="Niveau de 1 (débutant) à 5 (expert)"
    )
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordre', 'nom']

    def __str__(self):
        return f"{self.nom} ({self.categorie.nom})"


class Experience(models.Model):
    poste = models.CharField(max_length=150)
    entreprise = models.CharField(max_length=150)
    lieu = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    missions = models.JSONField(
        default=list, blank=True,
        help_text='Liste de missions, ex: ["Mission 1", "Mission 2"]'
    )
    date_debut = models.DateField()
    date_fin = models.DateField(null=True, blank=True)
    en_cours = models.BooleanField(default=False)
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-date_debut', 'ordre']

    def __str__(self):
        return f"{self.poste} @ {self.entreprise}"


class Formation(models.Model):
    diplome = models.CharField(max_length=200)
    etablissement = models.CharField(max_length=200)
    specialisation = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    date_debut = models.DateField(null=True, blank=True)
    date_fin = models.DateField(null=True, blank=True)
    en_cours = models.BooleanField(default=False)
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-date_fin', 'ordre']

    def __str__(self):
        return f"{self.diplome} — {self.etablissement}"


class Projet(models.Model):
    STATUTS = [
        ('termine', 'Terminé'),
        ('en_cours', 'En cours'),
    ]
    lien = models.URLField(blank=True, help_text="Lien vers le site en ligne (si applicable)")
    lien_github = models.URLField(blank=True, help_text="Lien vers le dépôt GitHub du projet") 
    titre = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(
        max_length=300, blank=True,
        help_text="Liste séparée par des virgules, ex: Django, React, PostgreSQL"
    )
    image = models.ImageField(upload_to='projets/', blank=True, null=True)
    lien = models.URLField(blank=True)
    reference_nom = models.CharField(max_length=150, blank=True)
    reference_tel = models.CharField(max_length=30, blank=True)
    statut = models.CharField(max_length=20, choices=STATUTS, default='termine')
    ordre = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordre', '-id']

    def __str__(self):
        return self.titre

    @property
    def technologies_list(self):
        return [t.strip() for t in self.technologies.split(',') if t.strip()]