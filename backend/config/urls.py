from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from cv_api import views

router = DefaultRouter()
router.register('competences', views.CompetenceCategorieViewSet, basename='competences')
router.register('experiences', views.ExperienceViewSet, basename='experiences')
router.register('formations', views.FormationViewSet, basename='formations')
router.register('projets', views.ProjetViewSet, basename='projets')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/profil/', views.profil_detail, name='profil'),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)