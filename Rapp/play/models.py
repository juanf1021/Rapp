from django.db import models

# Create your models here.


from django.db import models

# Create your models here.

class Words(models.Model):
    word = models.CharField(max_length=100, unique=True)
    definition = models.CharField(max_length=800) 
    class Meta:
        verbose_name= "Word"
        verbose_name_plural= "Words"

    def __str__(self):
        return self.word
