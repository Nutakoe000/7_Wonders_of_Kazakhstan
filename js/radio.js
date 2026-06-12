const tracks = [
    'audio/Ruth_Etting_-_Body_And_Soul.mp3', 
    'audio/Vera_Lynn_-_Well_Meet_Again_(mp3.pm).mp3',
    'audio/youre-never-fully-dressed-without-a-smile.mp3',
    'audio/Ruth_Etting_-_But_I_Do_You_Know_I_Do_(mp3.pm).mp3',
    'audio/Player_-_Baby_Come_Back_(mp3.pm).mp3', 
];

let currentTrack = 0;
let isPlaying = false;
let audio = new Audio();

function loadState() {
    const savedTrack = sessionStorage.getItem('currentTrack');
    const savedTime = sessionStorage.getItem('currentTime');
    const savedPlaying = sessionStorage.getItem('isPlaying');
    
    if (savedTrack !== null) {
        currentTrack = parseInt(savedTrack);
    }
    
    audio.src = tracks[currentTrack];
    
    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime);
    }
    
    if (savedPlaying === 'true') {
        isPlaying = true;

        audio.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
    }
}

function saveState() {
    sessionStorage.setItem('currentTrack', currentTrack);
    sessionStorage.setItem('currentTime', audio.currentTime);
    sessionStorage.setItem('isPlaying', isPlaying);
}

setInterval(saveState, 1000);

window.addEventListener('beforeunload', saveState);

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        const playBtn = document.querySelector('.radio-btn.play');
        if (playBtn) playBtn.classList.remove('playing');
    } else {
        audio.play().catch(err => {
            console.log('Play error:', err);
        });
        isPlaying = true;
        const playBtn = document.querySelector('.radio-btn.play');
        if (playBtn) playBtn.classList.add('playing');
    }
    saveState();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    audio.src = tracks[currentTrack];
    
    if (isPlaying) {
        audio.play().catch(err => {
            console.log('Play error:', err);
        });
    }
    
    // Анимка
    const nextBtn = document.querySelector('.radio-btn.muz-list');
    if (nextBtn) {
        nextBtn.classList.add('switching');
        setTimeout(() => {
            nextBtn.classList.remove('switching');
        }, 300);
    }
    
    saveState();
}

// Автоматическое переключение на следующий трек
audio.addEventListener('ended', () => {
    nextTrack();
});

function initializeRadioButtons() {
    const playBtn = document.querySelector('.radio-btn.play');
    const nextBtn = document.querySelector('.radio-btn.muz-list');
    
    if (playBtn) {
        const newPlayBtn = playBtn.cloneNode(true);
        playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
        newPlayBtn.addEventListener('click', togglePlay);
        
        if (isPlaying) {
            newPlayBtn.classList.add('playing');
        }
    }
    
    if (nextBtn) {
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', nextTrack);
    }
}

audio.volume = 0.5;

audio.preload = 'auto';

window.initializeRadioButtons = initializeRadioButtons;

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeRadioButtons();
});
