
from rest_framework import viewsets
from rest_framework.views import APIView
from functionality.serializers import VideoSessionSerializer, StockUploadSerializer
from functionality.models import VideoSession, StockUpload
import logging
from rest_framework.response import Response
from functionality.vidcreate import *


class VideoSessionViewset(viewsets.ModelViewSet):
    serializer_class = VideoSessionSerializer

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

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data={'uploaded_file': request.FILES['uploaded_file'],
                                                     'session': request.data['session'][0]})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=200)
        except:
            return Response(status=500)


class StartVideoCreationAPI(APIView):

    def post(self, request, *args, **kwargs):
        # Start creation of video
        video_session = VideoSession.objects.get(id=request.data["video_session_id"])
        stock_uploads = StockUpload.objects.filter(session=video_session)
        file_locations = [stock_upload.uploaded_file.path for stock_upload in stock_uploads]
        create_video(file_locations, video_session.name)
        return Response(status=200)
