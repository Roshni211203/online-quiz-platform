from rest_framework import serializers
from .models import Category, Quiz, Question, Choice, UserAttempt, UserAnswer
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name','image']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text',]

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'choices']

class QuizSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)
    level = serializers.CharField()  # <-- Added

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'category', 'duration_minutes', 'level', 'questions']

class UserAnswerSerializer(serializers.ModelSerializer):
    question = serializers.CharField(source='question.text', read_only=True)
    user_answer = serializers.SerializerMethodField()
    correct_answer = serializers.CharField(source='question.correct_answer', read_only=True)
    is_correct = serializers.BooleanField(read_only=True)

    class Meta:
        model = UserAnswer
        fields = [
            'id',
            'question',
            'user_answer',
            'correct_answer',
            'is_correct',
        ]

    def get_user_answer(self, obj):
        # If skipped, return None or ""
        if obj.selected_choice:
            return obj.selected_choice.text
        return ""

class UserAttemptSerializer(serializers.ModelSerializer):
    answers = UserAnswerSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserAttempt
        fields = [
            'id',
            'user',
            'username',
            'quiz',
            'score',
            'total_questions',
            'completed_at',
            'answers'
        ]