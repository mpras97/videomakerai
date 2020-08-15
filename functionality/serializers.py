from rest_framework import serializers
from functionality.models import VideoSession, StockUpload

class VideoSessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = VideoSession
        fields = '__all__'


class StockUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockUpload
        fields = '__all__'
