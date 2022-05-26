from django.shortcuts import render
from home.models import Categoria, Beats
# Create your views here.

def easy(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\play\easy.html", {"beats":beats, "first": first_beat})

def test(request):
    return render(request,"templates\play\itest.html")