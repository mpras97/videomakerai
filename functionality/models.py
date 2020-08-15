from django.db import models
from django.contrib.auth.models import User


class VideoSession(models.Model):

    TRAVEL = 1
    WEDDING = 2
    BUSINESS = 3
    INTRO = 4

    SESSION_TYPES = [
        [TRAVEL, "TRAVEL"],
        [WEDDING, "WEDDING"],
        [BUSINESS, "BUSINESS"],
        [INTRO, "INTRO"]
    ]

    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    transforms = models.TextField()
    final_video = models.FileField()
    session_type = models.IntegerField(choices=SESSION_TYPES, default=INTRO)


class StockUpload(models.Model):
    uploaded_file = models.FileField()
    session = models.ForeignKey(VideoSession, on_delete=models.CASCADE)
