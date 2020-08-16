
from django.conf.urls import url
from rest_framework import routers
from functionality.views import VideoSessionViewset, StockUploadViewset

router = routers.DefaultRouter()
# router.register(r'video_session/<int:user_id>/', VideoSessionViewset, basename="videosession")
router.register(r'stock_upload', StockUploadViewset, basename="stockupload")

urlpatterns = [
    url(r'^video_session_list/(?P<user_id>[0-9]+)/$', VideoSessionViewset.as_view({"get": "list"}), name="video_session"),
    url(r'^video_session/(?P<user_id>[0-9]+)/(?P<pk>[0-9]+)/$', VideoSessionViewset.as_view({"get": "retrieve"}), name="video_session_retrieve"),
    url(r'^create_video_session/$', VideoSessionViewset.as_view({"post": "create"}), name="video_session_create")
]

urlpatterns += router.urls
