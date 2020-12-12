from .base import *

DEBUG = False

# DATABASES
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME") or "",
        "USER": os.getenv("DB_USER") or "",
        "PASSWORD": os.getenv("DB_PASSWORD") or "",
        "HOST": os.getenv("DB_HOST") or "",
        "ATOMIC_REQUESTS": True,
        "CONN_MAX_AGE": int(os.getenv("CONN_MAX_AGE", default=60)),
    }
}


MIDDLEWARE += [
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

import django_on_heroku

django_on_heroku.settings(locals())