# views.py
from django.http import HttpResponse
from django.template.loader import render_to_string

def contact_create(request):
    form = ContactForm(request.POST or None)

    if form.is_valid():
        form.save()
        # Devolver toast de exito
        return HttpResponse(render_to_string('partials/toast.html', {
            'message': 'Contacto guardado correctamente',
            'type': 'success'
        }))

    # Devolver toast de error
    return HttpResponse(render_to_string('partials/toast.html', {
        'message': 'Error al guardar el contacto',
        'type': 'danger'
    }), status=400)
