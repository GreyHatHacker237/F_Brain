from rest_framework import serializers
from .models import ConversionRate, ConversionHistory

class ConversionRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConversionRate
        fields = '__all__'

class ConversionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ConversionHistory
        fields = '__all__'
        read_only_fields = ('date', 'user')

class ConvertSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    from_currency = serializers.CharField(max_length=3)
    to_currency = serializers.CharField(max_length=3)
