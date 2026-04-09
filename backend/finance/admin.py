from django.contrib import admin

from .models import FinancialRecord


@admin.register(FinancialRecord)
class FinancialRecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'type', 'amount', 'date', 'user')
    list_filter = ('type', 'category', 'date')
    search_fields = ('category', 'description', 'user__username')

# Register your models here.
