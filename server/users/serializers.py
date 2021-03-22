from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""

    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        username = attrs.get("username")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"), username=username, password=password
        )

        if not user:
            msg = _("Unable to authenticate with provided credentials.")
            raise serializers.ValidationError({"detail": msg}, code="authentication")

        if not user.is_active:
            msg = _("User is disabled.")
            raise serializers.ValidationError({"detail": msg}, code="authentication")

        return {"user": user}


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = (
            "username",
            "email",
            "password",
        )
        extra_kwargs = {
            "email": {"required": True},
            "password": {"required": True, "write_only": True, "min_length": 9},
        }

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        username = validated_data.pop("username")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        user = get_user_model().objects.create_user(
            username, email, password, **validated_data
        )

        return user

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user
