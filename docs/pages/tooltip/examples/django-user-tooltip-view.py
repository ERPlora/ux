# views.py
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import User

def user_tooltip(request, user_id):
    """Devuelve HTML para tooltip de usuario"""
    user = get_object_or_404(User, pk=user_id)
    return render(request, 'partials/user_tooltip.html', {'user': user})
