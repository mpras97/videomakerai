import os
from os.path import isfile
import ffmpeg


class AiVideoConvertor(object):
    """
    Helper class to convert video convertor.
    """

    def convert_images_to_video(self, images_path):
        """

        :param images_path:
        :return:
        """
        video_list = []
        try:
            for _image in images_path:
                print(images_path.index(_image))
                if isfile(_image):
                    ffmpeg.input(_image, framerate=0.3)\
                        .filter('hue', s=0)\
                        .output(f'{images_path.index(_image)}.mp4')\
                        .run(capture_stdout=True, capture_stderr=True)
                    video_list.append(f'{images_path.index(_image)}.mp4')
        except ffmpeg.Error as e:
            print('stdout:', e.stdout.decode('utf8'))
            print('stderr:', e.stderr.decode('utf8'))
            raise e
        return video_list

    def concat_videos(self, video_list):
        """
        :param video_list:
        :return:
        """

        main_video_name = 'main.mp4'
        main_video = video_list[0]
        _video_list = video_list.pop(0)

        try:
            for _video in video_list:
                # video_index = next(iter(video_list)) if _video == main_video else _video
                # print(video_index == main_video)
                in1 = ffmpeg.input(main_video)
                # print(f'video_index={video_index}')
                in2 = ffmpeg.input(_video)
                v1 = in1.video
                v2 = in2.video
                joined = ffmpeg.concat(v1, v2, v=1, a=1).output('main_video.mp4').run(overwrite_output=True, capture_stdout=True, capture_stderr=True)
                v3 = joined[0]
                # if isfile(main_video_name):
                #     os.remove(main_video_name)
                print(main_video_name)
                print(v3)
                # out = ffmpeg.output(v3, f'{video_list.index(_video)}_video.mp4')\
                #     .run(capture_stdout=True, capture_stderr=True)

                main_video = 'main_video.mp4'

        except ffmpeg.Error as e:
            print('stdout:', e.stdout.decode('utf8'))
            print('stderr:', e.stderr.decode('utf8'))
            raise e


if __name__ == '__main__':
    ipath = '/Users/shivinagarwal/hackathon/videditor/ffmpeg-python/examples/graphs'

    image_lists = [os.path.join(ipath, 'av-pipeline.png'),
                   os.path.join(ipath, 'ffmpeg-numpy.png'),
                   os.path.join(ipath, 'glob-filter.png'),
                   os.path.join(ipath, 'mono-to-stereo.png')
                   ]
    _ai = AiVideoConvertor()
    _videos = _ai.convert_images_to_video(image_lists)
    _ai.concat_videos(_videos)
