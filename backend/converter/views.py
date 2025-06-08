from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from .models import Conversion  # Si vous avez ce modèle

def home(request):
    return HttpResponse("Bienvenue sur l'application")

def currency_conversion(request):
    """Gère la conversion de devises"""
    if request.method == 'POST':
        # Exemple basique (à adapter)
        data = {
            'amount': float(request.POST.get('amount', 0)),
            'from_currency': request.POST.get('from_currency'),
            'to_currency': request.POST.get('to_currency')
        }
        # Ici, ajoutez votre logique de conversion
        return JsonResponse({'converted_amount': data['amount'] * 1.2})  # Exemple
    
    return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

def conversion_history(request):
    """Retourne l'historique des conversions"""
    if request.user.is_authenticated:
        history = Conversion.objects.filter(user=request.user).values()  # Exemple
        return JsonResponse({'history': list(history)})
    return JsonResponse({'error': 'Non authentifié'}, status=401)

def user_login(request):
    """Gère l'authentification"""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Identifiants invalides'}, status=401)