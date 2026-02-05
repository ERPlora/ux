# views.py
from django.shortcuts import render
from .models import Product, Category

def product_list(request):
    category_slug = request.GET.get('category')
    products = Product.objects.filter(is_active=True)

    if category_slug and category_slug != 'all':
        products = products.filter(category__slug=category_slug)

    categories = Category.objects.all()

    # Si es peticion HTMX, devolver solo el grid
    if request.headers.get('HX-Request'):
        return render(request, 'partials/product_grid.html', {
            'products': products
        })

    return render(request, 'products/list.html', {
        'products': products,
        'categories': categories
    })
