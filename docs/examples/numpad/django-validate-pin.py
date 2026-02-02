# Django view para validar PIN
@require_POST
def validate_pin(request):
    pin = request.POST.get('pin', '')

    try:
        employee = Employee.objects.get(pin_hash=hash_pin(pin))
        request.session['employee_id'] = employee.id

        return HttpResponse(f'''
            <div class="ux-alert ux-color-success">
                Bienvenido, {employee.name}
            </div>
        ''', headers={'HX-Trigger': 'pin-valid'})

    except Employee.DoesNotExist:
        return HttpResponse('''
            <div class="ux-alert ux-color-danger">
                PIN incorrecto
            </div>
        ''', headers={'HX-Trigger': 'pin-invalid'})
