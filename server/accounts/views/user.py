from django.conf import settings
from django.contrib.auth import logout
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import authentication, permissions, status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from server.accounts.serializers import UserSerializer
from server.utils.email import send_email


@receiver(reset_password_token_created)  # type: ignore
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):

    base_url = f"{instance.request.scheme}://{settings.SITE_URL}/reset-password"
    sbj = _("Reset your password.")
    msg = _(
        "To reset your password use this link {}?token={}".format(
            base_url,
            reset_password_token.key,
        )
    )

    send_email(
        subject=sbj,
        message=msg,
        from_email=None,
        recipient_list=[reset_password_token.user.email],
    )


class UserViewSet(ModelViewSet):
    """
    Accounts ViewSet provides actions: register, update and logout

    POST for register a new user
    GET 'me/ to retrieve a logged in user profile
    PATH 'me/' to partial update a logged in user profile
    DELETE 'me/' to logout a logged in user
    """

    serializer_class = UserSerializer
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user

    def perform_create(self, serializer):
        serializer.save()
        user = serializer.validated_data
        msg = _("User successfully registered.")
        message = _("Your account has been created. Use your credentials to log in.")

        send_email(
            subject=msg,
            message=message,
            from_email=None,
            recipient_list=[user["email"]],
        )

    def logout(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            msg = _("You're not logged in.")
            return Response({"detail": msg}, status=status.HTTP_400_BAD_REQUEST)

        logout(request)
        msg = _("Successfully logged out.")
        return Response({"detail": msg})
