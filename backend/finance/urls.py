from rest_framework.routers import DefaultRouter

from .views import FinancialRecordViewSet

router = DefaultRouter()
router.register('records', FinancialRecordViewSet, basename='record')

urlpatterns = router.urls
