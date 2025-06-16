from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

from .models import Category, Quiz, Question, Choice, UserAttempt, UserAnswer
from .serializers import (
    CategorySerializer,
    QuizSerializer,
    QuestionSerializer,
    ChoiceSerializer,
    UserAttemptSerializer,
    UserAnswerSerializer,
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        category_id = self.request.query_params.get('category')
        level = self.request.query_params.get('level')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        if level:
            queryset = queryset.filter(level=level)
        return queryset

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = [permissions.AllowAny]

class UserAttemptViewSet(viewsets.ModelViewSet):
    queryset = UserAttempt.objects.all()
    serializer_class = UserAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        quiz_id = request.data.get("quiz")
        total_questions = request.data.get("total_questions")
        answers_data = request.data.get("answers", [])

        if not quiz_id or not total_questions or not answers_data:
            return Response({"error": "quiz, total_questions, and answers are required."}, status=400)

        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response({"error": "Quiz not found."}, status=404)

        # Prevent duplicate attempts
        if UserAttempt.objects.filter(user=request.user, quiz=quiz).exists():
            return Response({"error": "You have already attempted this quiz."}, status=400)

        score = 0
        for ans in answers_data:
            try:
                question = Question.objects.get(id=ans["question"], quiz=quiz)
                choice = None
                if ans["selected_choice"]:
                    choice = Choice.objects.get(id=ans["selected_choice"], question=question)
                if choice and question.correct_answer.strip().lower() == choice.text.strip().lower():
                    score += 1
            except Exception:
                continue

        attempt = UserAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=score,
            total_questions=total_questions,
        )

        for ans in answers_data:
            try:
                question = Question.objects.get(id=ans["question"], quiz=quiz)
                choice = None
                if ans["selected_choice"]:
                    choice = Choice.objects.get(id=ans["selected_choice"], question=question)
                is_correct = (
                    choice is not None and question.correct_answer.strip().lower() == choice.text.strip().lower()
                )
                UserAnswer.objects.create(
                    attempt=attempt,
                    question=question,
                    selected_choice=choice,
                    is_correct=is_correct,
                )
            except Exception:
                continue

        serializer = self.get_serializer(attempt)
        return Response(serializer.data, status=201)

class UserAnswerViewSet(viewsets.ModelViewSet):
    queryset = UserAnswer.objects.all()
    serializer_class = UserAnswerSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Both username and password are required.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully.'})

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user_id": user.id,
            "username": user.username
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard_view(request):
    # Example: Show top 10 attempts by score
    attempts = UserAttempt.objects.select_related('user', 'quiz').order_by('-score')[:100]
    data = [
        {
            "username": attempt.user.username,
            "quiz": attempt.quiz.title,
            "score": attempt.score,
            "total_questions": attempt.total_questions,
        }
        for attempt in attempts
    ]
    return Response({"leaderboard": data})

@api_view(['GET'])
@permission_classes([AllowAny])
def user_analytics_view(request):
    total_attempts = UserAttempt.objects.count()
    unique_users = UserAttempt.objects.values('user').distinct().count()
    quizzes_attempted = UserAttempt.objects.values('quiz').distinct().count()
    return Response({
        "analytics": {
            "total_attempts": total_attempts,
            "unique_users": unique_users,
            "quizzes_attempted": quizzes_attempted,
        }
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def generate_questions_view(request):
    return Response({"message": "Questions generated successfully"})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard_view(request):
    user = request.user
    attempts = user.attempts.select_related('quiz').order_by('-completed_at')
    total_attempts = attempts.count()
    total_score = sum(a.score for a in attempts)
    data = []
    for a in attempts:
        data.append({
            "quiz": a.quiz.title,
            "score": a.score,
            "total_questions": a.total_questions,
            "completed_at": a.completed_at,
        })
    return Response({
        "total_attempts": total_attempts,
        "total_score": total_score,
        "attempts": data,
    })    