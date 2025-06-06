from django.db import models
from django.utils import timezone

class ConversionRate(models.Model):
    base_currency = models.CharField(max_length=3)
    target_currency = models.CharField(max_length=3)
    rate = models.DecimalField(max_digits=12, decimal_places=6)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('base_currency', 'target_currency')

class ConversionHistory(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    from_currency = models.CharField(max_length=3)
    to_currency = models.CharField(max_length=3)
    converted_amount = models.DecimalField(max_digits=12, decimal_places=2)
    rate = models.DecimalField(max_digits=12, decimal_places=6)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.amount} {self.from_currency} → {self.converted_amount} {self.to_currency}"
