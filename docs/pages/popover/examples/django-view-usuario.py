# views.py
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model

User = get_user_model()

def user_popover(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'partials/user_popover_content.html', {'user': user})
