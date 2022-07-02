from django.urls import path
from . import views

from django.urls import path
from . import views

urlpatterns = [
    path('/easy', views.easy, name="Easy"),
    path('/hard', views.hard, name="Hard"),
    path('/free', views.free, name="Free"),
    path('/test', views.test, name="Test"),
    path("/words", views.words, name="Words"),
    path('/data', views.word_list, name="Word-list"),
    path('/mic', views.mic_test, name="Mic")
]