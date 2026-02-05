# views.py
def confirm_action(request):
    return HttpResponse('''
        <div x-data="{ open: true }" x-init="$watch('open', v => !v && $el.remove())">
            <div class="ux-alert-backdrop" :class="open && 'ux-alert-backdrop--open'">
                <div class="ux-alert">
                    <div class="ux-alert__content">
                        <h2 class="ux-alert__title">Confirmacion Requerida</h2>
                        <p class="ux-alert__message">El servidor solicita tu confirmacion.</p>
                    </div>
                    <div class="ux-alert__buttons">
                        <button class="ux-alert__button" @click="open = false">Cancelar</button>
                        <button class="ux-alert__button ux-alert__button--primary"
                                hx-post="/api/execute-action/"
                                hx-swap="none"
                                @click="open = false">
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ''')
