# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('sheet/profile/', views.user_profile_sheet, name='user_profile_sheet'),
    path('sheet/producto/<int:producto_id>/actions/', views.producto_actions, name='producto_actions'),
    path('producto/<int:producto_id>/delete/', views.producto_delete, name='producto_delete'),
]
