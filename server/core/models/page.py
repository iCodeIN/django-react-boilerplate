from ckeditor.fields import RichTextField
from django.db import models


class Page(models.Model):
    url = models.CharField(max_length=200)
    title = models.CharField(max_length=255)
    content = RichTextField()

    def __str__(self):
        return self.title
