from django.contrib import admin
from django.urls import path
from converter import views

urlpatterns = [
    path('admin/', admin.site.urls),  # Interface d'administration
    path('convert/', views.currency_conversion, name='convert'),
    path('history/', views.conversion_history, name='history'),
    path('login/', views.user_login, name='login'),
   
]
