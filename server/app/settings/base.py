import os
from pathlib import Path

ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent.parent.parent  # /
SERVER_DIR = ROOT_DIR / "server"  # /server/
BASE_DIR = SERVER_DIR / "app"  # /server/app/
CLIENT_DIR = ROOT_DIR / "client"  # /client/

# GENERAL
SECRET_KEY = os.getenv("SECRET_KEY")  # Should CRASH if it's empty!

# Set the current environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "")

# Security
CSRF_COOKIE_SAMESITE = "Strict"
CSRF_COOKIE_HTTPONLY = False
SESSION_COOKIE_SAMESITE = "Strict"
SESSION_COOKIE_HTTPONLY = True

# Application definition
django_apps = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]
extra_app = [
    "rest_framework",
    "django_rest_passwordreset",
    "ckeditor",
]
custom_apps = [
    "server.core",
    "server.accounts",
    "server.pages",
]

MIDDLEWARE = [
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "server.app.urls"

WSGI_APPLICATION = "server.app.wsgi.application"

# DATABASES
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.getenv("DB_HOST"),  # Should CRASH if it's empty!
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "ATOMIC_REQUESTS": True,
        "CONN_MAX_AGE": int(os.getenv("CONN_MAX_AGE", default=60)),
    }
}

# Custom User model
AUTH_USER_MODEL = "core.User"

# Django REST framework
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
}

# Django REST Password Reset
DJANGO_REST_PASSWORDRESET_TOKEN_CONFIG = {
    "CLASS": "django_rest_passwordreset.tokens.RandomStringTokenGenerator",
    "OPTIONS": {"min_length": 64, "max_length": 64},
}

# CKEditor
CKEDITOR_CONFIGS = {
    "default": {
        "toolbar": "full",
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_ROOT = os.path.join(ROOT_DIR, "static")
STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(CLIENT_DIR, "build/static"),
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(CLIENT_DIR, "build"),  # React build
            os.path.join(BASE_DIR, "templates"),  # Custom templates
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
