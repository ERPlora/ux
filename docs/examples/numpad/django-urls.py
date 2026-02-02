# urls.py
from django.urls import path
from . import views

app_name = 'pos'

urlpatterns = [
    path('payment/', views.process_payment, name='process_payment'),
    path('calculate-change/', views.calculate_change, name='calculate_change'),
    path('validate-pin/', views.validate_employee_pin, name='validate_pin'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
]
