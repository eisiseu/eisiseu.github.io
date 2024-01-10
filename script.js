var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

console.log("YouTube API Loaded!");

var player;
var currentVideoIndex = 0;

function init() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: videos[currentVideoIndex],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    const playlistItems = document.querySelectorAll('#youtube-list li');
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            playVideoAtIndex(index);
        });
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

function playNextVideo() {
    currentVideoIndex++;
    if (currentVideoIndex >= videos.length) {
        currentVideoIndex = 0;
    }
    playVideoAtIndex(currentVideoIndex);
    player.loadVideoById(videos[currentVideoIndex]);
}

function playPreviousVideo() {
    currentVideoIndex--;
    if (currentVideoIndex < 0) {
        currentVideoIndex = videos.length - 1;
    }
    playVideoAtIndex(currentVideoIndex);
    player.loadVideoById(videos[currentVideoIndex]);
}

function playVideoAtIndex(index) {
    currentVideoIndex = index;
    player.loadVideoById(videos[currentVideoIndex]);
    player.addEventListener('onReady', function () {
        player.playVideo();
    });

    const playlistItems = document.querySelectorAll('#youtube-list li');
    playlistItems.forEach((item) => {
        item.classList.remove('selected');
    });
    playlistItems[index].classList.add('selected');
}

window.addEventListener("load", function () {
    init();
});

const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", function () {
    playNextVideo();
});

const prevBtn = document.getElementById("prev-btn");
prevBtn.addEventListener("click", function () {
    playPreviousVideo();
});

document.addEventListener('mousemove', function (event) {
    handleMouseMove(event);
});

function handleMouseMove(event) {
    const playlist = document.getElementById('playlist');
    const mouseX = event.clientX;

    if (mouseX < 200) {
        playlist.style.left = '0';
    } else {
        playlist.style.left = '-200px';
    }
}
