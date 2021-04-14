from .base import *

DEBUG = True

EMAIL_HOST = "mailhog"
EMAIL_PORT = 1025
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
DEFAULT_FROM_EMAIL = "no-reply@email.com"
EMAIL_USE_TLS = False

ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1", "backend"]

if ENVIRONMENT == "dev":
    extra_app += [
        "drf_yasg",
    ]

INSTALLED_APPS = django_apps + extra_app + custom_apps

SITE_URL = "localhost:3000"
