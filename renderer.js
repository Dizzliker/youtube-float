// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// ipc - сервис для передачи событий приложения
const ipc = require('electron').ipcRenderer;
const container = document.querySelector('#root');
const menu = container.querySelector('.menu');
const iframe = document.querySelector('#iframe');
// Кнопки меню
const btnClose = container.querySelector('.btn-close');
const btnFullscreen = container.querySelector('.btn-fullscreen');
const btnSubsctract = container.querySelector('.btn-substract');
// Индикатор, показывается ли сейчас фрейм видео
let fullscreen = false;

// Закрыть приложение
btnClose.addEventListener('click', () => ipc.send('close'));
// Полный экран
btnFullscreen.addEventListener('click', () => ipc.send('fullscreen'));
// Свернуть
btnSubsctract.addEventListener('click', () => ipc.send('minimize'));

changeFullscreen = () => {
    fullscreen = !fullscreen;
}
console.log('asfasf');
iframe.addEventListener('mouseenter', (e) => {
    // console.log(e.target.className == 'ytp-suggestion-link');
});

container.addEventListener('mouseenter', () => {
    if (fullscreen) {
        hideMenu(false);
    }
});

container.addEventListener('mouseleave', () => {
    if (fullscreen) {
        hideMenu(true);
    }
});

hideMenu = (hide) => {
    if (hide) {
        menu.classList.add('hide');
    } else {
        menu.classList.remove('hide');
    }
}

scrollMenuToTop = () => {
    menu.classList.add('top');
}

getVideoId = (text) => {
    const regexWatch = /https:\/\/www.youtube.com\/watch\?v=*/;
    const regexUrl = /https:\/\/youtu.be\/*/;
    if (text.match(regexWatch)) {
        return text.split('=')[1];
    } else if (text.match(regexUrl)) {
        return text.split('.be/')[1];
    }
    return 'Вставлена не ссылка';
}

onPasted = (e) => {
    setTimeout(() => {
        const text = e.value.trim();
        if (text) {
            const videoId = getVideoId(text);
            scrollMenuToTop();
            changeFullscreen();
            iframe.classList.remove('hide');
            iframe.src = `https://www.youtube.com/embed/${videoId}?rel=`;
        }
    }, 0)
}