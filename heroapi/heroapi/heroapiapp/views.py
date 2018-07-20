#from django.shortcuts import render
from .models import Shop, Cloth
from .serializers import ShopSerializer
from rest_framework import generics



class ShopList(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer