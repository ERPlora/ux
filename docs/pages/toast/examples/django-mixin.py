# mixins.py
from django.template.loader import render_to_string

class ToastMixin:
    """Mixin para agregar toasts a respuestas HTMX"""

    def toast_response(self, message, toast_type='success', extra_html=''):
        """Genera respuesta con toast"""
        toast_html = render_to_string('partials/toast_oob.html', {
            'message': message,
            'type': toast_type
        })
        return HttpResponse(extra_html + toast_html)

    def success_toast(self, message, extra_html=''):
        return self.toast_response(message, 'success', extra_html)

    def error_toast(self, message, extra_html=''):
        return self.toast_response(message, 'danger', extra_html)

# Uso en vista
class ProductCreateView(ToastMixin, View):
    def post(self, request):
        form = ProductForm(request.POST)
        if form.is_valid():
            product = form.save()
            row = render_to_string('partials/product_row.html', {'product': product})
            return self.success_toast(f'Producto creado', row)
        return self.error_toast('Error en el formulario')
