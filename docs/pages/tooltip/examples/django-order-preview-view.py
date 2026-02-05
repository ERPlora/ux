# views.py
def order_preview(request, order_id):
    """Preview de pedido para tooltip"""
    order = get_object_or_404(Order, pk=order_id)

    # Solo los primeros 3 items para el preview
    items = order.items.all()[:3]
    remaining = order.items.count() - 3

    return render(request, 'partials/order_preview.html', {
        'order': order,
        'items': items,
        'remaining': remaining if remaining > 0 else 0
    })
