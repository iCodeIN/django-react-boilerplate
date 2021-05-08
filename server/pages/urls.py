from django.urls import path

from server.pages import views

# from server.pages.views import get_pages

app_name = "pages"

pages_list = views.PagesViewSet.as_view({"get": "list"})
pages_get = views.PagesViewSet.as_view({"get": "retrieve"})

urlpatterns = [
    path("", pages_list, name="pages-list"),
    path("<slug:url>/", pages_get, name="pages-get"),
]
