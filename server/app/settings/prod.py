from .base import *

DEBUG = False

# DATABASES
DATABASES = {"default": {}}
DATABASES["default"] = os.getenv("DATABASE_URL")
DATABASES["default"]["ENGINE"] = "django.db.backends.postgresql"
DATABASES["default"]["ATOMIC_REQUESTS"] = True
DATABASES["default"]["CONN_MAX_AGE"] = int(os.getenv("CONN_MAX_AGE", default=60))

import django_on_heroku

django_on_heroku.settings(locals())