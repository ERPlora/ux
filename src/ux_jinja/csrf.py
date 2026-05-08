"""CSRF helper for Django + Jinja2 (used via django-jinja globals)."""
from django.middleware.csrf import get_token


def csrf_token_value(request):
    """Return the CSRF token string for the given Django request."""
    return get_token(request)
