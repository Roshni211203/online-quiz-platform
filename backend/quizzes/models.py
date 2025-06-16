from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# -----------------------------
# CATEGORY
# -----------------------------
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="category_images/", null=True, blank=True) 
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

# -----------------------------
# QUIZ
# -----------------------------
class Quiz(models.Model):
    LEVEL_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    title = models.CharField(max_length=200, unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="quizzes")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="quizzes")
    duration_minutes = models.IntegerField(default=30)
    is_active = models.BooleanField(default=True)
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES, default='easy')  # <-- Added
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

# -----------------------------
# QUESTION
# -----------------------------
class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    text = models.TextField()
    correct_answer = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Q: {self.text[:50]}"

# -----------------------------
# CHOICE
# -----------------------------
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return self.text

# -----------------------------
# USER ATTEMPT
# -----------------------------
class UserAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="attempts")
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="attempts")
    score = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=0)
    completed_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("user", "quiz")
        ordering = ["-completed_at"]

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"

# -----------------------------
# USER ANSWER
# -----------------------------
class UserAnswer(models.Model):
    attempt = models.ForeignKey(UserAttempt, on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="user_answers")
    selected_choice = models.ForeignKey(Choice, on_delete=models.SET_NULL, null=True, blank=True)
    is_correct = models.BooleanField(default=False)
    answered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["answered_at"]

    def __str__(self):
        return f"{self.attempt.user.username} - {self.question.text[:50]}"