from django.urls import path
from server.users import views

app_name = "users"

urlpatterns = [
    path("get_csrf/", views.get_csrf, name="csrf"),
    path("register/", views.RegisterUserView.as_view(), name="register"),
    path("login/", views.LoginUserView.as_view(), name="login"),
    path("logout/", views.LogoutUserView.as_view(), name="logout"),
    path("me/", views.GetUserView.as_view(), name="me"),
]
