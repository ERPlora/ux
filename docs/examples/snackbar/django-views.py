# views.py
from django.http import HttpResponse
import json

def create_item(request):
    # Crear item...
    item = Item.objects.create(name=request.POST['name'])

    # Respuesta con snackbar via HX-Trigger
    response = HttpResponse(render_to_string('partials/item_row.html', {'item': item}))
    response['HX-Trigger'] = json.dumps({
        'showSnackbar': {
            'message': f'Item "{item.name}" creado exitosamente',
            'type': 'success',
            'showProgress': True
        }
    })
    return response

def delete_item(request, item_id):
    item = Item.objects.get(id=item_id)
    item_name = item.name
    item.delete()

    response = HttpResponse('')
    response['HX-Trigger'] = json.dumps({
        'showSnackbar': {
            'message': f'"{item_name}" eliminado',
            'type': 'danger',
            'actionLabel': 'Deshacer',
            'duration': 5000
        }
    })
    return response

def update_item(request, item_id):
    item = Item.objects.get(id=item_id)
    item.name = request.POST['name']
    item.save()

    response = HttpResponse(render_to_string('partials/item_row.html', {'item': item}))
    response['HX-Trigger'] = json.dumps({
        'showSnackbar': {
            'message': 'Cambios guardados',
            'type': 'success'
        }
    })
    return response
