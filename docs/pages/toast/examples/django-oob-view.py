# views.py - Toast con Out-of-Band swap
from django.http import HttpResponse
from django.template.loader import render_to_string

def product_create(request):
    form = ProductForm(request.POST or None)

    if form.is_valid():
        product = form.save()

        # Contenido principal (fila de tabla)
        row_html = render_to_string('partials/product_row.html', {
            'product': product
        })

        # Toast OOB
        toast_html = render_to_string('partials/toast_oob.html', {
            'message': f'Producto "{product.name}" creado',
            'type': 'success'
        })

        return HttpResponse(row_html + toast_html)

    return HttpResponse(render_to_string('partials/toast_oob.html', {
        'message': 'Error en el formulario',
        'type': 'danger'
    }), status=400)
