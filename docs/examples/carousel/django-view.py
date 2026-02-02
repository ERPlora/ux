# views.py
from django.shortcuts import render

def carousel_slides(request):
    categoria = request.GET.get('categoria', 'destacados')

    if categoria == 'destacados':
        productos = Producto.objects.filter(destacado=True)[:8]
    elif categoria == 'ofertas':
        productos = Producto.objects.filter(en_oferta=True)[:8]
    else:
        productos = Producto.objects.order_by('-created_at')[:8]

    return render(request, 'partials/carousel_slides.html', {
        'productos': productos
    })
