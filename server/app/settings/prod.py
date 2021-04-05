from .base import *
from distutils.util import strtobool

debug = os.getenv("DEBUG")
DEBUG = bool(strtobool(debug)) or False

# Sendgrid email config
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "")

ALLOWED_HOSTS = []
allowed_hosts = os.getenv("ALLOWED_HOSTS") or ""
for host in allowed_hosts.split(","):
    ALLOWED_HOSTS.append(host)

INSTALLED_APPS = django_apps + extra_app + custom_apps

# Security
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True