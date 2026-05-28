document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    if (!themeToggle || !themeIcon) {
        return; // Кнопка может отсутствовать на некоторых страницах, она и отсутствует :\
    }
    

    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    //контейнера для пикч
    const skyContainer = document.querySelector('.sky-l');
    const moonContainer = document.querySelector('.moon-l');
    const windowContainer = document.querySelector('.window-wrapper');
    
    if (skyContainer && moonContainer) {
        let daySky = skyContainer.querySelector('.sky-day');
        let daySun = moonContainer.querySelector('.sun');
        let dayWind = windowContainer.querySelector('.windD');
        
        if (!daySky) {
            daySky = document.createElement('img');
            daySky.src = '../images/sky-day.jpg';
            daySky.className = 'sky-day';
            daySky.alt = 'дневное небо';
            skyContainer.appendChild(daySky);
            daySky.style.width='300%';
            daySky.style.height='100%';
            daySky.style.objectFit='cover';
        }
        
        if (!daySun) {
            daySun = document.createElement('img');
            daySun.src = '../images/sun.png';
            daySun.className = 'moon day';
            daySun.alt = 'солнце';
            daySun.style.position = 'absolute';
            daySun.style.top = '-30%';
            daySun.style.right = '20%';
            daySun.style.width = '90%';
            daySun.style.height = 'auto';
            daySun.style.objectFit = 'contain';
            daySun.style.dropShadow='5px 5px 10px rgba(255, 255, 247, 0.65)'
            moonContainer.appendChild(daySun);
        }

        if (!dayWind) {
            dayWind = document.createElement('img');
            dayWind.src = '../images/window_day.png';
            dayWind.className = 'windows-day';
            dayWind.alt = 'оконная рама днём';
            dayWind.style.position = 'absolute';
            dayWind.style.width = '150%';
            dayWind.style.height = '100%';
            dayWind.style.top = '0%';
            dayWind.style.left = '-28%';
            dayWind.style.zIndex = '19';
            windowContainer.appendChild(dayWind);
        }
    }
    
    if (savedTheme === 'light') {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
    
    // клик на кнопку
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            applyDarkTheme();
            localStorage.setItem('theme', 'dark');
        } else {
            applyLightTheme();
            localStorage.setItem('theme', 'light');
        }
    });
    
    function applyLightTheme() {
        body.classList.add('light-theme');
        themeIcon.src = '../images/lightON.png';
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.className = 'stars body.light-theme';
        }
    }
    
    function applyDarkTheme() {
        body.classList.remove('light-theme');
        themeIcon.src = '../images/lightOFF.png';
    }
});