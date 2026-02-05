# views.py - Vista SSE
import json
from django.http import StreamingHttpResponse
from django.views.decorators.http import require_GET

@require_GET
def stats_stream(request):
    def event_stream():
        while True:
            stats = get_dashboard_stats()  # Tu funcion de stats
            html = render_to_string('partials/stats_cards.html', {'stats': stats})
            yield f"event: stats-update\ndata: {html}\n\n"
            time.sleep(5)  # Esperar 5 segundos

    response = StreamingHttpResponse(
        event_stream(),
        content_type='text/event-stream'
    )
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'
    return response
