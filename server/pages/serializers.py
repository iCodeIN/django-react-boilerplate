from rest_framework import serializers


class PageListSerializer(serializers.Serializer):
    """Serializer for the list of Pages"""

    url = serializers.CharField()
    title = serializers.CharField()


class PageGetSerializer(serializers.Serializer):
    """Serializer for the the Page's data"""

    title = serializers.CharField()
    content = serializers.CharField()
