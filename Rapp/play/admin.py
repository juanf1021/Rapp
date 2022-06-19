from django.contrib import admin
from .models import Words
# Register your models here.

class Words_admin(admin.ModelAdmin):
    search_fields= ("word",)

admin.site.register(Words, Words_admin)
