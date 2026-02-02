# views.py
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_POST, require_http_methods
from .models import Product
from .cart import Cart

def cart_view(request):
    """Renderiza el carrito completo"""
    cart = Cart(request)
    return render(request, 'cart/cart.html', {
        'cart': cart,
        'tax_rate': 21,
    })

def cart_items(request):
    """Renderiza solo los items del carrito (para HTMX)"""
    cart = Cart(request)
    return render(request, 'cart/partials/cart_items.html', {
        'cart': cart,
        'tax_rate': 21,
    })

@require_POST
def add_to_cart(request):
    """Agregar producto al carrito"""
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))

    product = get_object_or_404(Product, id=product_id)
    cart.add(product, quantity)

    # Respuesta con OOB para actualizar contador en navbar
    response = render(request, 'cart/partials/cart_items.html', {'cart': cart})
    response['HX-Trigger'] = 'cartUpdated'

    # Agregar OOB swap para el contador
    oob_html = f'<span id="cart-count" hx-swap-oob="true">{cart.total_items}</span>'
    response.write(oob_html)

    return response

@require_POST
def update_cart_item(request):
    """Actualizar cantidad de item"""
    cart = Cart(request)
    item_id = request.POST.get('item_id')
    action = request.POST.get('action')

    current_qty = cart.cart.get(str(item_id), {}).get('quantity', 0)

    if action == 'increment':
        cart.update_quantity(item_id, current_qty + 1)
    elif action == 'decrement':
        cart.update_quantity(item_id, current_qty - 1)
    elif action == 'set':
        quantity = int(request.POST.get('quantity', 1))
        cart.update_quantity(item_id, quantity)

    return render(request, 'cart/partials/cart_items.html', {'cart': cart})

@require_http_methods(["DELETE"])
def remove_cart_item(request, item_id):
    """Eliminar item del carrito"""
    cart = Cart(request)
    cart.remove(item_id)

    # Retornar vacio para que HTMX elimine el elemento
    return HttpResponse('')

@require_http_methods(["DELETE"])
def clear_cart(request):
    """Vaciar carrito"""
    cart = Cart(request)
    cart.clear()

    return render(request, 'cart/partials/cart_empty.html')

@require_POST
def apply_discount(request):
    """Aplicar codigo de descuento"""
    code = request.POST.get('code', '').upper()

    # Validar codigo (ejemplo simple)
    discounts = {
        'SAVE10': {'percent': 10, 'message': 'Descuento del 10% aplicado'},
        'SAVE20': {'percent': 20, 'message': 'Descuento del 20% aplicado'},
        'FLAT50': {'amount': 50, 'message': '$50 de descuento aplicado'},
    }

    if code in discounts:
        discount = discounts[code]
        request.session['discount_code'] = code
        request.session['discount'] = discount
        return render(request, 'cart/partials/discount_success.html', {
            'discount': discount
        })
    else:
        return render(request, 'cart/partials/discount_error.html', {
            'message': 'Codigo invalido'
        })

@require_POST
def checkout(request):
    """Procesar checkout"""
    cart = Cart(request)

    if not cart.items:
        return HttpResponse('<p class="ux-text-danger">El carrito esta vacio</p>')

    # Aqui iria la logica de pago real
    order_total = cart.get_total(tax_rate=21)

    # Limpiar carrito despues del checkout
    cart.clear()

    return render(request, 'cart/partials/checkout_success.html', {
        'total': order_total
    })
