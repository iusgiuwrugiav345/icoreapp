const TEXT = {
    ru: {
        title: "IPA Store",
        tabs: { today: "Сегодня", games: "Игры", apps: "Приложения", search: "Поиск" },
        screens: {
            today: {
                kicker: "Избранное сегодня",
                title: "Сегодня",
                subtitle: "Крупные релизы, редакторские подборки и быстрые действия установки.",
                pill: "Подборка"
            },
            games: {
                kicker: "Топ чарты",
                title: "Игры",
                subtitle: "Аркады, приключения и большие релизы в формате App Store.",
                pill: "Игровой центр"
            },
            apps: {
                kicker: "Лучшие утилиты",
                title: "Приложения",
                subtitle: "Продуктивность, дизайн и creator tools с чистым UX.",
                pill: "Топ приложений"
            },
            search: {
                kicker: "Найти быстро",
                title: "Поиск",
                subtitle: "Ищи игры, приложения, студии и категории в одном месте.",
                pill: "Моментально"
            }
        },
        filters: {
            all: "Все", games: "Игры", apps: "Приложения", sports: "Спорт", arcade: "Аркады",
            adventure: "Приключения", casual: "Казуальные", puzzle: "Головоломки",
            productivity: "Продуктивность", design: "Дизайн", travel: "Путешествия",
            music: "Музыка", video: "Видео"
        },
        sections: {
            playingTodayTitle: "Во что сыграть сегодня",
            playingTodaySubtitle: "Подборка быстрых и цепляющих игр.",
            appsToKeepTitle: "Приложения на каждый день",
            appsToKeepSubtitle: "Практичные инструменты с аккуратным интерфейсом.",
            editorsTitle: "Выбор редакции",
            editorsSubtitle: "Сильный визуал и плавные сценарии.",
            topCharts: "Топ чарты",
            topChartsSubtitle: "Самые релевантные позиции в этом разделе.",
            moreExplore: "Еще посмотреть",
            moreExploreSubtitle: "Дополнительные карточки для установки и открытия.",
            startSearchTitle: "Начни с поиска",
            startSearchSubtitle: "Прыгай к играм, приложениям и жанрам в один тап.",
            popularNow: "Популярно сейчас",
            popularNowSubtitle: "Сильные совпадения по играм и приложениям.",
            noMatchesTitle: "Ничего не найдено",
            noMatchesText: "Попробуй другой запрос или фильтр.",
            resultsFor: (query) => `Результаты для "${query}"`,
            resultsCount: (count) => `${count} совпадений по каталогу.`,
            bestMatch: "Лучшее совпадение",
            featured: "Избранное",
            popular: "Популярное",
            featuredApp: "Рекомендуем",
            seeAll: "Смотреть все",
            preview: "Превью",
            moreLikeThis: "Похожее",
            related: "Тебе может понравиться",
            aboutGame: "Об этой игре",
            aboutApp: "Об этом приложении"
        },
        search: {
            clear: "Очистить",
            placeholders: {
                games: "Искать игры, жанры и студии",
                apps: "Искать приложения и инструменты",
                search: "Искать по всему каталогу"
            },
            trends: ["Спорт", "Дизайн", "Продуктивность", "Приключения", "Музыка", "Аркады"]
        },
        menu: {
            title: "Меню",
            privacy: "Политика конфиденциальности",
            language: "Язык",
            theme: "Тема",
            bright: "Яркая",
            dark: "Темная",
            support: "Поддержка",
            supportValue: "Поддержка в боте: @Helpicore_bot",
            policyTitle: "Политика конфиденциальности",
            policyIntro: "Это мини-приложение показывает каталог игр и приложений и хранит часть настроек только на твоем устройстве.",
            policyPoints: [
                "Язык интерфейса, тема и локальные состояния сохраняются в localStorage браузера.",
                "Мини-приложение не запрашивает лишние персональные данные сверх того, что уже доступно Telegram WebApp.",
                "Действия скачивания и открытия связаны с ботом и внешними источниками контента.",
                "Если тебе нужна помощь по данным или удалению локальных настроек, используй поддержку в боте."
            ]
        },
        actions: {
            get: "GET", open: "ОТКРЫТЬ", rating: "Рейтинг", size: "Размер",
            category: "Категория", type: "Тип", game: "Игра", app: "Приложение"
        }
    },
    en: {
        title: "IPA Store",
        tabs: { today: "Today", games: "Games", apps: "Apps", search: "Search" },
        screens: {
            today: {
                kicker: "Featured today",
                title: "Today",
                subtitle: "Big releases, editorial picks and quick install actions.",
                pill: "Curated"
            },
            games: {
                kicker: "Top charts",
                title: "Games",
                subtitle: "Arcade, adventure and headline releases with App Store feel.",
                pill: "Game Center"
            },
            apps: {
                kicker: "Best utilities",
                title: "Apps",
                subtitle: "Productivity, design and creator tools with clean UX.",
                pill: "Top Apps"
            },
            search: {
                kicker: "Find instantly",
                title: "Search",
                subtitle: "Search games, apps, studios and categories from one place.",
                pill: "Instant"
            }
        },
        filters: {
            all: "All", games: "Games", apps: "Apps", sports: "Sports", arcade: "Arcade",
            adventure: "Adventure", casual: "Casual", puzzle: "Puzzle",
            productivity: "Productivity", design: "Design", travel: "Travel",
            music: "Music", video: "Video"
        },
        sections: {
            playingTodayTitle: "Playing for today",
            playingTodaySubtitle: "Fast, sharp games worth opening now.",
            appsToKeepTitle: "Apps to keep",
            appsToKeepSubtitle: "Useful tools with polished interaction.",
            editorsTitle: "Editors' picks",
            editorsSubtitle: "Strong visuals and smoother flows.",
            topCharts: "Top Charts",
            topChartsSubtitle: "Most relevant picks for this section.",
            moreExplore: "More to explore",
            moreExploreSubtitle: "Additional titles you can open or install.",
            startSearchTitle: "Start with search",
            startSearchSubtitle: "Jump to games, apps and genres in one tap.",
            popularNow: "Popular now",
            popularNowSubtitle: "Strong matches across games and apps.",
            noMatchesTitle: "No matches found",
            noMatchesText: "Try a different keyword or filter.",
            resultsFor: (query) => `Results for "${query}"`,
            resultsCount: (count) => `${count} matches across the store.`,
            bestMatch: "Best match",
            featured: "Featured",
            popular: "Popular",
            featuredApp: "Featured app",
            seeAll: "See All",
            preview: "Preview",
            moreLikeThis: "More like this",
            related: "You may also like",
            aboutGame: "About this game",
            aboutApp: "About this app"
        },
        search: {
            clear: "Clear",
            placeholders: {
                games: "Search games, genres and studios",
                apps: "Search apps and tools",
                search: "Search the whole catalog"
            },
            trends: ["Sports", "Design", "Productivity", "Adventure", "Music", "Arcade"]
        },
        menu: {
            title: "Menu",
            privacy: "Privacy Policy",
            language: "Language",
            theme: "Theme",
            bright: "Bright",
            dark: "Dark",
            support: "Support",
            supportValue: "Bot support: @Helpicore_bot",
            policyTitle: "Privacy Policy",
            policyIntro: "This mini app shows a catalog of games and apps and keeps a few preferences only on your device.",
            policyPoints: [
                "Language, theme and a few local interface states are stored in browser localStorage.",
                "The mini app does not request extra personal data beyond what Telegram WebApp already provides.",
                "Download and open actions are connected with the bot or external content sources.",
                "If you need help with data or clearing local settings, contact support in the bot."
            ]
        },
        actions: {
            get: "GET", open: "OPEN", rating: "Rating", size: "Size",
            category: "Category", type: "Type", game: "Game", app: "App"
        }
    }
};

