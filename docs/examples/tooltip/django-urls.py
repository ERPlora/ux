# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Tooltips endpoints
    path('api/users/<int:user_id>/tooltip/',
         views.user_tooltip,
         name='user_tooltip'),

    path('api/products/<int:product_id>/tooltip/',
         views.product_tooltip,
         name='product_tooltip'),

    path('api/orders/<int:order_id>/preview/',
         views.order_preview,
         name='order_preview'),

    # Ayuda contextual
    path('api/help/<str:field_name>/',
         views.field_help,
         name='field_help'),
]
