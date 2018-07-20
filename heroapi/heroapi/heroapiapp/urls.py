from django.urls import path, re_path
from django.http import HttpResponse
from . import views

urlpatterns = [
    path('', lambda request: HttpResponse("Lmao you hacker\n\n.", content_type="text/plain")),
    re_path(r'^shoplist/$', views.ShopList.as_view()),
    re_path(r'^clothlist/$', views.ClothList.as_view()),
    re_path(r'^soundlist/$', views.SoundList.as_view()),
]