from django.db import models

class Quiz(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.TextField()
    options = models.JSONField()  # Stores the array of options
    correct_answer = models.CharField(max_length=255)
    
    def __str__(self):
        return self.question[:50]

