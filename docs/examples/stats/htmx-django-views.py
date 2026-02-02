from django.shortcuts import render
from django.db.models import Sum, Count
from datetime import date, timedelta
from .models import Orden

def dashboard_stats(request):
    hoy = date.today()
    ayer = hoy - timedelta(days=1)
    inicio_mes = hoy.replace(day=1)

    # Ventas de hoy
    ventas_hoy = Orden.objects.filter(
        fecha__date=hoy,
        estado='completada'
    ).aggregate(total=Sum('total'))['total'] or 0

    # Ventas de ayer para comparacion
    ventas_ayer = Orden.objects.filter(
        fecha__date=ayer,
        estado='completada'
    ).aggregate(total=Sum('total'))['total'] or 1

    # Cambio porcentual
    ventas_cambio = round(((ventas_hoy - ventas_ayer) / ventas_ayer) * 100, 1)

    # Ordenes pendientes
    ordenes_pendientes = Orden.objects.filter(
        estado='pendiente'
    ).count()

    # Tiempo promedio de preparacion
    tiempo_promedio = Orden.objects.filter(
        estado='pendiente'
    ).aggregate(avg=Avg('tiempo_estimado'))['avg'] or 0

    # Meta mensual
    meta_mes = 50000
    ventas_mes = Orden.objects.filter(
        fecha__date__gte=inicio_mes,
        estado='completada'
    ).aggregate(total=Sum('total'))['total'] or 0

    porcentaje_meta = min(round((ventas_mes / meta_mes) * 100), 100)
    restante_meta = max(meta_mes - ventas_mes, 0)

    stats = {
        'ventas_hoy': ventas_hoy,
        'ventas_cambio': ventas_cambio,
        'ordenes_pendientes': ordenes_pendientes,
        'tiempo_promedio': round(tiempo_promedio),
        'ventas_mes': ventas_mes,
        'meta_mes': meta_mes,
        'porcentaje_meta': porcentaje_meta,
        'restante_meta': restante_meta,
    }

    # Si es peticion HTMX, solo devuelve el partial
    if request.headers.get('HX-Request'):
        return render(request, 'partials/stats_cards.html', {'stats': stats})

    return render(request, 'dashboard_stats.html', {'stats': stats})
