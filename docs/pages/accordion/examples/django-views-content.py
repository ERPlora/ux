# views.py - Variantes de respuesta para el contenido del panel

from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.template.loader import render_to_string

def accordion_content_simple(request, faq_id):
    """Retorna texto plano"""
    faq = get_object_or_404(FAQ, id=faq_id, is_active=True)
    return HttpResponse(faq.answer)

def accordion_content_html(request, faq_id):
    """Retorna HTML formateado"""
    faq = get_object_or_404(FAQ, id=faq_id, is_active=True)
    html = f'''
    <div class="faq-answer">
        <div class="faq-answer__text">{faq.answer}</div>
        <div class="faq-answer__meta" style="margin-top: 1rem; font-size: 0.875rem; color: var(--ux-text-tertiary);">
            Actualizado: {faq.updated_at.strftime('%d/%m/%Y')}
        </div>
        <div class="faq-answer__actions" style="margin-top: 1rem;">
            <button class="ux-button ux-button--sm ux-button--outline"
                    hx-post="/faq/{faq.id}/helpful/"
                    hx-swap="outerHTML">
                Fue util
            </button>
        </div>
    </div>
    '''
    return HttpResponse(html)

def accordion_content_template(request, faq_id):
    """Retorna usando template"""
    faq = get_object_or_404(FAQ, id=faq_id, is_active=True)

    # Incrementar contador de vistas
    faq.views_count = faq.views_count + 1
    faq.save(update_fields=['views_count'])

    html = render_to_string('components/faq_answer.html', {
        'faq': faq,
        'related_faqs': FAQ.objects.filter(
            category=faq.category,
            is_active=True
        ).exclude(id=faq.id)[:3]
    }, request=request)

    return HttpResponse(html)
