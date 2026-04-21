const data = [
        {
            id: "krd",
            name: "Клинок рассекающий демонов",
            shikiId: "38000",
            img: "https://shikimori.one/system/animes/original/38000.jpg",
            seasons: [
                { title: "Сезон 1", id: "38000", eps: 26 },
                { title: "Поезд", id: "49926", eps: 7 },
                { title: "Квартал", id: "47778", eps: 11 },
                { title: "Деревня", id: "51019", eps: 11 }
            ]
        },
        {
            id: "onepiece",
            name: "Ван Пис",
            shikiId: "21",
            img: "https://shikimori.one/system/animes/original/21.jpg",
            seasons: [{ title: "Весь сериал", id: "21", eps: 1115 }]
        },
        {
            id: "titans",
            name: "Атака Титанов",
            shikiId: "16498",
            img: "https://shikimori.one/system/animes/original/16498.jpg",
            seasons: [
                { title: "Сезон 1", id: "16498", eps: 25 },
                { title: "Сезон 2", id: "33255", eps: 12 },
                { title: "Сезон 3", id: "35760", eps: 12 },
                { title: "Сезон 3 ч.2", id: "38524", eps: 10 },
                { title: "Финал", id: "40028", eps: 16 }
            ]
        },
        {
            id: "magic",
            name: "Магическая Битва",
            shikiId: "40748",
            img: "https://shikimori.one/system/animes/original/40748.jpg",
            seasons: [
                { title: "Сезон 1", id: "40748", eps: 24 },
                { title: "Сезон 2", id: "51009", eps: 23 }
            ]
        }
    ];

    const listDiv = document.getElementById('list');
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" onerror="this.src='https://moe.shikimori.one/system/animes/original/${item.shikiId}.jpg'">
            <div class="card-info">${item.name}</div>
        `;
        card.onclick = () => openPlayer(item);
        listDiv.appendChild(card);
    });

    function openPlayer(anime) {
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('player-screen').style.display = 'block';
        document.getElementById('anime-title').innerText = anime.name;
        
        const tabsDiv = document.getElementById('season-tabs');
        tabsDiv.innerHTML = '';
        
        anime.seasons.forEach((s, idx) => {
            const tab = document.createElement('div');
            tab.className = 'season-tab' + (idx === 0 ? ' active' : '');
            tab.innerText = s.title;
            tab.onclick = () => {
                document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                loadSeason(anime.id, s);
            };
            tabsDiv.appendChild(tab);
        });
        loadSeason(anime.id, anime.seasons[0]);
    }

    function loadSeason(animeId, season) {
        const epDiv = document.getElementById('ep-list');
        const iframe = document.getElementById('v-iframe');
        const storageKey = `progress_${animeId}_${season.id}`;
        let watched = JSON.parse(localStorage.getItem(storageKey)) || [];

        // ИСПОЛЬЗУЕМ СТАБИЛЬНЫЙ АГРЕГАТОР (БЕЗ static.domains)
        iframe.src = `https://2642236528.vibe-api.cc/anime/${season.id}?episode=1`;

        epDiv.innerHTML = '';
        for(let i = 1; i <= season.eps; i++) {
            const btn = document.createElement('div');
            btn.className = 'ep-btn';
            if(watched.includes(i)) btn.classList.add('watched');
            btn.innerText = i;
            
            btn.onclick = () => {
                iframe.src = `https://2642236528.vibe-api.cc/anime/${season.id}?episode=${i}`;
                if(!watched.includes(i)) {
                    watched.push(i);
                    localStorage.setItem(storageKey, JSON.stringify(watched));
                }
                document.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                btn.classList.add('watched');
                updateXP();
            };
            epDiv.appendChild(btn);
        }
        updateXP();
    }

    function updateXP() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('progress_')) {
                total += JSON.parse(localStorage.getItem(key)).length;
            }
        }
        document.getElementById('user-level').innerText = `Твой уровень: ${total} XP`;
    }
    updateXP();
