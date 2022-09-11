from django.urls import path
from . import views

from django.urls import path
from . import views

urlpatterns = [
    path('/easy', views.easy, name="Easy"),
    path('/hard', views.hard, name="Hard"),
    path('/free', views.free, name="Free"),
    path('/test', views.imagesJson, name="Test"),
    path('/images', views.images, name="Images"),
    path('/data', views.word_list, name="Word-list"),
    # path('/mic', views.mic_test, name="Mic")
    # path("/words", views.words, name="Words"),
]