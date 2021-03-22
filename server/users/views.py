from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.translation import ugettext_lazy as _
from rest_framework import views, generics, authentication, permissions
from rest_framework.views import APIView
from server.users.serializers import UserSerializer, LoginSerializer


def get_csrf(request):
    msg = _("CSRF cookie set.")
    response = JsonResponse({"detail": msg})
    response["X-CSRFToken"] = get_token(request)
    return response


class RegisterUserView(generics.CreateAPIView):
    """Create a new user in the system"""

    serializer_class = UserSerializer


class LoginUserView(views.APIView):
    """Create a new auth token for user"""

    serializer_class = LoginSerializer
    authentication_classes = (authentication.SessionAuthentication,)

    @method_decorator(csrf_protect)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if not user:
            msg = _("Invalid credentials.")
            return JsonResponse({"detail": msg}, status=400)
        else:
            login(request, user["user"])
            msg = _("Successfully logged in.")
            return JsonResponse({"detail": msg})


class GetUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""

    serializer_class = UserSerializer
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user


class LogoutUserView(APIView):
    """Logout user from system"""

    @method_decorator(csrf_protect)
    def post(self, request, format=None):
        if not request.user.is_authenticated:
            msg = _("You're not logged in.")
            return JsonResponse({"detail": msg}, status=400)

        logout(request)
        msg = _("Successfully logged out.")
        return JsonResponse({"detail": msg})