const ITEMS = [
    { id: "fc26", name: "EA FC 26", type: "game", category: "sports", developer: "EA SPORTS", size: "1.8 GB", rating: "4.8", icon: "FC", tags: ["sports", "competitive", "action"], gradient: ["#0d111f", "#8e2de2", "#14d2b8"], featured: true, copy: { en: { note: "Top release", blurb: "Console-like football matches with Ultimate Team and Career seasons.", screenshots: ["Ultimate Team", "Career Hub", "Match Day"] }, ru: { note: "Главный релиз", blurb: "Футбольные матчи в консольном стиле с Ultimate Team и карьерными сезонами.", screenshots: ["Ultimate Team", "Центр карьеры", "День матча"] } } },
    { id: "roblox", name: "Roblox", type: "game", category: "arcade", developer: "Roblox Corporation", size: "1.2 GB", rating: "4.7", icon: "RB", tags: ["arcade", "casual", "adventure"], gradient: ["#1d4ed8", "#36c6ff", "#79ffe1"], copy: { en: { note: "Hit game", blurb: "Millions of user worlds, social play and quick drop-in sessions.", screenshots: ["Party Worlds", "Build Mode", "Voice Rooms"] }, ru: { note: "Хит", blurb: "Миллионы пользовательских миров, социальный геймплей и быстрые сессии.", screenshots: ["Миры вечеринок", "Режим строительства", "Голосовые комнаты"] } } },
    { id: "minecraft", name: "Minecraft", type: "game", category: "adventure", developer: "Mojang", size: "152 MB", rating: "4.9", icon: "MC", tags: ["adventure", "arcade", "creative"], gradient: ["#2d5d24", "#48a43b", "#ceb46f"], copy: { en: { note: "Editor's choice", blurb: "Build, survive and explore infinite blocky worlds with friends.", screenshots: ["Creative Realm", "Village Life", "Nether Run"] }, ru: { note: "Выбор редакции", blurb: "Строй, выживай и исследуй бесконечные блочные миры вместе с друзьями.", screenshots: ["Творческий мир", "Жизнь деревни", "Забег в Нижнем мире"] } } },
    { id: "geometry", name: "Geometry Dash", type: "game", category: "puzzle", developer: "RobTop", size: "214 MB", rating: "4.6", icon: "GD", tags: ["puzzle", "arcade", "casual"], gradient: ["#f59e0b", "#ef4444", "#7c3aed"], copy: { en: { note: "Fast paced", blurb: "Rhythm platforming with sharp timing, bright effects and hard levels.", screenshots: ["Stereo Madness", "Practice Run", "Custom Levels"] }, ru: { note: "Быстрый темп", blurb: "Ритм-платформер с точными таймингами, яркими эффектами и сложными уровнями.", screenshots: ["Stereo Madness", "Тренировка", "Пользовательские уровни"] } } },
    { id: "stardew", name: "Stardew Valley", type: "game", category: "casual", developer: "ConcernedApe", size: "430 MB", rating: "4.9", icon: "SV", tags: ["casual", "adventure", "puzzle"], gradient: ["#114c7a", "#2aa0ff", "#ffd166"], copy: { en: { note: "Cozy favorite", blurb: "Relaxed farming, cozy progression and offline-friendly sessions.", screenshots: ["Farm Build", "Town Events", "Cave Trips"] }, ru: { note: "Уютный фаворит", blurb: "Спокойная ферма, уютная прогрессия и комфортные офлайн-сессии.", screenshots: ["Развитие фермы", "События города", "Походы в пещеры"] } } },
    { id: "notion", name: "Notion", type: "app", category: "productivity", developer: "Notion Labs", size: "96 MB", rating: "4.8", icon: "NO", tags: ["productivity", "writing", "work"], gradient: ["#111827", "#2d3748", "#8ea5c6"], featured: true, copy: { en: { note: "Essential app", blurb: "Notes, docs and lightweight project planning in one clean workspace.", screenshots: ["Daily Notes", "Task Boards", "Team Wiki"] }, ru: { note: "Нужное приложение", blurb: "Заметки, документы и легкое управление проектами в одном аккуратном пространстве.", screenshots: ["Ежедневные заметки", "Доски задач", "Командная вики"] } } },
    { id: "procreate", name: "Procreate", type: "app", category: "design", developer: "Savage Interactive", size: "364 MB", rating: "4.9", icon: "PR", tags: ["design", "creative", "drawing"], gradient: ["#111827", "#ff4d6d", "#f59e0b"], copy: { en: { note: "Premium pick", blurb: "Premium sketching studio with responsive brushes and rich layers.", screenshots: ["Brush Library", "Canvas View", "Color Studio"] }, ru: { note: "Премиум выбор", blurb: "Премиальная студия рисования с отзывчивыми кистями и богатыми слоями.", screenshots: ["Библиотека кистей", "Холст", "Студия цвета"] } } },
    { id: "maps", name: "Maps", type: "app", category: "travel", developer: "Apple", size: "15 MB", rating: "4.5", icon: "MP", tags: ["travel", "utility", "maps"], gradient: ["#f7f7f7", "#facc15", "#ef4444"], copy: { en: { note: "Ready to go", blurb: "Navigation, city guides and clean route planning on the move.", screenshots: ["City Guide", "Live Route", "Saved Places"] }, ru: { note: "Готово к дороге", blurb: "Навигация, гиды по городу и чистое построение маршрутов на ходу.", screenshots: ["Гид по городу", "Маршрут", "Сохраненные места"] } } },
    { id: "spotify", name: "Spotify", type: "app", category: "music", developer: "Spotify", size: "182 MB", rating: "4.7", icon: "SP", tags: ["music", "social", "audio"], gradient: ["#052e16", "#16a34a", "#4ade80"], copy: { en: { note: "Popular now", blurb: "Playlists, podcasts and collaborative queues with polished discovery.", screenshots: ["Mixes", "Podcasts", "Shared Queue"] }, ru: { note: "Популярно сейчас", blurb: "Плейлисты, подкасты и совместные очереди с приятным поиском музыки.", screenshots: ["Миксы", "Подкасты", "Общая очередь"] } } },
    { id: "capcut", name: "CapCut", type: "app", category: "video", developer: "Bytedance", size: "314 MB", rating: "4.8", icon: "CC", tags: ["video", "creative", "design"], gradient: ["#0f172a", "#334155", "#a5f3fc"], copy: { en: { note: "Creator tool", blurb: "Quick short-form editing with effects, captions and export presets.", screenshots: ["Timeline Edit", "Auto Captions", "Templates"] }, ru: { note: "Инструмент автора", blurb: "Быстрый монтаж коротких видео с эффектами, титрами и готовыми экспортами.", screenshots: ["Монтажная лента", "Авто-субтитры", "Шаблоны"] } } }
];

