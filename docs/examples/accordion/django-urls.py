# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('faq/', views.faq_list, name='faq_list'),
    path('faq/content/<int:faq_id>/', views.faq_content, name='faq_content'),
    path('faq/search/', views.faq_search, name='faq_search'),
]
