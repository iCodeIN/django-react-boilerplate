from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.urls.conf import re_path
from django.views.static import serve

from server.app.views import index

urlpatterns = [
    path("", index, name="index"),
    path("admin/", admin.site.urls),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]