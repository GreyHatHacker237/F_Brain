from django.db import models
from django.contrib.auth.models import User

class Conversion(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    from_currency = models.CharField(max_length=3)
    to_currency = models.CharField(max_length=3)
    converted_amount = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)