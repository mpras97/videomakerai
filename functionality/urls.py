
from django.urls import path
from rest_framework import routers
from functionality.views import VideoSessionViewset, StockUploadViewset

router = routers.SimpleRouter()
router.register(r'video_session', VideoSessionViewset)
router.register(r'stock_upload', StockUploadViewset)

urlpatterns = router.urls
