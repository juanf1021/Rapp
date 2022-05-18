from django.shortcuts import render

# Create your views here.


def easy(request):
    return render(request,"templates\play\easy.html")

def test(request):
    return render(request,"templates\play\itest.html")