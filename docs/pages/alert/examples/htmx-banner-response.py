# views.py - Django view
from django.http import HttpResponse

def guardar_item(request):
    # Procesar el formulario...
    if success:
        return HttpResponse('''
            <div class="ux-alert-banner ux-alert-banner--success"
                 x-data="uxAlertBanner({ autoDismiss: 5000 })"
                 x-show="visible">
                <div class="ux-alert-banner__content">
                    <h4 class="ux-alert-banner__title">Guardado</h4>
                    <p class="ux-alert-banner__message">El item se guardo correctamente.</p>
                </div>
                <button class="ux-alert-banner__close" @click="dismiss()">X</button>
            </div>
        ''')
    else:
        return HttpResponse('''
            <div class="ux-alert-banner ux-alert-banner--danger"
                 x-data="uxAlertBanner()"
                 x-show="visible">
                <div class="ux-alert-banner__content">
                    <h4 class="ux-alert-banner__title">Error</h4>
                    <p class="ux-alert-banner__message">No se pudo guardar el item.</p>
                </div>
                <button class="ux-alert-banner__close" @click="dismiss()">X</button>
            </div>
        ''', status=400)