const TODAY_SECTIONS = [
    { titleKey: "playingTodayTitle", subtitleKey: "playingTodaySubtitle", ids: ["roblox", "minecraft", "geometry"], jump: "games" },
    { titleKey: "appsToKeepTitle", subtitleKey: "appsToKeepSubtitle", ids: ["notion", "maps", "spotify"], jump: "apps" },
    { titleKey: "editorsTitle", subtitleKey: "editorsSubtitle", ids: ["procreate", "capcut", "stardew"], jump: "search" }
];

const SCREEN_FILTERS = {
    games: ["all", "sports", "arcade", "adventure", "casual", "puzzle"],
    apps: ["all", "productivity", "design", "travel", "music", "video"],
    search: ["all", "games", "apps", "sports", "productivity", "design"]
};

const STORAGE_KEYS = { lang: "ipa_store_lang", theme: "ipa_store_theme" };

const state = {
    screen: "today",
    query: "",
    lang: localStorage.getItem(STORAGE_KEYS.lang) || "ru",
    theme: localStorage.getItem(STORAGE_KEYS.theme) || "dark",
    filters: { games: "all", apps: "all", search: "all" },
    installed: new Set(["maps"]),
    selectedId: null,
    policyOpen: false
};

const elements = {
    timeBadge: document.getElementById("timeBadge"),
    menuButton: document.getElementById("menuButton"),
    menuScrim: document.getElementById("menuScrim"),
    sideMenu: document.getElementById("sideMenu"),
    menuClose: document.getElementById("menuClose"),
    menuTitle: document.getElementById("menuTitle"),
    policyToggle: document.getElementById("policyToggle"),
    policyButtonLabel: document.getElementById("policyButtonLabel"),
    policyPanel: document.getElementById("policyPanel"),
    policyTitle: document.getElementById("policyTitle"),
    policyBody: document.getElementById("policyBody"),
    languageLabel: document.getElementById("languageLabel"),
    themeLabel: document.getElementById("themeLabel"),
    supportLabel: document.getElementById("supportLabel"),
    supportValue: document.getElementById("supportValue"),
    themeBright: document.getElementById("themeBright"),
    themeDark: document.getElementById("themeDark"),
    headerKicker: document.getElementById("headerKicker"),
    screenTitle: document.getElementById("screenTitle"),
    headerPill: document.getElementById("headerPill"),
    screenSubtitle: document.getElementById("screenSubtitle"),
    searchShell: document.getElementById("searchShell"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    filterShell: document.getElementById("filterShell"),
    filterTrack: document.getElementById("filterTrack"),
    heroRail: document.getElementById("heroRail"),
    sectionStack: document.getElementById("sectionStack"),
    emptyState: document.getElementById("emptyState"),
    emptyTitle: document.getElementById("emptyTitle"),
    emptyText: document.getElementById("emptyText"),
    bottomBar: document.getElementById("bottomBar"),
    tabToday: document.getElementById("tabToday"),
    tabGames: document.getElementById("tabGames"),
    tabApps: document.getElementById("tabApps"),
    tabSearch: document.getElementById("tabSearch"),
    sheetScrim: document.getElementById("sheetScrim"),
    detailSheet: document.getElementById("detailSheet"),
    detailContent: document.getElementById("detailContent"),
    sheetClose: document.getElementById("sheetClose"),
    sakuraLayer: document.getElementById("sakuraLayer")
};

function locale() { return TEXT[state.lang]; }
function itemById(id) { return ITEMS.find((item) => item.id === id); }

function itemView(item) {
    const copy = item.copy[state.lang];
    return { ...item, note: copy.note, blurb: copy.blurb, screenshots: copy.screenshots, categoryLabel: locale().filters[item.category] || item.category };
}

function updateTime() {
    elements.timeBadge.textContent = new Date().toLocaleTimeString(state.lang === "ru" ? "ru-RU" : "en-US", { hour: "2-digit", minute: "2-digit" });
}

function getCurrentFilter() { return state.filters[state.screen] || "all"; }
function setCurrentFilter(value) { state.filters[state.screen] = value; }
function installLabel(id) { return state.installed.has(id) ? locale().actions.open : locale().actions.get; }
function installClass(id) { return state.installed.has(id) ? " is-open" : ""; }
function iconStyle(item) { return `--icon-a:${item.gradient[0]};--icon-b:${item.gradient[1]};--icon-c:${item.gradient[2]};`; }
function heroStyle(item) { return `--hero-a:${item.gradient[0]};--hero-b:${item.gradient[1]};--hero-c:${item.gradient[2]};`; }

function matchesQuery(item, query) {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    const haystack = [
        item.name, item.developer, item.category, ...item.tags,
        item.copy.en.note, item.copy.en.blurb, item.copy.ru.note, item.copy.ru.blurb,
        TEXT.en.filters[item.category] || "", TEXT.ru.filters[item.category] || ""
    ].join(" ").toLowerCase();
    return haystack.includes(q);
}

function matchesFilter(item, filter) {
    if (!filter || filter === "all") return true;
    if (filter === "games") return item.type === "game";
    if (filter === "apps") return item.type === "app";
    return item.category === filter || item.tags.includes(filter);
}

function getBrowseItems(type) {
    return ITEMS.filter((item) => item.type === type.slice(0, -1)).filter((item) => matchesFilter(item, getCurrentFilter())).filter((item) => matchesQuery(item, state.query));
}

function getSearchItems() {
    return ITEMS.filter((item) => matchesFilter(item, getCurrentFilter())).filter((item) => matchesQuery(item, state.query));
}

function renderStaticUi() {
    const copy = locale();
    document.documentElement.lang = state.lang;
    document.title = copy.title;
    elements.tabToday.textContent = copy.tabs.today;
    elements.tabGames.textContent = copy.tabs.games;
    elements.tabApps.textContent = copy.tabs.apps;
    elements.tabSearch.textContent = copy.tabs.search;
    elements.emptyTitle.textContent = copy.sections.noMatchesTitle;
    elements.emptyText.textContent = copy.sections.noMatchesText;
    elements.searchClear.textContent = copy.search.clear;
    elements.menuTitle.textContent = copy.menu.title;
    elements.policyButtonLabel.textContent = copy.menu.privacy;
    elements.policyTitle.textContent = copy.menu.policyTitle;
    elements.languageLabel.textContent = copy.menu.language;
    elements.themeLabel.textContent = copy.menu.theme;
    elements.themeBright.textContent = copy.menu.bright;
    elements.themeDark.textContent = copy.menu.dark;
    elements.supportLabel.textContent = copy.menu.support;
    elements.supportValue.textContent = copy.menu.supportValue;
    renderPolicy();
    renderSwitches();
}

function renderPolicy() {
    const copy = locale().menu;
    elements.policyBody.innerHTML = `<p>${copy.policyIntro}</p><ul class="policy-list">${copy.policyPoints.map((point) => `<li>${point}</li>`).join("")}</ul>`;
}

function renderSwitches() {
    document.querySelectorAll("[data-role='lang']").forEach((button) => button.classList.toggle("active", button.dataset.lang === state.lang));
    document.querySelectorAll("[data-role='theme']").forEach((button) => button.classList.toggle("active", button.dataset.theme === state.theme));
}

function renderFilterChips() {
    const chips = SCREEN_FILTERS[state.screen] || [];
    if (!chips.length) {
        elements.filterShell.hidden = true;
        elements.filterTrack.innerHTML = "";
        return;
    }
    elements.filterShell.hidden = false;
    elements.filterTrack.innerHTML = chips.map((value) => `<button class="filter-chip${value === getCurrentFilter() ? " active" : ""}" type="button" data-role="filter" data-filter="${value}">${locale().filters[value]}</button>`).join("");
}

function renderHeroCard(item, label) {
    const view = itemView(item);
    return `<article class="hero-card" style="${heroStyle(item)}" data-role="detail" data-id="${item.id}"><div class="hero-card-inner"><div class="hero-label">${label}</div><div class="hero-art">${view.note}</div><div class="hero-footer"><div class="hero-icon" style="${iconStyle(item)}">${item.icon}</div><div class="hero-copy"><div class="hero-title">${item.name}</div><div class="hero-meta">${view.categoryLabel} - ${item.size} - ${item.developer}</div></div><button class="get-button glass${installClass(item.id)}" type="button" data-role="install" data-id="${item.id}">${installLabel(item.id)}</button></div></div></article>`;
}

function renderAppRow(item, index, options = {}) {
    const view = itemView(item);
    const rank = options.showRank ? `<div class="row-rank">${index + 1}</div>` : "";
    const caption = options.caption || `<div class="app-caption">${view.blurb}</div>`;
    return `<article class="app-row" data-role="detail" data-id="${item.id}">${rank}<div class="app-icon" style="${iconStyle(item)}">${item.icon}</div><div class="app-copy"><div class="app-title">${item.name}</div><div class="app-meta">${view.categoryLabel} - ${item.size} - ${item.developer}</div>${caption}</div><div class="app-actions"><button class="get-button${installClass(item.id)}" type="button" data-role="install" data-id="${item.id}">${installLabel(item.id)}</button><div class="app-note">${view.note}</div></div></article>`;
}

function renderSectionCard(title, subtitle, items, options = {}) {
    return `<section class="section-card"><div class="section-header"><div><h2>${title}</h2><p>${subtitle}</p></div>${options.jump ? `<button class="section-link" type="button" data-role="jump" data-screen-target="${options.jump}">${locale().sections.seeAll}</button>` : ""}</div><div class="app-list">${items.map((item, index) => renderAppRow(item, index, options)).join("")}</div></section>`;
}

function renderSearchStarter() {
    const copy = locale();
    return `<section class="section-card section-card-accent"><div class="section-header"><div><h2>${copy.sections.startSearchTitle}</h2><p>${copy.sections.startSearchSubtitle}</p></div></div><div class="trend-cloud">${copy.search.trends.map((trend) => `<button class="trend-chip" type="button" data-role="query" data-query="${trend}">${trend}</button>`).join("")}</div></section>`;
}

function renderTodayScreen() {
    const copy = locale();
    const heroItems = ITEMS.filter((item) => item.featured);
    elements.heroRail.innerHTML = `<div class="hero-scroller">${heroItems.map((item, index) => renderHeroCard(item, index === 0 ? copy.sections.bestMatch : copy.sections.featuredApp)).join("")}</div>`;
    elements.sectionStack.innerHTML = TODAY_SECTIONS.map((section) => {
        const sectionItems = section.ids.map(itemById).filter(Boolean);
        return renderSectionCard(copy.sections[section.titleKey], copy.sections[section.subtitleKey], sectionItems, { jump: section.jump });
    }).join("");
    elements.emptyState.hidden = true;
}

function renderBrowseScreen(type) {
    const copy = locale();
    const items = getBrowseItems(type);
    const topItems = items.slice(0, 2);
    const listItems = items.slice(0, 8);
    elements.heroRail.innerHTML = topItems.length ? `<div class="hero-scroller">${topItems.map((item, index) => renderHeroCard(item, index === 0 ? copy.sections.featured : copy.sections.popular)).join("")}</div>` : "";
    elements.sectionStack.innerHTML = listItems.length ? [
        renderSectionCard(copy.sections.topCharts, copy.sections.topChartsSubtitle, listItems.slice(0, 4), { showRank: true }),
        listItems.length > 4 ? renderSectionCard(copy.sections.moreExplore, copy.sections.moreExploreSubtitle, listItems.slice(4), {}) : ""
    ].join("") : "";
    elements.emptyState.hidden = listItems.length > 0;
}

function renderSearchScreen() {
    const copy = locale();
    const items = getSearchItems();
    const hasQuery = state.query.trim().length > 0;
    if (!hasQuery) {
        elements.heroRail.innerHTML = `<div class="hero-scroller">${renderHeroCard(itemById("fc26"), copy.sections.bestMatch)}</div>`;
        elements.sectionStack.innerHTML = [renderSearchStarter(), renderSectionCard(copy.sections.popularNow, copy.sections.popularNowSubtitle, ITEMS.slice(0, 5), {})].join("");
        elements.emptyState.hidden = true;
        return;
    }
    elements.heroRail.innerHTML = items[0] ? `<div class="hero-scroller">${renderHeroCard(items[0], copy.sections.bestMatch)}</div>` : "";
    elements.sectionStack.innerHTML = items.length ? renderSectionCard(copy.sections.resultsFor(state.query), copy.sections.resultsCount(items.length), items, {}) : "";
    elements.emptyState.hidden = items.length > 0;
}

function renderHeader() {
    const copy = locale().screens[state.screen];
    elements.headerKicker.textContent = copy.kicker;
    elements.screenTitle.textContent = copy.title;
    elements.screenSubtitle.textContent = copy.subtitle;
    if (state.screen === "games") {
        elements.headerPill.textContent = `${getBrowseItems("games").length}`;
    } else if (state.screen === "apps") {
        elements.headerPill.textContent = `${getBrowseItems("apps").length}`;
    } else if (state.screen === "search" && state.query.trim()) {
        elements.headerPill.textContent = `${getSearchItems().length}`;
    } else {
        elements.headerPill.textContent = copy.pill;
    }
}

function renderSearchBar() {
    const showSearch = state.screen !== "today";
    elements.searchShell.hidden = !showSearch;
    if (!showSearch) return;
    elements.searchInput.placeholder = locale().search.placeholders[state.screen];
    elements.searchInput.value = state.query;
}

function renderBottomBar() {
    elements.bottomBar.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.screen === state.screen);
    });
}

