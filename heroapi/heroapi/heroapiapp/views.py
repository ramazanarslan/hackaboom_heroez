#from django.shortcuts import render
from .models import Shop, Cloth, Sound
from .serializers import ShopSerializer, ClothSerializer, SoundSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist


class ClothList(generics.ListCreateAPIView):
    queryset = Cloth.objects.all()
    serializer_class = ClothSerializer


class ShopList(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


class SoundList(generics.ListAPIView):
    serializer_class = SoundSerializer

    def get_queryset(self):
        happy = self.request.query_params.get('happy')
        sounds = Sound.objects.filter(happy=happy)
        return sounds