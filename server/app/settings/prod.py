from .base import *  # NOSONAR
from distutils.util import strtobool

debug = os.getenv("DEBUG")
DEBUG = bool(strtobool(debug)) or False

ALLOWED_HOSTS = []
allowed_hosts = os.getenv("ALLOWED_HOSTS") or ""
for host in allowed_hosts.split(","):
    ALLOWED_HOSTS.append(host)

# Security
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True