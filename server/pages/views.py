from rest_framework import viewsets

from server.core.models import Page
from server.pages.serializers import PageGetSerializer, PageListSerializer


class PageSerializerViewSet(viewsets.ReadOnlyModelViewSet):
    serializers = {
        "default": None,
    }

    def get_serializer_class(self):  # type: ignore
        return self.serializers.get(self.action, self.serializers["list"])


class PagesViewSet(PageSerializerViewSet):
    """Get pages list and a specific page data"""

    queryset = Page.objects.all()
    serializers = {"list": PageListSerializer, "retrieve": PageGetSerializer}
    lookup_field = "url"
