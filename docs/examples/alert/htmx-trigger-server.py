# views.py
from django.http import HttpResponse
import json

def crear_producto(request):
    # Crear producto...
    response = HttpResponse("Producto creado")
    response['HX-Trigger'] = json.dumps({
        'showAlert': {
            'type': 'success',
            'title': 'Producto Creado',
            'message': 'El producto se creo exitosamente.'
        }
    })
    return response
