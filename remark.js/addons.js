slideshow.on('afterShowSlide', function (slide) {
    var video = $('.remark-visible').find('video').get(0);
    console.log(video)
    if(video !== undefined) {
        video.play();
    }
});

slideshow.on('beforeHideSlide', function (slide) {
    var video = $('.remark-visible').find('video').get(0);
    console.log(video)
    if(video !== undefined) {
        video.pause();
    }
});
