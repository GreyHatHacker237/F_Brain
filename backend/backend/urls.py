from django.urls import path
from .views import ConvertCurrency

urlpatterns = [
    path('api/convert/', ConvertCurrency.as_view(), name='convert'),
]
