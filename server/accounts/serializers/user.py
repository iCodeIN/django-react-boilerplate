from django.contrib.auth import get_user_model, password_validation
from django.core import exceptions
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
        )
        extra_kwargs = {
            "email": {"required": True},
            "password": {
                "required": True,
                "write_only": True,
                "min_length": 8,
            },
        }
        read_only_fields = (
            "date_created",
            "date_modified",
        )

    def validate_password(self, value):
        try:
            password_validation.validate_password(value)
        except exceptions.ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

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
        first_name = validated_data.pop("first_name", instance.first_name)
        last_name = validated_data.pop("last_name", instance.last_name)
        email = validated_data.pop("email", instance.email)
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        if password:
            user.set_password(password)

        user.save()

        return user
