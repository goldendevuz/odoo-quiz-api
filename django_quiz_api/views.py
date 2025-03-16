from rest_framework import viewsets
from .models import Quiz, Question
from .serializers import QuizSerializer, QuizListSerializer, QuestionSerializer, QuestionListSerializer

class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quiz.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return QuizListSerializer
        return QuizSerializer

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return QuestionListSerializer
        return QuestionSerializer

