# views.py
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from decimal import Decimal

@require_POST
def process_payment(request):
    amount = Decimal(request.POST.get('amount', '0'))
    order_id = request.POST.get('order_id')

    if amount <= 0:
        return HttpResponse('''
            <div class="ux-alert ux-color-danger">
                Ingrese un monto valido
            </div>
        ''')

    # Procesar pago
    order = Order.objects.get(id=order_id)
    payment = Payment.objects.create(
        order=order,
        amount=amount,
        method='cash'
    )

    return HttpResponse(f'''
        <div class="ux-alert ux-color-success">
            Pago de ${amount:.2f} procesado correctamente
        </div>
    ''')
