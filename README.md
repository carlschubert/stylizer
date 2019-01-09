# Neural Style Transfer

<<<<<<< HEAD
This app allows you to experiment with arbitrary neural transfer as specified in [this paper](https://arxiv.org/abs/1705.06830). Arbitrary style transfer application of machine learning. It allows you to redraw the content of any image in the style of any other.

1.) cd to static directory and run ```npm install```
2.) Download model from magenta from [this link](http://download.tensorflow.org/models/vgg_16_2016_08_28.tar.gz). (Or train your own...).  Put it new directory at server/model.
3.) Run ```./build-dev```
4.) Use the app in the browser on ```http://0.0.0.0:5000/```

Instructions for using the app:

    1. Drag some images that you want to use as style images into the “Image Dropzone” section on this page. If you are using this app on your phone, you can also tap the “Image Dropzone” and take a picture or upload from your “Photo Library.”
    2. Repeat step one, but with your content images and the “Content Dropzone.”
    3. Press “Go” button.
    4. Wait...
    5. View your processed images in a carousel in order of interpolation.  

There are also shell scripts to deploy this to aws elastic beanstalk.  I don't have it deployed right now because it is too expensive to run on free tier but there is an example environment file that can be completed.
=======
1.) cd to static directory and run npm install

2.) Download model from magenta from [this link](http://download.tensorflow.org/models/vgg_16_2016_08_28.tar.gz). (Or train your own...).  Put it new directory at server/model.

3.) run `./build-dev.sh`
>>>>>>> 5a228f0a48c50b62e36890929d35f24275ecddb4
