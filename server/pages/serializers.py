from rest_framework import serializers

from server.core.models.page import Page


class PageListSerializer(serializers.Serializer):
    """Serializer for the the Page's data"""

    url = serializers.CharField()
    title = serializers.CharField()

    class Meta:
        model = Page


class PageGetSerializer(serializers.Serializer):
    """Serializer for the the Page's data"""

    class Meta:
        model = Page
        fields = {
            "url",
            "title",
            "content",
        }
        lookup_field = "url"
