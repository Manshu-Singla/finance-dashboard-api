from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import User
from .permissions import IsAdminByHeader, IsAuthenticatedByHeader, get_request_user
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['register', 'login']:
            return [AllowAny()]
        if self.action in ['list', 'retrieve', 'me']:
            return [IsAuthenticatedByHeader()]
        return [IsAdminByHeader()]

    @action(detail=False, methods=['post'], serializer_class=RegisterSerializer)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], serializer_class=LoginSerializer)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response(UserSerializer(user).data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticatedByHeader])
    def me(self, request):
        user = get_request_user(request)
        return Response(UserSerializer(user).data)
