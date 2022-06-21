from django.shortcuts import render
import requests
from play.models import Words
from home.models import Categoria, Beats
from django.http import HttpResponse
import random
from django.http import JsonResponse
import json
# Create your views here.

def easy(request):
    beats = Beats.objects.all()
    first_beat = Beats.objects.first()
    return render(request,"templates\play\easy.html", {"beats":beats, "first": first_beat})

def test(request):
    return render(request,"templates\play\itest.html")

def word_list(request):
    # word = Words.objects.get(id = 25466)
    first_word = Words.objects.all().first()
    last_word = Words.objects.all().last()
    lista = []
    for i in range(300):
        random_number = random.randint(first_word.id, last_word.id)
        word = Words.objects.filter(id = random_number).values()
        lista.append(list(word))
    return JsonResponse(lista, safe=False)
    # return JsonResponse({"models_to_return": list(lista)})
    # Words.objects.all().delete()
    # return HttpResponse("deleted")


def words(request):
    found = False
    response= requests.get('https://palabras-aleatorias-public-api.herokuapp.com/multiple-random').json()
    if request.method=="POST":
        try:
            for i in range(490):
                word = response["body"][i]["Word"]
                definition = response["body"][i]["DefinitionMD"]
                try:
                    palabra = Words.objects.get(word = word)
                    found = True
                except:
                    found = False
                if found:
                    i = i + 1
                else:
                    w = Words.objects.create(word = word, definition = definition)
                    w.save()
            return render(request,"templates\play\itest.html")
        except:
             return render(request,"templates\play\itest.html",
            {"message": "Sorry, something went wrong"})
    else:
        return render(request,"templates\play\itest.html")




