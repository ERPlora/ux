# views.py
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from .models import KanbanColumn, KanbanCard

def kanban_board(request):
    """Renderiza el tablero kanban completo."""
    columns = KanbanColumn.objects.prefetch_related('cards__assignees').all()
    return render(request, 'kanban/board.html', {'columns': columns})

def kanban_column(request, column_id):
    """Renderiza una columna individual (para actualizaciones parciales)."""
    column = get_object_or_404(KanbanColumn.objects.prefetch_related('cards'), pk=column_id)
    return render(request, 'kanban/partials/column.html', {'column': column})

@require_POST
def move_card(request):
    """Mueve una tarjeta a otra columna via HTMX."""
    card_id = request.POST.get('card_id')
    target_column_id = request.POST.get('column_id')
    position = request.POST.get('position', 0)

    card = get_object_or_404(KanbanCard, pk=card_id)
    old_column = card.column
    new_column = get_object_or_404(KanbanColumn, pk=target_column_id)

    # Actualizar posicion
    card.column = new_column
    card.position = int(position)
    card.save()

    # Reordenar tarjetas en ambas columnas
    _reorder_cards(old_column)
    if old_column != new_column:
        _reorder_cards(new_column)

    # Retornar ambas columnas actualizadas
    response = render(request, 'kanban/partials/column.html', {'column': new_column})

    # Trigger para actualizar la columna origen
    if old_column != new_column:
        response['HX-Trigger'] = f'{{"refreshColumn": "{old_column.id}"}}'

    return response

@require_POST
def add_card(request, column_id):
    """Agrega una nueva tarjeta a una columna."""
    column = get_object_or_404(KanbanColumn, pk=column_id)
    title = request.POST.get('title', 'Nueva tarea')

    card = KanbanCard.objects.create(
        column=column,
        title=title,
        position=column.cards.count()
    )

    return render(request, 'kanban/partials/card.html', {'card': card})

@require_POST
def delete_card(request, card_id):
    """Elimina una tarjeta."""
    card = get_object_or_404(KanbanCard, pk=card_id)
    column = card.column
    card.delete()
    _reorder_cards(column)
    return HttpResponse('')

def _reorder_cards(column):
    """Reordena las tarjetas de una columna."""
    for i, card in enumerate(column.cards.all()):
        if card.position != i:
            card.position = i
            card.save(update_fields=['position'])
