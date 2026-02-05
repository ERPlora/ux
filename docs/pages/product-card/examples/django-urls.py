# urls.py
from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.product_list, name='list'),
    path('search/', views.product_search, name='search'),
]

# cart/urls.py
app_name = 'cart'

urlpatterns = [
    path('add/', views.add_to_cart, name='add'),
    path('remove/', views.remove_from_cart, name='remove'),
    path('checkout/', views.checkout, name='checkout'),
]
