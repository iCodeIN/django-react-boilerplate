from django.contrib.auth import login
from django.utils.translation import ugettext_lazy as _
from rest_framework import authentication, status, views
from rest_framework.response import Response

from server.accounts.serializers import LoginSerializer


class UserLoginView(views.APIView):
    """
    Authenticate a user
    """

    serializer_class = LoginSerializer
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if not user:
            msg = _("Invalid credentials.")
            return Response({"detail": msg}, status=status.HTTP_400_BAD_REQUEST)
        else:
            login(request, user["user"])
            msg = _("Successfully logged in.")
            return Response({"detail": msg})
