# views.py
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

def user_profile_sheet(request):
    """Retorna el contenido del sheet de perfil"""
    user = request.user
    return render(request, 'partials/user_profile_sheet.html', {
        'user': user,
        'stats': {
            'pedidos': user.orders.count(),
            'favoritos': user.favorites.count(),
            'resenas': user.reviews.count(),
        }
    })

def producto_actions(request, producto_id):
    """Retorna las acciones disponibles para un producto"""
    producto = get_object_or_404(Producto, id=producto_id)
    user = request.user

    # Determinar acciones disponibles segun contexto
    actions = []
    if producto.stock > 0:
        actions.append({'icon': 'cart', 'label': 'Agregar al carrito', 'url': f'/cart/add/{producto_id}/'})
    if user.is_authenticated:
        is_favorite = producto in user.favorites.all()
        actions.append({
            'icon': 'heart',
            'label': 'Quitar de favoritos' if is_favorite else 'Agregar a favoritos',
            'url': f'/favorites/toggle/{producto_id}/'
        })
    actions.append({'icon': 'share', 'label': 'Compartir', 'url': f'/share/{producto_id}/'})

    return render(request, 'partials/producto_actions.html', {
        'producto': producto,
        'actions': actions,
    })
