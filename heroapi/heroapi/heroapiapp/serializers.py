from rest_framework import serializers
from .models import CLOTH_TYPES, Shop, Cloth


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name', 'lat', 'long')