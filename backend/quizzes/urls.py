from django.urls import path, include
from rest_framework.routers import DefaultRouter
from quizzes import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'quizzes', views.QuizViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'choices', views.ChoiceViewSet)
router.register(r'attempts', views.UserAttemptViewSet)
router.register(r'answers', views.UserAnswerViewSet)

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('generate-questions/', views.generate_questions_view, name='generate_questions'),
    path('leaderboard/', views.leaderboard_view, name='leaderboard'),
    path('analytics/', views.user_analytics_view, name='analytics'),
    path('', include(router.urls)),  # Yahan blank string rakhein
     path('dashboard/', views.user_dashboard_view, name='user_dashboard'),
]

# Media files serve (for development)
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)