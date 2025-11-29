from django.contrib import admin
from .models import News,Category,Comments,Images


# Register your models here.

# admin.site.register(News)
admin.site.register(Category)
admin.site.register(Comments)
admin.site.register(Images)


class AdminNews(admin.ModelAdmin):
    list_display = ['title','published_time','category']
    search_fields = ['title','category']
    list_filter = ['published_time','category']
admin.site.register(News,AdminNews)