from rest_framework import serializers
from .models import CLOTH_TYPES, Shop, Cloth, Sound


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name', 'lat', 'long')


class ClothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cloth
        fields = ('id', 'shop', 'title', 'image', 'xxl', 'price', 'cloth_type')


class SoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sound
        fields = ('id', 'title', 'artist', 'sound')