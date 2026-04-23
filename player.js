// player.js

const myAnimeLibrary = {
    // Теперь мы храним только ПУТЬ к папке с аниме
    "38000": { 
        "base": "https://phantom.host.cinemap.cc/b77eb95d9b7e4054acba6799b0c4c310:2026042223/animetvseries/c66621e93420ace21bafb1df111ff62f3ca754e6/"
    }
};

function startLocalVideo(animeId, seasonShiki, epNum) {
    const video = document.getElementById('main-player');
    const placeholder = document.getElementById('video-placeholder');
    const statusText = document.getElementById('placeholder-text');

    // Берем базовую ссылку для этого аниме
    const animeData = myAnimeLibrary[seasonShiki];

    if (animeData) {
        // Убираем заставку
        placeholder.style.display = 'none';
        video.style.display = 'block';

        // Собираем ссылку автоматически: БАЗА + НОМЕР + .mp4
        // ВНИМАНИЕ: Если на сайте ссылки идут как 1.mp4, 2.mp4, то это сработает!
        let videoUrl = `${animeData.base}${epNum}.mp4`;

        // Если хостинг использует странные имена, пробуем подставить 480.mp4 (как в твоей ссылке)
        // Но чаще всего работает формат "номер.mp4"
        if (epNum == 1) {
             videoUrl = `${animeData.base}480.mp4`; // Твоя первая рабочая ссылка
        }

        video.src = videoUrl;
        video.load();
        video.play().catch(e => console.log("Нажми Play вручную"));

        console.log(`Играет серия №${epNum}. Уровень (XP) растет!`);
    } else {
        placeholder.style.display = 'flex';
        video.style.display = 'none';
        statusText.innerText = `АНИМЕ С ID ${seasonShiki} НЕ НАЙДЕНО`;
    }
}