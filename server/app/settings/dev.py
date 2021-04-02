from .base import *

DEBUG = True

ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1", "backend"]

extra_app += [
    "drf_yasg",
]

INSTALLED_APPS = django_apps + extra_app + custom_apps
