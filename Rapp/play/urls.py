from django.urls import path
from . import views

urlpatterns = [
    path('/easy', views.easy, name="Easy"),
    path('/test', views.test, name="test"),
]