function renderDetail(item) {
    const copy = locale();
    const view = itemView(item);
    const related = ITEMS.filter((candidate) => candidate.id !== item.id).filter((candidate) => candidate.type === item.type || candidate.category === item.category).slice(0, 3);
    elements.detailContent.innerHTML = `
        <div class="detail-banner" style="${heroStyle(item)}">
            <div class="detail-banner-copy">
                <div class="detail-kicker">${view.note}</div>
                <h2>${item.name}</h2>
                <p>${view.blurb}</p>
            </div>
        </div>
        <div class="detail-head">
            <div class="detail-icon" style="${iconStyle(item)}">${item.icon}</div>
            <div class="detail-meta">
                <h3>${item.name}</h3>
                <p>${view.categoryLabel} - ${item.developer}</p>
                <span>${item.rating} ${copy.actions.rating.toLowerCase()}</span>
            </div>
            <button class="get-button large${installClass(item.id)}" type="button" data-role="install" data-id="${item.id}">${installLabel(item.id)}</button>
        </div>
        <div class="stats-grid">
            <div class="stat-card"><strong>${item.rating}</strong><span>${copy.actions.rating}</span></div>
            <div class="stat-card"><strong>${item.size}</strong><span>${copy.actions.size}</span></div>
            <div class="stat-card"><strong>${view.categoryLabel}</strong><span>${copy.actions.category}</span></div>
            <div class="stat-card"><strong>${item.type === "game" ? copy.actions.game : copy.actions.app}</strong><span>${copy.actions.type}</span></div>
        </div>
        <section class="detail-section">
            <div class="detail-section-head">
                <h4>${copy.sections.preview}</h4>
                <button class="section-link" type="button" data-role="query" data-query="${view.categoryLabel}">${copy.sections.moreLikeThis}</button>
            </div>
            <div class="shot-rail">
                ${view.screenshots.map((shot, index) => `<div class="shot-card" style="${heroStyle(item)}"><span>${index + 1}</span><strong>${shot}</strong></div>`).join("")}
            </div>
        </section>
        <section class="detail-section">
            <div class="detail-section-head">
                <h4>${item.type === "game" ? copy.sections.aboutGame : copy.sections.aboutApp}</h4>
            </div>
            <p class="detail-description">${view.blurb}</p>
        </section>
        <section class="detail-section">
            <div class="detail-section-head">
                <h4>${copy.sections.related}</h4>
            </div>
            <div class="detail-related">
                ${related.map((relatedItem, index) => {
                    const relatedView = itemView(relatedItem);
                    return renderAppRow(relatedItem, index, { caption: `<div class="app-caption">${relatedView.categoryLabel} - ${relatedItem.rating} ${copy.actions.rating.toLowerCase()}</div>` });
                }).join("")}
            </div>
        </section>
    `;
}

