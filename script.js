let songPlay = document.getElementById('songPlay');
var gif = document.querySelector('.gif');
let seekBar = document.getElementById('songPosition');
let songlistPlay = document.getElementsByClassName('songlistPlay');
let songTitle = document.getElementsByClassName('songTitle');
let duration = document.getElementsByClassName('duration');
let songInfo = document.getElementById('songInfo');
let volume = document.getElementById('volume');
let vol = document.querySelector('.vol');
let previous = document.querySelector('.previous');
let next = document.querySelector('.next');
let loop = document.getElementById('loop')
// Audio constructor
var songAudio = new Audio();



// Song array consists of each and every song info in a single object  
let songs = [
    { name: "Rula Ke Gaya Ishq", singer: "Stebin Ben, Sunny-Inder, Kumaar", duration: "04:16" },
    { name: "Dil Ke Dastakk", singer: "Karthik Rao · Shilpa Surroch ", duration: "03:02" },
    { name: "Teri Hogaiyaan 2", singer: "Vishal Mishra", duration: "03:42" },
    { name: "Jaan Ban Gaye Reprise", singer: "Asees Kaur", duration: "01:53" },
    { name: "Kabhii Tumhhe", singer: "Darshan Raval", duration: "03:54" },
    { name: "Humraazi", singer: "Wajhi Farooki", duration: "04:32" },
    { name: "Tere Naal", singer: "Akhil Sachdeva", duration: "01:53" },
    { name: "Tere Siva Jag Mein", singer: "Darshan Raval", duration: "03:34" },
    { name: "Khushiyan Da Chadya", singer: "Goldie Sohel", duration: "04:13" },
    { name: "Baarish Ban Jaana", singer: "Payal Dev, Stebin Ben", duration: "04:11" }
]


// this event listens the time running when the audio is on so we listen this on audio and we are using this to update seek bar
songAudio.addEventListener('timeupdate', () => {
    seekBar.value = parseInt((songAudio.currentTime / songAudio.duration) * 100);
})
//  This event is being heard to update the audio time when we update the seek bar
seekBar.addEventListener('input', (e) => {
    songAudio.currentTime = ((e.target.value * songAudio.duration) / 100);

})


// Here we are updating the currently playing song info
Array.from(songTitle).forEach((element, index) => {
    element.innerText = songs[index].name;
})
Array.from(duration).forEach((element, index) => {
    element.innerText = songs[index].duration;
});


// This event is used to play the desired song
Array.from(songlistPlay).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        AllPlay();
        url = parseInt(e.target.id);

        songAudio.src = `songs/${url}.mp3`;
        if ((songAudio.played == true) && (songAudio.currentTime > 0)) {
            songPlay.classList.remove('fa-circle-pause');
            songPlay.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
            gif.style.opacity = '0';
            songAudio.paused = true;
            songAudio.currentTime = 0;
        }
        else {
            songPlay.classList.remove('fa-circle-play');
            songPlay.classList.add('fa-circle-pause');
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
            gif.style.opacity = '1';
            songAudio.play();
            document.getElementById('end').innerText = `${songs[url - 1].duration}`;
            logo();
            Array.from(document.getElementsByClassName('songItem')).forEach((element, index) => {
                if (url - 1 == index) {
                    setInterval(() => {
                        element.getElementsByTagName('img')[0].style.transform = 'rotate(360deg)'
                    }, 1500);
                }
            })
            timing();
            songInfo.style.color = 'grey';
            playBar(index);
        }
    });
});


// This function is called to change the play/pause mode of the former song when switching to the other song 
function AllPlay() {
    Array.from(songlistPlay).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}



//  this event is heard to play/pause the current song on clicking the play/pause button
songPlay.addEventListener('click', () => {
    if (songAudio.played && songAudio.currentTime > 0) {
        songPlay.classList.remove('fa-circle-pause');
        songPlay.classList.add('fa-circle-play');
        gif.style.opacity = '0';
        songAudio.pause();
        document.getElementById('time').innerText = "00:00";
        songInfo.style.color = 'white';
        songAudio.currentTime = 0;
        AllPlay();
        timing();
    }
    else {
        songPlay.classList.remove('fa-circle-play');
        songPlay.classList.add('fa-circle-pause');
        gif.style.opacity = '1';
        songAudio.play();
        songInfo.style.color = 'grey';
        play();
        timing();
    }
})


