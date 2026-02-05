# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('kanban/', views.kanban_board, name='kanban_board'),
    path('kanban/column/<int:column_id>/', views.kanban_column, name='kanban_column'),
    path('kanban/move/', views.move_card, name='kanban_move_card'),
    path('kanban/column/<int:column_id>/add/', views.add_card, name='kanban_add_card'),
    path('kanban/card/<int:card_id>/delete/', views.delete_card, name='kanban_delete_card'),
]