function openDetail(id) {
    const item = itemById(id);
    if (!item) return;
    state.selectedId = id;
    renderDetail(item);
    closeMenu();
    document.body.classList.add("sheet-open");
    elements.sheetScrim.hidden = false;
    elements.detailSheet.setAttribute("aria-hidden", "false");
}

function closeDetail() {
    state.selectedId = null;
    document.body.classList.remove("sheet-open");
    elements.sheetScrim.hidden = true;
    elements.detailSheet.setAttribute("aria-hidden", "true");
}

function openMenu() {
    closeDetail();
    document.body.classList.add("menu-open");
    elements.menuScrim.hidden = false;
    elements.sideMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
    document.body.classList.remove("menu-open");
    elements.menuScrim.hidden = true;
    elements.sideMenu.setAttribute("aria-hidden", "true");
}

function togglePolicy() {
    state.policyOpen = !state.policyOpen;
    elements.policyPanel.hidden = !state.policyOpen;
}

function applyTheme() {
    document.body.dataset.theme = state.theme;
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
}

function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem(STORAGE_KEYS.lang, lang);
    updateTime();
    render();
}

function setTheme(theme) {
    state.theme = theme;
    applyTheme();
    renderSwitches();
}

function setScreen(screen) {
    state.screen = screen;
    if (screen === "today") state.query = "";
    render();
    if (screen === "search") {
        window.setTimeout(() => elements.searchInput.focus(), 60);
    }
}

