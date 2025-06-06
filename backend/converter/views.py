from django.http import JsonResponse
from django.views import View
from django.core.exceptions import ValidationError
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import ConversionRate, ConversionHistory
import json
import requests
from datetime import datetime, timedelta

class ConvertCurrency(View):
    @method_decorator(login_required)
    def post(self, request):
        try:
            data = json.loads(request.body)
            from_currency = data.get('from_currency')
            to_currency = data.get('to_currency')
            amount = float(data.get('amount', 0))
            
            # Validation
            if amount <= 0:
                raise ValidationError("Le montant doit être positif")
            
            # Récupération du taux
            rate = self.get_exchange_rate(from_currency, to_currency)
            converted_amount = amount * rate
            
            # Sauvegarde historique
            ConversionHistory.objects.create(
                user=request.user,
                amount=amount,
                from_currency=from_currency,
                to_currency=to_currency,
                converted_amount=converted_amount,
                rate=rate
            )
            
            return JsonResponse({
                'status': 'success',
                'converted_amount': round(converted_amount, 2),
                'rate': rate
            })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)

    def get_exchange_rate(self, from_currency, to_currency):
        """Logique pour obtenir le taux de change"""
        # Implémentez votre logique ici
        default_rates = {
            'EUR-XOF': 655.96,
            'XOF-EUR': 0.00152,
            'EUR-GBP': 0.86,
            'GBP-EUR': 1.16,
            'EUR-CNY': 7.83,
            'CNY-EUR': 0.13
        }
        return default_rates.get(f"{from_currency}-{to_currency}", 1.0)
