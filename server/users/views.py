from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

from django.contrib.auth import login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.utils.translation import ugettext_lazy as _
from rest_framework import (
    views,
    generics,
    authentication,
    permissions,
    status,
)

from server.users.serializers import UserSerializer, LoginSerializer
from server.utils.email import send_email

def get_csrf(request):
    msg = _("CSRF cookie set.")
    response = JsonResponse({"detail": msg})
    response["X-CSRFToken"] = get_token(request)
    return response


class RegisterUserView(views.APIView):
    """Create a new user in the system"""

    serializer_class = UserSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if not user:
            msg = _("User cannot be registered.")
            return JsonResponse({"detail": msg}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            msg = _("User successfully registered.")
            message = _(
                "Your account has been created. Use your credentials to log in."
            )
            send_email(
                subject=msg,
                message=message,
                from_email=None,
                recipient_list=[user["email"]],
            )
            return JsonResponse({"detail": msg}, status=status.HTTP_201_CREATED)


class LoginUserView(views.APIView):
    """Authenticate a user"""

    serializer_class = LoginSerializer
    authentication_classes = (authentication.SessionAuthentication,)

    @method_decorator(csrf_protect)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if not user:
            msg = _("Invalid credentials.")
            return JsonResponse({"detail": msg}, status=status.HTTP_400_BAD_REQUEST)
        else:
            login(request, user["user"])
            msg = _("Successfully logged in.")
            return JsonResponse({"detail": msg})


class GetOrUpdateUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""

    serializer_class = UserSerializer
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user


class LogoutUserView(views.APIView):
    """Logout user from system"""

    @method_decorator(csrf_protect)
    def post(self, request, format=None):
        if not request.user.is_authenticated:
            msg = _("You're not logged in.")
            return JsonResponse({"detail": msg}, status=status.HTTP_400_BAD_REQUEST)

        logout(request)
        msg = _("Successfully logged out.")
        return JsonResponse({"detail": msg})
