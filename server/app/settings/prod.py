from .base import *  # NOSONAR

DEBUG = False

ALLOWED_HOSTS = []
allowed_hosts = os.getenv("ALLOWED_HOSTS") or ""
for host in allowed_hosts.split(","):
    ALLOWED_HOSTS.append(host)
