from django.urls import include, path

from server.accounts import views
from server.accounts.views import get_csrf

app_name = "accounts"

user_login = views.UserLoginView.as_view()
user_register = views.UserViewSet.as_view({"post": "create"})
user_perform = views.UserViewSet.as_view(
    {"get": "retrieve", "delete": "logout", "patch": "partial_update"}
)

urlpatterns = [
    path("", user_register, name="users-register"),
    path("login/", user_login, name="users-login"),
    path("me/", user_perform, name="users-perform"),
    path("csrf-token/", get_csrf, name="users-get-csrf-token"),
    path(
        "password-reset/",
        include("django_rest_passwordreset.urls", namespace="users-password-reset"),
    ),
]
