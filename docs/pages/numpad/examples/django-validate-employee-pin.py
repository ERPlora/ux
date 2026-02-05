# views.py
from django.http import HttpResponse
from django.views.decorators.http import require_POST
import hashlib

@require_POST
def validate_employee_pin(request):
    pin = request.POST.get('pin', '')

    # Buscar empleado por PIN (hasheado)
    pin_hash = hashlib.sha256(pin.encode()).hexdigest()
    try:
        employee = Employee.objects.get(pin_hash=pin_hash, is_active=True)
        request.session['employee_id'] = employee.id

        return HttpResponse(f'''
            <div class="ux-alert ux-color-success">
                Bienvenido, {employee.name}
            </div>
            <script>
                setTimeout(() => window.location.href = '/pos/', 1000);
            </script>
        ''', headers={'HX-Trigger': 'employee-authenticated'})

    except Employee.DoesNotExist:
        return HttpResponse('''
            <div class="ux-alert ux-color-danger">
                PIN incorrecto
            </div>
        ''')
