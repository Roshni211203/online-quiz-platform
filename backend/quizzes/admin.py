from django.contrib import admin
from .models import Category, Quiz, Question, Choice, UserAttempt, UserAnswer

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3  # Default 3 choice fields add kar sakte ho

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']
    ordering = ['-created_at']
    list_per_page = 25

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created_by', 'is_active', 'created_at']
    list_filter = ['is_active', 'category']
    search_fields = ['title', 'category__name']
    ordering = ['-created_at']
    list_editable = ['is_active']
    autocomplete_fields = ['category', 'created_by']
    list_per_page = 20

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['text', 'quiz', 'created_at']
    search_fields = ['text', 'quiz__title']
    ordering = ['created_at']
    autocomplete_fields = ['quiz']
    list_per_page = 20
    inlines = [ChoiceInline]  # **IMPORTANT** Yeh line add karne se Choices admin me dikhenge

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['text', 'question', 'created_at']
    search_fields = ['text', 'question__text']
    ordering = ['created_at']
    autocomplete_fields = ['question']
    list_per_page = 25

@admin.register(UserAttempt)
class UserAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'quiz', 'score', 'completed_at']
    list_filter = ['completed_at']
    search_fields = ['user__username', 'quiz__title']
    ordering = ['-completed_at']
    autocomplete_fields = ['user', 'quiz']
    list_per_page = 20

@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'is_correct', 'answered_at']
    list_filter = ['is_correct', 'answered_at']
    search_fields = ['attempt__user__username', 'question__text']
    ordering = ['answered_at']
    autocomplete_fields = ['attempt', 'question']
    list_per_page = 25