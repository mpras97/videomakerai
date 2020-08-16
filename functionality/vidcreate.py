import cv2
import numpy as np
import glob
import os
import time

from functionality.models import VideoSession

image_filters = []

sepia_filter = np.array([[0.272, 0.534, 0.131],
                               [0.349, 0.686, 0.168],
                               [0.393, 0.769, 0.189]])

# Sepia Filter
# image_filters.append(np.array([[0.272, 0.534, 0.131],
#                                [0.349, 0.686, 0.168],
#                                [0.393, 0.769, 0.189]]))

sharpen_filter = np.array([[-1, -1, -1],
                               [-1, 9, -1],
                               [-1, -1, -1]])

# Sharpen filter
# image_filters.append(np.array([[-1, -1, -1],
#                                [-1, 9, -1],
#                                [-1, -1, -1]]))

# Gaussian filter
# Applied using cv2.GaussianBlur(src, (10, 10), cv2.BORDER_DEFAULT)


# scale_percent = 10

# size = (378, 200)

# out = cv2.VideoWriter('project.avi', cv2.VideoWriter_fourcc(*'DIVX'), 2, size)

# print("h1")

# img_array = []
# for filename in glob.glob('/mnt/d/projects/garuda/videomakerai/functionality/sample_vids/*.jpeg'):
#     print("h1")
#     for i in range(20):
#         print(i)
#         img = cv2.imread(filename)
#         height, width, layers = img.shape

#         resized = cv2.resize(img, (size[0], size[1]), interpolation=cv2.INTER_AREA)
#         resized = cv2.filter2D(resized, -1, image_filters[i%2])
#         out.write(resized)

# glob_path = glob.glob('/mnt/d/projects/garuda/videomakerai/functionality/sample_vids/*.jpeg')
# file1 = glob_path[0]
# file2 = glob_path[1]

# img1 = cv2.imread(file1)
# img1 = cv2.resize(img1, size, interpolation=cv2.INTER_AREA)
# img2 = cv2.imread(file2)
# img2 = cv2.resize(img2, size, interpolation=cv2.INTER_AREA)

# for i in np.linspace(0, 1, 100):
#     alpha = i
#     beta = 1 - alpha
#     output = cv2.addWeighted(img1, alpha, img2, beta, 0)
#     time.sleep(0.02)
#     out.write(output)

def transition_by_fade(img1, img2, out):
    video_size = (640, 480)
    img1 = cv2.resize(img1, video_size, interpolation=cv2.INTER_AREA)
    img2 = cv2.resize(img2, video_size, interpolation=cv2.INTER_AREA)
    for i in np.linspace(0,1,100):
        alpha = i
        beta = 1 - alpha
        output = cv2.addWeighted(img1, alpha, img2, beta, 0)
        out.write(output)
    return out


def horizontal_transition_by_in_out(img1, img2, out):
    video_size = (640, 480)
    img1 = cv2.resize(img1, video_size, interpolation=cv2.INTER_AREA)
    img2 = cv2.resize(img2, video_size, interpolation=cv2.INTER_AREA)
    for i in np.linspace(0,1,100):
        final_image = np.zeros((480, 640, 3), dtype=np.uint8)
        max_width = int(video_size[0] * i)
        cropped_img1 = img1[:,:max_width]
        cropped_img2 = img2[:,max_width:int(video_size[0])]
        final_image[:,:max_width,:] = cropped_img1
        final_image[:,max_width:int(video_size[0]),:] = cropped_img2
        out.write(final_image)
    return out


def vertical_transition_by_in_out(img1, img2, out):
    video_size = (640, 480)
    img1 = cv2.resize(img1, video_size, interpolation=cv2.INTER_AREA)
    img2 = cv2.resize(img2, video_size, interpolation=cv2.INTER_AREA)
    for i in np.linspace(0,1,100):
        final_image = np.zeros((480,600,3), dtype=np.uint8)
        max_height = int(video_size[1] * i)
        cropped_img1 = img1[:max_height,:]
        cropped_img2 = img2[max_height:video_size[1],:]
        final_image[:max_height,:,:] = cropped_img1
        final_image[max_height:video_size[1],:,:] = cropped_img2
        out.write(final_image)
    return out


def create_video(files_location, file_name, video_session, fps=0.5, video_type=1):
    """
    video_type is 1 for colourful else 0 for vintage
    """
    video_name = file_name + ".avi"
    video_size = (640, 480)
    out = cv2.VideoWriter(video_name, cv2.VideoWriter_fourcc(*'DIVX'), fps, video_size)
    for filename in files_location:
        img = cv2.imread(filename)
        resized = cv2.resize(img, video_size, interpolation=cv2.INTER_AREA)
        if video_type == 0:
            resized = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
        for i in range(10):
            out.write(resized)
    out.release()
    video_session = VideoSession.objects.get(id=video_session)
    video_session.final_upload = video_name
    video_session.save()