// This function is used to alter the button class when we are playing/pausing the current song
function play() {
    Array.from(songlistPlay).forEach(element => {
        url = element.id;
        a = songAudio.currentSrc;
        b = `http://127.0.0.1:5500/songs/${url}.mp3`
        if (a == b) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        }
    });
}


// This function used to display the song info near the seek bar
function playBar(index) {
    songInfo.innerText = `${songs[index].name}-${songs[index].singer}`
}

// This event is heard to pause and play using space bar
document.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) {
        if (songAudio.played && songAudio.currentTime > 0) {
            songPlay.classList.remove('fa-circle-pause');
            songPlay.classList.add('fa-circle-play');
            gif.style.opacity = '0';
            songAudio.pause();
            document.getElementById('time').innerText = "00:00";
            songInfo.style.color = 'white';
            songAudio.currentTime = 0;
            AllPlay();
        }
        else {
            songPlay.classList.remove('fa-circle-play');
            songPlay.classList.add('fa-circle-pause');
            gif.style.opacity = '1';
            songAudio.play();
            timing();
            songInfo.style.color = 'grey';
            play();
        }
    }
})

volume.addEventListener('input', (e) => {
    songAudio.volume = (((e.target.value * 1) / 100));
})
//  This event is being heard to mute and unmute the currently playing song 
vol.addEventListener('click', (e) => {
    if (songAudio.muted == false) {
        songAudio.muted = true;
        vol.classList.remove('fa-volume-high')
        vol.classList.add('fa-volume-xmark');
        volume.style.opacity = '0';

    }
    else {
        songAudio.muted = false;
        e.target.classList.remove('fa-volume-xmark');
        e.target.classList.add('fa-volume-high');
        volume.style.opacity = '1';
    }
})


// This section used to go to the previous song in the playlist
previous.addEventListener('click', (e) => {
    if (url == 1) {
        url = songs.length;
        songAudio.src = `songs/${url}.mp3`;
        songAudio.play();
        playBar(url - 1);
    }
    else {
        url--;
        songAudio.src = `songs/${url}.mp3`;
        songAudio.play();
        playBar(url - 1);
    }
})
// This section used to go to the next song
next.addEventListener('click', (e) => {
    if (url == songs.length) {
        url = 1
        songAudio.src = `songs/${url}.mp3`;
        songAudio.play();
        playBar(url - 1);
    }
    else {
        url++;
        songAudio.src = `songs/${url}.mp3`;
        songAudio.play();
        playBar(url - 1);
    }
})
// here we are trying to loop and unloop the current song
document.getElementById('loop').addEventListener('click', (e) => {
    if (songAudio.loop == false) {
        songAudio.loop = true
        e.target.innerText = 'Unloop';
        e.target.style.color = 'grey';

    }
    else {
        songAudio.loop = false;
        e.target.innerText = 'Loop';
        e.target.style.color = 'white';
    }
})

// This function is used to show the current time of the song displayed near the seek bar
function timing() {
    let minute = 0;
    setInterval(() => {
        let seconds = parseInt(songAudio.currentTime);
        if (seconds >= 60) {

            seconds = parseInt((songAudio.currentTime) % 60);
        }
        let minute = parseInt((songAudio.currentTime) / 60);
        if (seconds / 10 >= 1) {
            document.getElementById('time').innerText = `0${minute}:${seconds}`;
        }
        else {
            document.getElementById('time').innerText = `0${minute}:0${seconds}`;
        }
    }, 1000)
}





let burger = document.getElementById('burger');
burger.addEventListener('click', () => {
    document.querySelector('.navigation').classList.toggle('v-not')
})

// This function is used to show image of the currently playing song
function logo() {
    Array.from(songlistPlay).forEach((element, index) => {
        if (url - 1 == index) {
            document.getElementById('info').src = `http://127.0.0.1:5500/covers/${url}.jpg`;
            document.getElementById('info').style.width = '60px';
            document.getElementById('info').style.borderRadius = '30px';
        }
    })
}


