from django.contrib import admin
from .models import Categoria, Beats
# Register your models here.

admin.site.register(Categoria)


class Beats_admin(admin.ModelAdmin):
    readonly_fields=('subido',)
admin.site.register(Beats, Beats_admin)