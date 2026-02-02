# views.py
def product_tooltip(request, product_id):
    """Tooltip con info de producto y stock en tiempo real"""
    product = get_object_or_404(Product, pk=product_id)
    stock = product.get_stock_info()

    return render(request, 'partials/product_tooltip.html', {
        'product': product,
        'stock': stock,
        'in_stock': stock.quantity > 0
    })
