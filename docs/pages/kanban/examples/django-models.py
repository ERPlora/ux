# models.py
from django.db import models

class KanbanColumn(models.Model):
    title = models.CharField(max_length=100)
    color = models.CharField(max_length=7, default='#6b7280')
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return self.title

class KanbanCard(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Baja'),
        ('medium', 'Media'),
        ('high', 'Alta'),
    ]

    column = models.ForeignKey(KanbanColumn, on_delete=models.CASCADE, related_name='cards')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    position = models.PositiveIntegerField(default=0)
    assignees = models.ManyToManyField('auth.User', blank=True, related_name='assigned_cards')
    due_date = models.DateField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return self.title
