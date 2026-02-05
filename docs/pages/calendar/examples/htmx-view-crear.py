# views.py
from django.views.decorators.http import require_POST

@require_POST
def create_event(request):
    """Crea un evento y retorna el calendario actualizado"""
    Event.objects.create(
        title=request.POST['title'],
        date=request.POST['date'],
        time=request.POST.get('time') or None,
        color=request.POST.get('color', 'primary'),
        description=request.POST.get('description', ''),
        user=request.user
    )

    # Retorna el calendario completo actualizado
    return calendar_view(request)
