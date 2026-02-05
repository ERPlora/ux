# models.py
from django.db import models

class Event(models.Model):
    COLOR_CHOICES = [
        ('primary', 'Primary'),
        ('success', 'Success'),
        ('warning', 'Warning'),
        ('danger', 'Danger'),
    ]

    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='primary')
    description = models.TextField(blank=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    class Meta:
        ordering = ['date', 'time']

    def __str__(self):
        return f"{self.title} - {self.date}"
