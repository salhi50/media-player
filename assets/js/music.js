/* Music Player */

// Dom elements

const songsContainer = i('songs-container');
const songPlayer = i('song-player');
const iconShort = q('.left-song .bx');
const iconFull = q('.mid-control .fas');
const inputRange = q('input[type="range"]');
const replay = i('replay');
const changeMode = i('change-mode');
const nextSong = i('next-song');
const prevSong = i('prev-song');

// Preload variables

var firstTimePlayMusic = true;
var focusedSong = null;
var audio = new Audio();
var isPlaying = false;
var songMode = 'end';
var mode = 0;
var interval;
var volume;

var objMode = {
    0: {
        type: 'end',
        node: 'fa fa-repeat',
    },
    1: {
        type: 'all',
        node: 'fa fa-repeat active',
    },
    2: {
        type: 'repeat',
        node: 'fa fa-repeat alt active',
    }
}

// Song class

class Song {
    constructor(title, artist, img, path, duration, id, originalDur) {
        Object.assign(this, {title, artist, img, path, duration, id, originalDur});
    }
    getDuration() {
        var audio = new Audio();
        var t = this;
        audio.addEventListener('loadedmetadata', function() {
            t.duration = correctDuration(audio.duration);
            t.originalDur = audio.duration;
        })
        audio.src = `media/sounds/${this.path}`;
    }
    playMusic() {
        audio.play();
    }
    pauseMusic() {
        clearInterval(interval);
        audio.pause();
    }
}

// Correct duration

function correctDuration(dur) {
    if(dur) {
        var m = Math.floor(dur / 60);
        var s = Math.floor(dur % 60);
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        return `${m}:${s}`;
    }
    return 'Loading duration';
}

/* 
=================================
Songs arr
=================================
*/

var songs = [
    new Song(
        'Marshmello ft. Khalid - Silence',
        'Marshmello',
        'silence.jpg',
        'silence.mp3','Loading duration',0
    ),
    new Song(
        'Justin Bieber - Ghost',
        'Justin Bieber',
        'ghost.jpg',
        'ghost.mp3','Loading duration',1
    ),
    new Song(
        'Elley Duhé - Middle of the Night',
        'Elley Duhé',
        'night.jpg',
        'night.mp3','Loading duration',2
    ),
    new Song(
        'Almighty Push (Remix) - Pain',
        'Pain',
        'push.jpg',
        'push.mp3','Loading duration',3
    ),
    new Song(
        'Consume My Soul (Festival Mix)',
        'Benny Productions',
        'soul.jpg',
        'soul.mp3','Loading duration',4
    ),
    new Song(
        'Selena Gomez, Marshmello - Wolves',
        'Selena Gomez',
        'wolf.jpg',
        'wolves.mp3','Loading duration',5
    ),
];

songs.forEach(song => song.getDuration());

// Upload songs

function uploadSongs() {
    for(var i = 0; i < songs.length; i++) {
        var { title , artist , img, id, path, originalDur} = songs[i];
        var li = document.createElement('li');
        li.classList.add('media-item');
        li.setAttribute('data-id', id);
        li.innerHTML = `
        <figure class="song-img">
        <img src="imgs/${img}" alt="${title}">
        <i class="bx bx-play"></i>
    </figure>
    <div class="media-info">
        <h4 class="media-title line-clamp">${title}</h4>
        <p class="media-details">
            <span>${artist}&nbsp;</span>
            <span>• ${songs[i].duration}</span>
        </p>
    </div>
        `
        songsContainer.appendChild(li);
        q(`[data-id="${id}"]`).addEventListener('click', function() {
            focusedSong = +this.dataset.id;
            getTargetSong();
        });
    }
}

setTimeout(uploadSongs,500);

// Get song

function getTargetSong() {
    var songEl = q(`[data-id="${focusedSong}"]`);
    var song = songs[focusedSong];
    var cond = !songEl.classList.contains('active');
    // Check the song if it not played
    if(cond) {
        audio.src = `media/sounds/${song.path}`;
        setMaxRange(song.originalDur);
        qt(`[data-id]`).forEach(e => e.classList.remove('active'));
        songEl.classList.add('active');
        song.playMusic();
        isPlaying = true;
        // Update
        replaceSongData(song);
        updatePlayerControl();
        clearInterval(interval);
        interval = setInterval(updateAudioTime, 1000);
    }
    // If the song is played for the first time
    if(firstTimePlayMusic) {
        songShort.removeAttribute('hidden');
        firstTimePlayMusic = false;
        volume = audio.volume;
    }
}

