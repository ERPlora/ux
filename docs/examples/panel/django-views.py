# views.py
from django.views.generic import ListView
from django.http import HttpResponse
from django.template.loader import render_to_string

class UserListView(ListView):
    model = User
    template_name = 'admin/users/list.html'
    context_object_name = 'users'
    paginate_by = 20

    def get_queryset(self):
        qs = super().get_queryset()

        # Filtro por busqueda
        q = self.request.GET.get('q', '')
        if q:
            qs = qs.filter(
                Q(first_name__icontains=q) |
                Q(last_name__icontains=q) |
                Q(email__icontains=q)
            )

        # Filtro por estado
        status = self.request.GET.get('status', '')
        if status == 'active':
            qs = qs.filter(is_active=True)
        elif status == 'inactive':
            qs = qs.filter(is_active=False)

        return qs.order_by('-date_joined')

    def render_to_response(self, context):
        # Si es request HTMX, devolver solo el partial
        if self.request.headers.get('HX-Request'):
            html = render_to_string(
                'admin/users/_table.html',
                context,
                request=self.request
            )
            return HttpResponse(html)
        return super().render_to_response(context)


class DashboardKPIsView(View):
    def get(self, request):
        period = request.GET.get('period', 'week')

        # Calcular fechas segun periodo
        today = timezone.now()
        if period == 'day':
            start_date = today.replace(hour=0, minute=0, second=0)
        elif period == 'week':
            start_date = today - timedelta(days=7)
        else:
            start_date = today - timedelta(days=30)

        # Obtener KPIs
        kpis = {
            'sales': Order.objects.filter(
                created_at__gte=start_date
            ).aggregate(total=Sum('total'))['total'] or 0,
            'orders': Order.objects.filter(
                created_at__gte=start_date
            ).count(),
            'users': User.objects.filter(
                date_joined__gte=start_date
            ).count(),
        }

        html = render_to_string(
            'admin/dashboard/_kpis.html',
            {'kpis': kpis, 'period': period},
            request=request
        )
        return HttpResponse(html)
