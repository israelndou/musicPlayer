const musicContainer = document.querySelector(".music-container");
const progressContainer = document.querySelector(".progress-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const audio = document.querySelector("#audio");
const progressBar = document.querySelector(".progress-bar");
const title = document.querySelector("#song-title");
const playStatus = document.querySelector("h1");
const cover = document.querySelector("#cover");
const startTime = document.querySelector(".start-time");
const durationTime = document.querySelector(".duration-time");

// Song titles
var songs = ["Neraah - Un Bail", "Dadju - Django", "Eryn Martin - Blonde", "Eryn Martin - Swallow", "Denis Kenzo - Let Me Go"];

// Keep track of the songs
var songIndex = 0;

// Initial load song info
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `dist/songs/${song}.mp3`;
    cover.src = `dist/images/${song}.jpg`;
}

/// Media navigation functions
function playSong() {
    musicContainer.classList.add('play');

    playStatus.innerText = "Now Playing";

    playBtn.querySelector('i.fas').classList.remove('fa-play-circle');
    playBtn.querySelector('i.fas').classList.add('fa-pause-circle');

    audio.play();

}

function pauseSong() {
    musicContainer.classList.remove('play');

    playStatus.innerText = "Paused";

    playBtn.querySelector('i.fas').classList.add('fa-play-circle');
    playBtn.querySelector('i.fas').classList.remove('fa-pause-circle');

    audio.pause();

}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Progress bar functions 
function progressUpdate(event) {
    const {
        duration,
        currentTime
    } = event.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    startTime.innerText = timeFormat(currentTime);

    durationTime.innerText = timeFormat(audio.duration);

    if (durationTime.innerText.includes("NaN:NaN")) {
        durationTime.innerText = "0:00";
    }

    progressBar.style.width = `${progressPercent}%`;

}

function setProgress(event) {
    const width = this.clientWidth;

    const clickX = event.offsetX;

    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}

function timeFormat(time) {
    const mins = Math.floor(time % 3600 / 60),
        secs = Math.floor(time % 60).toString().padStart(2, 0);

    return `${mins}:${secs}`;
}

/// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }


});

// Change song 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Progress bar
audio.addEventListener('timeupdate', progressUpdate);
progressContainer.addEventListener('click', setProgress);

//Auto load next song & repeat playlist 
audio.addEventListener('ended', nextSong);

/// Cover image bounce animation
const tl = gsap.timeline({
    defaults: {
        duration: 0.75,
        ease: "power1.out"
    }
});

tl.fromTo('.cover-container', {
    y: 0
}, {
    y: -5,
    yoyo: true,
    repeat: -1
});