// Replace song info

function replaceSongData(song) {
    var { title , artist , img , duration} = song;
    // Img
    songPlayer.querySelectorAll('.the-song-img').forEach(i => {
        i.src = `imgs/${img}`;
    });
    // Info
    songPlayer.querySelector('.song-title').innerHTML = title;
    songPlayer.querySelector('.song-artist').innerHTML = artist;
    songPlayer.querySelector('#end-time').innerHTML = duration;

}

// Update audio time

function updateAudioTime() {
    var dur = correctDuration(audio.currentTime);
    i('current-time').innerHTML = dur;
    updateRange();
    console.log('working');
}

// Update the control

function updatePlayerControl() {
    iconShort.className = 'bx';
    iconFull.className = 'fas';
    
    // Check if the song is playing
    if(isPlaying) {
        iconShort.classList.add('bx-pause');
        iconFull.classList.add('fa-pause-circle');
    }else {
        iconShort.classList.add('bx-play');
        iconFull.classList.add('fa-play-circle');
    }
}

// Audio is ended

audio.addEventListener('ended', function() {
    switch(songMode) {
        case 'end':
            isPlaying  = false;
            audio.currentTime = 0;
            songs[focusedSong].pauseMusic();
            updatePlayerControl();
            break;
        case 'repeat':
            audio.currentTime = 0;
            songs[focusedSong].playMusic();
            break;
        case 'all':
            getNextSong();
            break;
    }
})  

// Get next and prev song

function getNextSong() {
    q(`[data-id="${focusedSong}"]`).classList.remove('active');
    focusedSong++;
    if(focusedSong > songs.length - 1) {
        focusedSong = 0;
    }
    getTargetSong();
}

function getPrevSong() {
    q(`[data-id="${focusedSong}"]`).classList.remove('active');
    focusedSong--;
    if(focusedSong < 0) {
        focusedSong = songs.length - 1;
    }
    getTargetSong();
}

// Add event to the control btns

[iconShort, iconFull].forEach(icon => {
    icon.addEventListener('click', function() {
        checkAudio();
        updatePlayerControl();
    })
});


replay.addEventListener('click', () => audio.currentTime = 0);

changeMode.addEventListener('click', function() {
    mode++;
    if(mode > 2) mode = 0;
    this.className = objMode[mode].node;
    songMode = objMode[mode].type;
})

nextSong.addEventListener('click', getNextSong);
prevSong.addEventListener('click', getPrevSong);

/* 
* We do this to check if the user tap a play/ pause shortcut
* I am always trying to do my best and write a good algorithm for any program
*/

function playSound() {
    isPlaying = true;
    updatePlayerControl();
    clearInterval(interval);
    interval = setInterval(updateAudioTime, 1000);
}

audio.addEventListener('pause', function(e) {
    isPlaying = false;
    updatePlayerControl();
    clearInterval(interval);
    // Prevent any event loop
    audio.removeEventListener('play', playSound);
    audio.addEventListener('play', playSound);
});

function checkAudio() {
    if(isPlaying) {
        songs[focusedSong].pauseMusic();
        isPlaying = false;
    }else {
        songs[focusedSong].playMusic();
        isPlaying = true;
    }
}

// Update audio range

function setMaxRange(max) {
    inputRange.max = Math.ceil(max);
}

function updateBgSize() {
    inputRange.style.backgroundSize = `${inputRange.value * 100 / inputRange.max}% 100%`;
}

inputRange.addEventListener('input', function() {
    i('current-time').innerHTML = correctDuration(this.value);
    audio.currentTime = this.value;
    updateBgSize();
    audio.volume = 0;
});

inputRange.addEventListener('change', function() {
    audio.currentTime = this.value;
    audio.volume = volume;
});

function updateRange() {
    inputRange.value = audio.currentTime;
    updateBgSize();
}
