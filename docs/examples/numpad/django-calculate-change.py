# views.py
from django.http import HttpResponse
from decimal import Decimal

def calculate_change(request):
    cash_received = Decimal(request.GET.get('cash', '0'))
    order_total = Decimal(request.GET.get('total', '0'))

    if cash_received >= order_total:
        change = cash_received - order_total
        return HttpResponse(f'''
            <div style="color: var(--ux-success); font-size: 1.5rem; font-weight: 700;">
                Cambio: ${change:.2f}
            </div>
        ''')
    else:
        missing = order_total - cash_received
        return HttpResponse(f'''
            <div style="color: var(--ux-danger); font-size: 1.25rem;">
                Falta: ${missing:.2f}
            </div>
        ''')
