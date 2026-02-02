# views.py
from django.http import JsonResponse
from django.shortcuts import render
from datetime import datetime, timedelta

def product_stats(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    today = datetime.now().date()

    stats = {
        'today': product.sales.filter(created_at__date=today).count(),
        'week': product.sales.filter(created_at__date__gte=today - timedelta(days=7)).count(),
        'month': product.sales.filter(created_at__date__gte=today - timedelta(days=30)).count(),
        'growth': calculate_growth(product),
    }
    return render(request, 'partials/product_stats.html', {'stats': stats})
