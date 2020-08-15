
from rest_framework import viewsets
from functionality.serializers import VideoSessionSerializer, StockUploadSerializer
from functionality.models import VideoSession, StockUpload
import logging
from rest_framework.response import Response
from rest_framework import permissions


class VideoSessionViewset(viewsets.ModelViewSet):
    serializer_class = VideoSessionSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return VideoSession.objects.filter(added_by__id=self.kwargs["user_id"])
    
    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except:
            logging.exception("Got exception")
            return Response(status=500)


class VideoSessionMixin(viewsets.ViewSet):
    serializer_class = VideoSessionSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return VideoSession.objects.all()

    def list(self, request, *args, **kwargs):
        try:
            queryset = VideoSession.objects.filter(added_by__id=self.kwargs["user_id"])
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        except:
            return Response(status=500)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.serializer_class(instance)
            return Response(serializer.data)
        except:
            return Response(status=500)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=200)
        except:
            return Response(status=500)


class StockUploadViewset(viewsets.ModelViewSet):
    queryset = StockUpload.objects.all()
    serializer_class = StockUploadSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data={'uploaded_file': request.FILES['uploaded_file'],
                                                     'session': request.data['session'][0]})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=200)
        except:
            return Response(status=500)

