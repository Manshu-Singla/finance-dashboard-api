from django.db.models import Sum
from django.db.models.functions import Coalesce
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from users.permissions import get_request_user

from .models import FinancialRecord
from .permissions import RecordPermission, SummaryPermission
from .serializers import FinancialRecordSerializer


def filter_records(request):
    queryset = FinancialRecord.objects.select_related('user').all()

    record_type = request.query_params.get('type')
    category = request.query_params.get('category')
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    if record_type:
        queryset = queryset.filter(type=record_type)
    if category:
        queryset = queryset.filter(category__icontains=category)
    if start_date:
        queryset = queryset.filter(date__gte=start_date)
    if end_date:
        queryset = queryset.filter(date__lte=end_date)

    return queryset


class FinancialRecordViewSet(viewsets.ModelViewSet):
    serializer_class = FinancialRecordSerializer
    permission_classes = [RecordPermission]

    def get_queryset(self):
        return filter_records(self.request)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request_user'] = get_request_user(self.request)
        return context


class SummaryAPIView(APIView):
    permission_classes = [SummaryPermission]

    def get(self, request):
        filtered = filter_records(request)

        income_total = filtered.filter(type=FinancialRecord.RecordType.INCOME).aggregate(
            total=Coalesce(Sum('amount'), 0)
        )['total']
        expense_total = filtered.filter(type=FinancialRecord.RecordType.EXPENSE).aggregate(
            total=Coalesce(Sum('amount'), 0)
        )['total']

        category_totals = (
            filtered.values('category', 'type')
            .annotate(total=Coalesce(Sum('amount'), 0))
            .order_by('category')
        )

        return Response(
            {
                'total_income': income_total,
                'total_expense': expense_total,
                'net_balance': income_total - expense_total,
                'category_totals': list(category_totals),
            },
            status=status.HTTP_200_OK,
        )
