# views.py
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET
from django.utils import timezone
from .models import Event
import json

def calendar_view(request):
    """Vista principal del calendario"""
    events = Event.objects.filter(
        date__month=timezone.now().month,
        date__year=timezone.now().year
    )

    events_json = json.dumps([
        {
            'date': e.date.isoformat(),
            'color': e.color,
            'title': e.title
        }
        for e in events
    ])

    return render(request, 'calendar.html', {
        'events_json': events_json
    })


@require_GET
def calendar_events(request):
    """Retorna eventos para un mes especifico (HTMX)"""
    month = int(request.GET.get('month', timezone.now().month))
    year = int(request.GET.get('year', timezone.now().year))

    events = Event.objects.filter(date__month=month, date__year=year)

    # Retorna script que actualiza Alpine.js
    events_data = [
        {'date': e.date.isoformat(), 'color': e.color, 'title': e.title}
        for e in events
    ]

    return HttpResponse(f'''
        <script>
            document.querySelector('[x-data]').__x.$data.events = {json.dumps(events_data)};
        </script>
    ''')


@require_GET
def day_events(request):
    """Retorna eventos de un dia especifico (HTMX)"""
    from datetime import datetime
    date_str = request.GET.get('date')
    date = datetime.strptime(date_str, '%Y-%m-%d').date()

    events = Event.objects.filter(date=date).order_by('time')

    if not events:
        return HttpResponse('<p class="ux-text-tertiary">No hay eventos para este dia</p>')

    html = '<ul class="ux-list ux-list--inset">'
    for event in events:
        html += f'''
            <li class="ux-list__item">
                <span class="ux-calendar__day-event ux-calendar__day-event--{event.color}"
                      style="width: 10px; height: 10px; margin-right: 8px;"></span>
                <div class="ux-list__content">
                    <div class="ux-list__title">{event.title}</div>
                    <div class="ux-list__note">{event.time.strftime('%H:%M') if event.time else 'Todo el dia'}</div>
                </div>
            </li>
        '''
    html += '</ul>'

    return HttpResponse(html)
