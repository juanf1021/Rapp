from django.urls import path
from . import views

from django.urls import path
from . import views

urlpatterns = [
    path('/easy', views.easy, name="Easy"),
    path('/test', views.test, name="Test"),
    path("/words", views.words, name="Words"),
    path('/data', views.test_data, name="Word-list")
]