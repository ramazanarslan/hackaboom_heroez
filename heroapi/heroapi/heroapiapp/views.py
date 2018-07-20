#from django.shortcuts import render
from .models import Shop, Cloth, Sound
from .serializers import ShopSerializer, ClothSerializer, SoundSerializer
from rest_framework import generics

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


class ShopList(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


class ClothList(generics.ListCreateAPIView):
    queryset = Cloth.objects.all()
    serializer_class = ClothSerializer


class SoundList(generics.ListAPIView):
    queryset = Sound.objects.all()
    serializer_class = SoundSerializer