# views.py
from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from .models import FAQ, FAQCategory

def faq_list(request):
    """Vista principal con todas las FAQs"""
    category_slug = request.GET.get('category', 'all')

    if category_slug == 'all':
        faqs = FAQ.objects.filter(is_active=True)
    else:
        faqs = FAQ.objects.filter(
            is_active=True,
            category__slug=category_slug
        )

    categories = FAQCategory.objects.all()

    # Si es peticion HTMX, devolver solo el accordion
    if request.headers.get('HX-Request'):
        html = render_to_string('components/faq_accordion.html', {
            'faqs': faqs
        }, request=request)
        return HttpResponse(html)

    return render(request, 'faq/list.html', {
        'faqs': faqs,
        'categories': categories,
        'current_category': category_slug
    })

def faq_content(request, faq_id):
    """Vista que retorna solo el contenido del panel"""
    faq = FAQ.objects.get(id=faq_id, is_active=True)
    return HttpResponse(faq.answer)

def faq_search(request):
    """Busqueda de FAQs"""
    query = request.GET.get('q', '')
    faqs = FAQ.objects.filter(
        is_active=True,
        question__icontains=query
    ) | FAQ.objects.filter(
        is_active=True,
        answer__icontains=query
    )

    html = render_to_string('components/faq_accordion.html', {
        'faqs': faqs.distinct()
    }, request=request)
    return HttpResponse(html)
