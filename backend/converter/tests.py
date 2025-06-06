from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import ConversionRate

class CurrencyConversionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        ConversionRate.objects.create(
            base_currency='EUR',
            target_currency='USD',
            rate=1.2
        )

    def test_authenticated_conversion(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/convert/', {
            'amount': 10,
            'from_currency': 'EUR',
            'to_currency': 'USD'
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['converted_amount'], 12)

    def test_unauthenticated_access(self):
        response = self.client.get('/api/history/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)