function installOrOpen(id) {
    if (state.installed.has(id)) {
        openDetail(id);
        return;
    }
    state.installed.add(id);
    render();
    if (state.selectedId === id) {
        openDetail(id);
    }
}

function onContentClick(event) {
    const installButton = event.target.closest("[data-role='install']");
    if (installButton) {
        installOrOpen(installButton.dataset.id);
        return;
    }
    const jumpButton = event.target.closest("[data-role='jump']");
    if (jumpButton) {
        setScreen(jumpButton.dataset.screenTarget);
        return;
    }
    const queryButton = event.target.closest("[data-role='query']");
    if (queryButton) {
        state.screen = "search";
        state.query = queryButton.dataset.query || "";
        setCurrentFilter("all");
        closeDetail();
        render();
        window.setTimeout(() => {
            elements.searchInput.focus();
            elements.searchInput.setSelectionRange(elements.searchInput.value.length, elements.searchInput.value.length);
        }, 60);
        return;
    }
    const detailTarget = event.target.closest("[data-role='detail']");
    if (detailTarget) {
        openDetail(detailTarget.dataset.id);
    }
}

function renderMenuState() {
    elements.policyPanel.hidden = !state.policyOpen;
}

function render() {
    renderStaticUi();
    renderHeader();
    renderSearchBar();
    renderFilterChips();
    renderBottomBar();
    renderMenuState();
    if (state.screen === "today") {
        renderTodayScreen();
    } else if (state.screen === "games") {
        renderBrowseScreen("games");
    } else if (state.screen === "apps") {
        renderBrowseScreen("apps");
    } else {
        renderSearchScreen();
    }
}

