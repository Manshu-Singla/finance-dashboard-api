from rest_framework import serializers

from users.serializers import UserSerializer

from .models import FinancialRecord


class FinancialRecordSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = FinancialRecord
        fields = [
            'id',
            'amount',
            'type',
            'category',
            'date',
            'description',
            'user',
            'user_id',
            'created_at',
            'updated_at',
        ]

    def create(self, validated_data):
        validated_data.pop('user_id', None)
        validated_data['user'] = self.context['request_user']
        return super().create(validated_data)
