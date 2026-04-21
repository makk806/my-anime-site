<script>
    const animeData = [
        {
            id: 'krd',
            title: 'КРД',
            icon: '⚔️',
            voice: 'AniLibria',
            img: 'https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTgxZGQtNTk5ZTgxZDU2ZDFlXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
            desc: 'Клинок, рассекающий демонов. Все сезоны и серии в топовой озвучке от Анилибрии. История о Тандзиро и его сестре Незуко.'
        },
        {
            id: 'onepiece',
            title: 'Ван Пис',
            icon: '👒',
            voice: '2x2',
            img: 'https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTMtMWNlMC00ZDA2LWEzYTAtY2YyYTM1N2I3NzAxXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
            desc: 'Пиратские приключения Луффи и его команды. Все серии в легендарной озвучке канала 2х2. Великое сокровище ждет!'
        },
        {
            id: 'aot',
            title: 'Атака Титанов',
            icon: '🛡️',
            voice: 'Популярная',
            img: 'https://m.media-amazon.com/images/M/MV5BNDFjYTIxMjctYTQ2ZC00YzQ4LWE3ZDEtZWFiZDA3N2EzZGQ5XkEyXkFqcGdeQXVyNzE5MTUyNjM@._V1_.jpg',
            desc: 'Вторжение гигантов и борьба человечества за выживание. Все сезоны в качественном дубляже. Эрен Йегер идет до конца.'
        },
        {
            id: 'jjk',
            title: 'Магическая Битва',
            icon: '🌀',
            voice: 'Популярная',
            img: 'https://m.media-amazon.com/images/M/MV5BMTMwMDM4N2EtOTJiYy00OTQ0LThlZDYtYWExN2IzMzExZDFlXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg',
            desc: 'Мир проклятий и магов. Юдзи Итадори и сильнейший маг Сатору Годзё. Все сезоны в отличной озвучке.'
        }
    ];

    function renderTabs() {
        const box = document.getElementById('tabsBox');
        box.innerHTML = ''; // Очищаем перед рендером
        animeData.forEach(anime => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            btn.innerHTML = `${anime.icon} ${anime.title}`;
            btn.onclick = () => loadAnime(anime.id, btn);
            box.appendChild(btn);
        });
        // Загружаем первое аниме (КРД) при старте
        if (animeData.length > 0) {
            loadAnime(animeData[0].id, document.querySelector('.tab-btn'));
        }
    }

    function loadAnime(id, btn) {
        // Убираем активный класс со всех кнопок
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        // Добавляем активный класс нажатой кнопке
        if(btn) btn.classList.add('active');

        const anime = animeData.find(a => a.id === id);
        const playerBlock = document.getElementById('playerBlock');

        playerBlock.innerHTML = `
            <div class="player-header">${anime.icon} Смотреть ${anime.title} — Озвучка ${anime.voice}</div>
            <div class="video-box">
                <div style="text-align:center">
                    <h2 style="color:#2ecc71; margin-bottom:10px;">ПЛЕЕР ГОТОВ К ПРОСМОТРУ</h2>
                    <p style="color:#555">Здесь будет видеопоток для ${anime.title}</p>
                    <button class="search-btn" style="background:#444">Сменить серию</button>
                </div>
            </div>
            <div class="anime-info-flex">
                <img src="${anime.img}" class="anime-round-img" onerror="this.src='https://via.placeholder.com/130'">
                <div>
                    <h3 style="margin:0; color:#2ecc71">${anime.title} — Полное описание</h3>
                    <p style="color:#aaa; line-height:1.4; margin-top:10px;">${anime.desc}</p>
                    <div style="margin-top:10px;">
                        <span style="background:#2ecc71; color:#000; padding:2px 8px; border-radius:4px; font-size:12px; font-weight:bold;">ОЗВУЧКА: ${anime.voice}</span>
                        <span style="background:#333; color:#fff; padding:2px 8px; border-radius:4px; font-size:12px; margin-left:10px;">HD 1080p</span>
                    </div>
                </div>
            </div>
        `;
    }

    function searchAnime() {
        const val = document.getElementById('searchInput').value.toLowerCase();
        const found = animeData.find(a => a.title.toLowerCase().includes(val));
        if(found) {
            const btns = document.querySelectorAll('.tab-btn');
            btns.forEach(b => {
                if(b.innerText.toLowerCase().includes(val)) {
                    loadAnime(found.id, b);
                }
            });
        } else {
            alert('Аниме "' + val + '" не найдено в нашей базе.');
        }
    }

    // Запуск сайта
    renderTabs();
	// Используем зеркало .biz, если .info заблокирован
const kodikMirror = "https://kodik.biz"; 

const data = [
    {
        name: "Клинок рассекающий демонов",
        // Формат ссылки: /serial/ID/HASH/720p
        path: "/serial/23479/f15629161a030999071c8901007e2c90/720p",
        img: "https://shikimori.one/system/animes/original/38000.jpg"
    },
    {
        name: "Атака Титанов",
        path: "/serial/329/037a342410714704383177659556d353/720p",
        img: "https://shikimori.one/system/animes/original/16498.jpg"
    }
];

function openPlayer(anime) {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('player-screen').style.display = 'block';
    
    const iframe = document.getElementById('v-iframe');
    // Собираем полную ссылку: зеркало + путь
    iframe.src = kodikMirror + anime.path + "?episode=1";
    
    // ... остальной код генерации кнопок серий
}
</script>