function spawnPetal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!elements.sakuraLayer || elements.sakuraLayer.childElementCount > 14) return;
    const petal = document.createElement("span");
    petal.className = "sakura-petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--drift", `${(Math.random() * 120) - 60}px`);
    petal.style.setProperty("--duration", `${8 + Math.random() * 6}s`);
    petal.style.setProperty("--scale", `${0.65 + Math.random() * 0.8}`);
    petal.style.setProperty("--delay", `${Math.random() * 2}s`);
    elements.sakuraLayer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
}

function startSakura() {
    for (let i = 0; i < 6; i += 1) {
        window.setTimeout(spawnPetal, i * 700);
    }
    window.setInterval(spawnPetal, 1600);
}

document.getElementById("langControl").addEventListener("click", (event) => {
    const button = event.target.closest("[data-role='lang']");
    if (!button) return;
    setLanguage(button.dataset.lang);
});

document.getElementById("themeControl").addEventListener("click", (event) => {
    const button = event.target.closest("[data-role='theme']");
    if (!button) return;
    setTheme(button.dataset.theme);
});

elements.menuButton.addEventListener("click", openMenu);
elements.menuClose.addEventListener("click", closeMenu);
elements.menuScrim.addEventListener("click", closeMenu);
elements.policyToggle.addEventListener("click", togglePolicy);

elements.filterTrack.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-role='filter']");
    if (!chip) return;
    const nextFilter = chip.dataset.filter || "all";
    setCurrentFilter(getCurrentFilter() === nextFilter && nextFilter !== "all" ? "all" : nextFilter);
    render();
});

elements.bottomBar.addEventListener("click", (event) => {
    const button = event.target.closest(".tab-button");
    if (!button) return;
    closeMenu();
    closeDetail();
    setScreen(button.dataset.screen);
});

elements.searchInput.addEventListener("input", () => {
    state.query = elements.searchInput.value;
    render();
});

elements.searchClear.addEventListener("click", () => {
    state.query = "";
    elements.searchInput.value = "";
    render();
    elements.searchInput.focus();
});

elements.heroRail.addEventListener("click", onContentClick);
elements.sectionStack.addEventListener("click", onContentClick);
elements.detailContent.addEventListener("click", onContentClick);
elements.sheetScrim.addEventListener("click", closeDetail);
elements.sheetClose.addEventListener("click", closeDetail);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDetail();
        closeMenu();
    }
});

applyTheme();
updateTime();
window.setInterval(updateTime, 60000);
render();
startSakura();
