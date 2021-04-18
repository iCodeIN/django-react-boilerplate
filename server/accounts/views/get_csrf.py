from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.translation import ugettext_lazy as _


def get_csrf(request):
    msg = _("CSRF cookie set.")
    response = JsonResponse({"detail": msg})
    response["X-CSRFToken"] = get_token(request)
    return response
