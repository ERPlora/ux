# middleware.py
from django.contrib import messages
import json

class HTMXSnackbarMiddleware:
    """Convierte mensajes de Django en snackbars HTMX."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Solo para requests HTMX
        if not request.headers.get('HX-Request'):
            return response

        # Obtener mensajes pendientes
        storage = messages.get_messages(request)
        snackbar_messages = []

        type_map = {
            messages.SUCCESS: 'success',
            messages.WARNING: 'warning',
            messages.ERROR: 'danger',
            messages.INFO: 'info',
        }

        for msg in storage:
            snackbar_messages.append({
                'message': str(msg),
                'type': type_map.get(msg.level, 'info')
            })

        if snackbar_messages:
            # Agregar al HX-Trigger existente o crear nuevo
            existing = response.get('HX-Trigger', '{}')
            triggers = json.loads(existing) if existing != '{}' else {}

            # Usar el primer mensaje (o encolar multiples)
            triggers['showSnackbar'] = snackbar_messages[0]
            response['HX-Trigger'] = json.dumps(triggers)

        return response
