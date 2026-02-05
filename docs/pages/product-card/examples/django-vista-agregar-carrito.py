# views.py
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from django.template.loader import render_to_string
from .models import Product, Cart, CartItem

@require_POST
def add_to_cart(request):
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))

    product = Product.objects.get(id=product_id)
    cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={'quantity': quantity}
    )
    if not created:
        cart_item.quantity += quantity
        cart_item.save()

    # Devolver HTML parcial para HTMX
    html = render_to_string('partials/cart_summary.html', {
        'cart': cart,
        'items_count': cart.items.count(),
        'total': cart.get_total()
    })
    return HttpResponse(html)
