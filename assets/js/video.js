/* Create the video class */

class Video {
    constructor(title, duration, thumbnail, path, id) {
        Object.assign(this, {
            title, duration, thumbnail, path, id
        });
    }
};

/* Create the videos arr */

const videos = [
    new Video(
        'Madara Uchiha - Edit',
        '00:29',
        'imgs/madara.jpg',
        'media/videos/madara.mp4', 0
    ),
    new Video(
        'Itachi Uchiha - Edit',
        '00:28',
        'imgs/itachi.jpg',
        'media/videos/itachi.mp4', 1
    ),
    new Video(
        'Pain - Edit',
        '00:44',
        'imgs/yahikopain.jpg',
        'media/videos/yahiko.mp4', 2
    ),
    new Video(
        'Obito Uchiha - Edit',
        '00:54',
        'imgs/obito.jpg',
        'media/videos/obito.mp4', 3
    ),
    new Video(
        'Nagato - Edit',
        '01:00',
        'imgs/nagato.jpg',
        'media/videos/nagato.mp4', 4
    ),
    new Video(
        'Minato Namikazi - Edit',
        '00:39',
        'imgs/minato.jpg',
        'media/videos/minato.mp4', 5
    ),
]

/* Function to upload videos */

const videosContainer = i('videos-container');

uploadVideos();

function uploadVideos() {

    for(var i = 0; i < videos.length; i++) {
        var { title, duration , thumbnail , path , id} = videos[i];
        var li = document.createElement('li');

        li.classList.add('video-item');
        li.innerHTML = `
        <div class="media-item" data-id="${id}">
        <figure class="video-img">
            <img src="${thumbnail}" alt="${title}">
            <i class="bx bx-play-circle"></i>
        </figure>
        <div class="media-info">
        <h4 class="media-title line-clamp">${title}</h4>
        <p class="media-details"><i class="bx bx-time"></i><span>${duration}</span></p>
        </div>
    </div>
    <div class="video-player">
        <video src="${path}"></video>
        <div class="play-btn">
            <i class="bx bx-play"></i>
        </div>
    </div>
        `
        videosContainer.appendChild(li);
        
        li.firstElementChild.addEventListener('click', expandVideo)
    }

}

function expandVideo() {
    var cond = !this.classList.contains('active');
    if(cond) {
        qt('.video-item .media-item').forEach(e => {
            e.classList.remove('active');
            qt('.play-btn').forEach(e => e.removeAttribute('hidden', ''));
        })
        qt('video').forEach(e => e.pause());
        this.classList.add('active');
    }
}

/* Play & Pause video */

var playBtns = qt('.video-player .play-btn');
var videosEl = qt('.video-player video');

videosEl.forEach((video,indx) => {
    var playBtn = playBtns[indx];
    // Pause video
    video.addEventListener('click', function() {
        this.pause();
        playBtn.removeAttribute('hidden');
    })
    video.addEventListener('ended', function() {
        playBtn.removeAttribute('hidden');
    })
    // Play video
    playBtn.addEventListener('click', function() {
        this.setAttribute('hidden', '');
        video.play();
    })
});

