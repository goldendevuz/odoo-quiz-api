from rest_framework import serializers
from .models import Quiz, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'quiz', 'question', 'options', 'correct_answer']

class QuestionListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='question-detail')
    
    class Meta:
        model = Question
        fields = ['id', 'question', 'options', 'correct_answer', 'url']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'questions']

class QuizListSerializer(serializers.ModelSerializer):
    questions_count = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(view_name='quiz-detail')
    
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'questions_count', 'url']
    
    def get_questions_count(self, obj):
        return obj.questions.count()

