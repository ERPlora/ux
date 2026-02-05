# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('cart/', views.cart_view, name='cart'),
    path('cart/items/', views.cart_items, name='cart_items'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/', views.update_cart_item, name='update_cart_item'),
    path('cart/remove/<int:item_id>/', views.remove_cart_item, name='remove_cart_item'),
    path('cart/clear/', views.clear_cart, name='clear_cart'),
    path('cart/apply-discount/', views.apply_discount, name='apply_discount'),
    path('cart/checkout/', views.checkout, name='checkout'),
]
