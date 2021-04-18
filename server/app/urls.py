from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.urls.conf import re_path
from django.views.static import serve

from server.app.views import index

urlpatterns = [
    path("api/v1/accounts/", include("server.accounts.urls")),
    path("admin/", admin.site.urls),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    re_path(r"^.*", index, name="index"),
]

if settings.ENVIRONMENT == "dev":
    from .yasg import yasg_urlpatterns

    urlpatterns = yasg_urlpatterns + urlpatterns
