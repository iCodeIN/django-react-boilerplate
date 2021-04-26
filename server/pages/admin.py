from django.contrib import admin

from server.core.models import Page


class PageAdmin(admin.ModelAdmin):
    ordering = ["id"]
    list_display = ["title", "url"]

    search_fields = ["title"]


admin.site.register(Page, PageAdmin)
