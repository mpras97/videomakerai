
from rest_framework import viewsets
from functionality.serializers import VideoSessionSerializer, StockUploadSerializer
from functionality.models import VideoSession, StockUpload


class VideoSessionViewset(viewsets.ModelViewSet):
    queryset = VideoSession.objects.all()
    serializer_class = VideoSessionSerializer


class StockUploadViewset(viewsets.ModelViewSet):
    queryset = StockUpload.objects.all()
    serializer_class = StockUploadSerializer
