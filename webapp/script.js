const ITEMS = [
    {
        id: "fc26",
        name: "EA FC 26",
        type: "game",
        category: "Sports",
        developer: "EA SPORTS",
        size: "1.8 GB",
        rating: "4.8",
        blurb: "Console-like football matches with Ultimate Team and Career seasons.",
        note: "Top release",
        icon: "FC",
        tags: ["sports", "competitive", "action"],
        gradient: ["#0d111f", "#8e2de2", "#14d2b8"],
        screenshots: ["Ultimate Team", "Career Hub", "Match Day"],
        featured: true
    },
    {
        id: "roblox",
        name: "Roblox",
        type: "game",
        category: "Arcade",
        developer: "Roblox Corporation",
        size: "1.2 GB",
        rating: "4.7",
        blurb: "Millions of user worlds, social play and quick drop-in sessions.",
        note: "Hit game",
        icon: "RB",
        tags: ["arcade", "casual", "adventure"],
        gradient: ["#1d4ed8", "#36c6ff", "#79ffe1"],
        screenshots: ["Party Worlds", "Build Mode", "Voice Rooms"]
    },
    {
        id: "minecraft",
        name: "Minecraft",
        type: "game",
        category: "Adventure",
        developer: "Mojang",
        size: "152 MB",
        rating: "4.9",
        blurb: "Build, survive and explore infinite blocky worlds with friends.",
        note: "Editor's choice",
        icon: "MC",
        tags: ["adventure", "arcade", "creative"],
        gradient: ["#2d5d24", "#48a43b", "#ceb46f"],
        screenshots: ["Creative Realm", "Village Life", "Nether Run"]
    },
    {
        id: "geometry",
        name: "Geometry Dash",
        type: "game",
        category: "Puzzle",
        developer: "RobTop",
        size: "214 MB",
        rating: "4.6",
        blurb: "Rhythm platforming with sharp timing, bright effects and hard levels.",
        note: "Fast paced",
        icon: "GD",
        tags: ["puzzle", "arcade", "casual"],
        gradient: ["#f59e0b", "#ef4444", "#7c3aed"],
        screenshots: ["Stereo Madness", "Practice Run", "Custom Levels"]
    },
    {
        id: "stardew",
        name: "Stardew Valley",
        type: "game",
        category: "Casual",
        developer: "ConcernedApe",
        size: "430 MB",
        rating: "4.9",
        blurb: "Relaxed farming, cozy progression and offline-friendly sessions.",
        note: "Cozy favorite",
        icon: "SV",
        tags: ["casual", "adventure", "puzzle"],
        gradient: ["#114c7a", "#2aa0ff", "#ffd166"],
        screenshots: ["Farm Build", "Town Events", "Cave Trips"]
    },
    {
        id: "notion",
        name: "Notion",
        type: "app",
        category: "Productivity",
        developer: "Notion Labs",
        size: "96 MB",
        rating: "4.8",
        blurb: "Notes, docs and lightweight project planning in one clean workspace.",
        note: "Essential app",
        icon: "NO",
        tags: ["productivity", "writing", "work"],
        gradient: ["#111827", "#2d3748", "#8ea5c6"],
        screenshots: ["Daily Notes", "Task Boards", "Team Wiki"],
        featured: true
    },
    {
        id: "procreate",
        name: "Procreate",
        type: "app",
        category: "Design",
        developer: "Savage Interactive",
        size: "364 MB",
        rating: "4.9",
        blurb: "Premium sketching studio with responsive brushes and rich layers.",
        note: "Premium pick",
        icon: "PR",
        tags: ["design", "creative", "drawing"],
        gradient: ["#111827", "#ff4d6d", "#f59e0b"],
        screenshots: ["Brush Library", "Canvas View", "Color Studio"]
    },
    {
        id: "maps",
        name: "Maps",
        type: "app",
        category: "Travel",
        developer: "Apple",
        size: "15 MB",
        rating: "4.5",
        blurb: "Navigation, city guides and clean route planning on the move.",
        note: "Ready to go",
        icon: "MP",
        tags: ["travel", "utility", "maps"],
        gradient: ["#f7f7f7", "#facc15", "#ef4444"],
        screenshots: ["City Guide", "Live Route", "Saved Places"]
    },
    {
        id: "spotify",
        name: "Spotify",
        type: "app",
        category: "Music",
        developer: "Spotify",
        size: "182 MB",
        rating: "4.7",
        blurb: "Playlists, podcasts and collaborative queues with polished discovery.",
        note: "Popular now",
        icon: "SP",
        tags: ["music", "social", "audio"],
        gradient: ["#052e16", "#16a34a", "#4ade80"],
        screenshots: ["Mixes", "Podcasts", "Shared Queue"]
    },
    {
        id: "capcut",
        name: "CapCut",
        type: "app",
        category: "Video",
        developer: "Bytedance",
        size: "314 MB",
        rating: "4.8",
        blurb: "Quick short-form editing with effects, captions and export presets.",
        note: "Creator tool",
        icon: "CC",
        tags: ["video", "creative", "design"],
        gradient: ["#0f172a", "#334155", "#a5f3fc"],
        screenshots: ["Timeline Edit", "Auto Captions", "Templates"]
    }
];

const SCREEN_META = {
    today: {
        kicker: "Featured today",
        title: "Today",
        subtitle: "Big releases, editorial picks and premium app experiences.",
        pill: "Curated"
    },
    games: {
        kicker: "Top charts",
        title: "Games",
        subtitle: "Action, arcade and cozy games with fast install actions.",
        pill: "Game Center"
    },
    apps: {
        kicker: "Best utilities",
        title: "Apps",
        subtitle: "Productivity, design and creator tools with clean UX.",
        pill: "Top Apps"
    },
    search: {
        kicker: "Find anything",
        title: "Search",
        subtitle: "Search games, apps, studios and categories from one place.",
        pill: "Instant"
    }
};

const SCREEN_FILTERS = {
    games: [
        { value: "all", label: "All" },
        { value: "sports", label: "Sports" },
        { value: "arcade", label: "Arcade" },
        { value: "adventure", label: "Adventure" },
        { value: "casual", label: "Casual" },
        { value: "puzzle", label: "Puzzle" }
    ],
    apps: [
        { value: "all", label: "All" },
        { value: "productivity", label: "Productivity" },
        { value: "design", label: "Design" },
        { value: "travel", label: "Travel" },
        { value: "music", label: "Music" },
        { value: "video", label: "Video" }
    ],
    search: [
        { value: "all", label: "All" },
        { value: "games", label: "Games" },
        { value: "apps", label: "Apps" },
        { value: "sports", label: "Sports" },
        { value: "productivity", label: "Productivity" },
        { value: "design", label: "Design" }
    ]
};

const TODAY_SECTIONS = [
    {
        title: "Playing for today",
        subtitle: "Handpicked sessions with fast onboarding.",
        ids: ["roblox", "minecraft", "geometry"],
        jump: "games"
    },
    {
        title: "Apps to keep",
        subtitle: "Sharp utility picks with premium feel.",
        ids: ["notion", "maps", "spotify"],
        jump: "apps"
    },
    {
        title: "Editors' picks",
        subtitle: "Standout design and smooth interactions.",
        ids: ["procreate", "capcut", "stardew"],
        jump: "search"
    }
];

const state = {
    screen: "today",
    query: "",
    filters: {
        games: "all",
        apps: "all",
        search: "all"
    },
    installed: new Set(["maps"]),
    selectedId: null
};

const elements = {
    timeBadge: document.getElementById("timeBadge"),
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
    bottomBar: document.getElementById("bottomBar"),
    sheetScrim: document.getElementById("sheetScrim"),
    detailSheet: document.getElementById("detailSheet"),
    detailContent: document.getElementById("detailContent"),
    sheetClose: document.getElementById("sheetClose")
};

function itemById(id) {
    return ITEMS.find((item) => item.id === id);
}

function updateTime() {
    const now = new Date();
    elements.timeBadge.textContent = now.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getCurrentFilter() {
    return state.filters[state.screen] || "all";
}

function setCurrentFilter(value) {
    state.filters[state.screen] = value;
}

function installLabel(id) {
    return state.installed.has(id) ? "OPEN" : "GET";
}

function installClass(id) {
    return state.installed.has(id) ? " is-open" : "";
}

function iconStyle(item) {
    return `--icon-a:${item.gradient[0]};--icon-b:${item.gradient[1]};--icon-c:${item.gradient[2]};`;
}

function heroStyle(item) {
    return `--hero-a:${item.gradient[0]};--hero-b:${item.gradient[1]};--hero-c:${item.gradient[2]};`;
}

function matchesQuery(item, query) {
    if (!query.trim()) return true;
    const haystack = [
        item.name,
        item.type,
        item.category,
        item.developer,
        item.blurb,
        item.note,
        ...item.tags
    ].join(" ").toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
}

function matchesFilter(item, filter) {
    if (!filter || filter === "all") return true;
    if (filter === "games") return item.type === "game";
    if (filter === "apps") return item.type === "app";
    return item.tags.includes(filter) || item.category.toLowerCase() === filter;
}

function getBrowseItems(type) {
    const filter = state.screen === type ? getCurrentFilter() : "all";
    return ITEMS
        .filter((item) => item.type === type.slice(0, -1))
        .filter((item) => matchesFilter(item, filter))
        .filter((item) => matchesQuery(item, state.query));
}

function getSearchItems() {
    return ITEMS
        .filter((item) => matchesFilter(item, getCurrentFilter()))
        .filter((item) => matchesQuery(item, state.query));
}

function renderFilterChips() {
    const chips = SCREEN_FILTERS[state.screen] || [];
    if (!chips.length) {
        elements.filterShell.hidden = true;
        elements.filterTrack.innerHTML = "";
        return;
    }

    elements.filterShell.hidden = false;
    elements.filterTrack.innerHTML = chips.map((chip) => `
        <button class="filter-chip${chip.value === getCurrentFilter() ? " active" : ""}" type="button" data-role="filter" data-filter="${chip.value}">
            ${chip.label}
        </button>
    `).join("");
}

function renderHeroCard(item, label) {
    return `
        <article class="hero-card" style="${heroStyle(item)}" data-role="detail" data-id="${item.id}">
            <div class="hero-card-inner">
                <div class="hero-label">${label}</div>
                <div class="hero-art">${item.note}</div>
                <div class="hero-footer">
                    <div class="hero-icon" style="${iconStyle(item)}">${item.icon}</div>
                    <div class="hero-copy">
                        <div class="hero-title">${item.name}</div>
                        <div class="hero-meta">${item.category} · ${item.size} · ${item.developer}</div>
                    </div>
                    <button class="get-button glass${installClass(item.id)}" type="button" data-role="install" data-id="${item.id}">
                        ${installLabel(item.id)}
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderAppRow(item, index, options = {}) {
    const rank = options.showRank ? `<div class="row-rank">${index + 1}</div>` : "";
    const caption = options.caption ? `<div class="row-caption">${options.caption}</div>` : "";
    return `
        <article class="app-row" data-role="detail" data-id="${item.id}">
            ${rank}
            <div class="app-icon" style="${iconStyle(item)}">${item.icon}</div>
            <div class="app-copy">
                <div class="app-title">${item.name}</div>
                <div class="app-meta">${item.category} · ${item.size} · ${item.developer}</div>
                ${caption || `<div class="app-caption">${item.blurb}</div>`}
            </div>
            <div class="app-actions">
                <button class="get-button${installClass(item.id)}" type="button" data-role="install" data-id="${item.id}">
                    ${installLabel(item.id)}
                </button>
                <div class="app-note">${item.note}</div>
            </div>
        </article>
    `;
}

function renderSectionCard(title, subtitle, items, options = {}) {
    return `
        <section class="section-card">
            <div class="section-header">
                <div>
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                </div>
                ${options.jump ? `<button class="section-link" type="button" data-role="jump" data-screen-target="${options.jump}">See All</button>` : ""}
            </div>
            <div class="app-list">
                ${items.map((item, index) => renderAppRow(item, index, options)).join("")}
            </div>
        </section>
    `;
}

function renderSearchStarter() {
    const trends = ["Football", "Design", "Productivity", "Adventure", "Music", "Arcade"];
    return `
        <section class="section-card section-card-accent">
            <div class="section-header">
                <div>
                    <h2>Start with search</h2>
                    <p>Jump to games, apps or studios in one tap.</p>
                </div>
            </div>
            <div class="trend-cloud">
                ${trends.map((trend) => `
                    <button class="trend-chip" type="button" data-role="query" data-query="${trend}">
                        ${trend}
                    </button>
                `).join("")}
            </div>
        </section>
    `;
}

function renderTodayScreen() {
    const heroItems = ITEMS.filter((item) => item.featured);
    elements.heroRail.innerHTML = `
        <div class="hero-scroller">
            ${heroItems.map((item, index) => renderHeroCard(item, index === 0 ? "Now available" : "Featured app")).join("")}
        </div>
    `;

    elements.sectionStack.innerHTML = TODAY_SECTIONS.map((section) => {
        const sectionItems = section.ids.map(itemById).filter(Boolean);
        return renderSectionCard(section.title, section.subtitle, sectionItems, { jump: section.jump });
    }).join("");

    elements.emptyState.hidden = true;
}

function renderBrowseScreen(type) {
    const items = getBrowseItems(type);
    const topItems = items.slice(0, 2);
    const listItems = items.slice(0, 8);

    elements.heroRail.innerHTML = topItems.length ? `
        <div class="hero-scroller">
            ${topItems.map((item, index) => renderHeroCard(item, index === 0 ? "Featured" : "Popular")).join("")}
        </div>
    ` : "";

    elements.sectionStack.innerHTML = listItems.length ? [
        renderSectionCard("Top Charts", "Most relevant picks for this section.", listItems.slice(0, 4), { showRank: true }),
        listItems.length > 4 ? renderSectionCard("More to explore", "Additional titles you can open or install.", listItems.slice(4), {}) : ""
    ].join("") : "";

    elements.emptyState.hidden = listItems.length > 0;
}

function renderSearchScreen() {
    const items = getSearchItems();
    const hasQuery = state.query.trim().length > 0;

    if (!hasQuery) {
        elements.heroRail.innerHTML = `
            <div class="hero-scroller">
                ${renderHeroCard(itemById("fc26"), "Best match")}
            </div>
        `;
        elements.sectionStack.innerHTML = [
            renderSearchStarter(),
            renderSectionCard("Popular now", "Strong matches across games and apps.", ITEMS.slice(0, 5), {})
        ].join("");
        elements.emptyState.hidden = true;
        return;
    }

    elements.heroRail.innerHTML = items[0] ? `
        <div class="hero-scroller">
            ${renderHeroCard(items[0], "Best match")}
        </div>
    ` : "";

    elements.sectionStack.innerHTML = items.length ? renderSectionCard(
        `Results for "${state.query}"`,
        `${items.length} matches across the store.`,
        items,
        {}
    ) : "";

    elements.emptyState.hidden = items.length > 0;
}

function renderHeader() {
    const meta = SCREEN_META[state.screen];
    elements.headerKicker.textContent = meta.kicker;
    elements.screenTitle.textContent = meta.title;
    elements.screenSubtitle.textContent = meta.subtitle;

    if (state.screen === "games") {
        elements.headerPill.textContent = `${getBrowseItems("games").length} titles`;
    } else if (state.screen === "apps") {
        elements.headerPill.textContent = `${getBrowseItems("apps").length} titles`;
    } else if (state.screen === "search" && state.query.trim()) {
        elements.headerPill.textContent = `${getSearchItems().length} results`;
    } else {
        elements.headerPill.textContent = meta.pill;
    }
}

function renderSearchBar() {
    const showSearch = state.screen !== "today";
    elements.searchShell.hidden = !showSearch;
    if (!showSearch) return;

    const placeholders = {
        games: "Search games, genres, studios",
        apps: "Search apps, tools, creators",
        search: "Search everything in the store"
    };

    elements.searchInput.placeholder = placeholders[state.screen];
    elements.searchInput.value = state.query;
}

function renderBottomBar() {
    elements.bottomBar.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.screen === state.screen);
    });
}

function renderDetail(item) {
    const related = ITEMS
        .filter((candidate) => candidate.id !== item.id)
        .filter((candidate) => candidate.type === item.type || candidate.category === item.category)
        .slice(0, 3);

    elements.detailContent.innerHTML = `
        <div class="detail-banner" style="${heroStyle(item)}">
            <div class="detail-banner-copy">
                <div class="detail-kicker">${item.note}</div>
                <h2>${item.name}</h2>
                <p>${item.blurb}</p>
            </div>
        </div>

        <div class="detail-head">
            <div class="detail-icon" style="${iconStyle(item)}">${item.icon}</div>
            <div class="detail-meta">
                <h3>${item.name}</h3>
                <p>${item.category} · ${item.developer}</p>
                <span>${item.rating} rating</span>
            </div>
            <button class="get-button large${installClass(item.id)}" type="button" data-role="install" data-id="${item.id}">
                ${installLabel(item.id)}
            </button>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <strong>${item.rating}</strong>
                <span>Rating</span>
            </div>
            <div class="stat-card">
                <strong>${item.size}</strong>
                <span>Size</span>
            </div>
            <div class="stat-card">
                <strong>${item.category}</strong>
                <span>Category</span>
            </div>
            <div class="stat-card">
                <strong>${item.type === "game" ? "Game" : "App"}</strong>
                <span>Type</span>
            </div>
        </div>

        <section class="detail-section">
            <div class="detail-section-head">
                <h4>Preview</h4>
                <button class="section-link" type="button" data-role="query" data-query="${item.category}">More like this</button>
            </div>
            <div class="shot-rail">
                ${item.screenshots.map((shot, index) => `
                    <div class="shot-card" style="${heroStyle(item)}">
                        <span>${index + 1}</span>
                        <strong>${shot}</strong>
                    </div>
                `).join("")}
            </div>
        </section>

        <section class="detail-section">
            <div class="detail-section-head">
                <h4>About this ${item.type}</h4>
            </div>
            <p class="detail-description">${item.blurb}</p>
        </section>

        <section class="detail-section">
            <div class="detail-section-head">
                <h4>You may also like</h4>
            </div>
            <div class="detail-related">
                ${related.map((relatedItem, index) => renderAppRow(relatedItem, index, { caption: `<div class="app-caption">${relatedItem.category} · ${relatedItem.rating} rating</div>` })).join("")}
            </div>
        </section>
    `;
}

function openDetail(id) {
    const item = itemById(id);
    if (!item) return;

    state.selectedId = id;
    renderDetail(item);
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

function setScreen(screen) {
    state.screen = screen;

    if (screen === "today") {
        state.query = "";
    }

    render();

    if (screen === "search") {
        window.setTimeout(() => {
            elements.searchInput.focus();
        }, 60);
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

function render() {
    renderHeader();
    renderSearchBar();
    renderFilterChips();
    renderBottomBar();

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
    closeDetail();
    setScreen(button.dataset.screen);
});

elements.searchInput.addEventListener("input", () => {
    state.query = elements.searchInput.value;
    render();
});

elements.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        elements.searchInput.blur();
    }
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
    if (event.key === "Escape") closeDetail();
});

updateTime();
window.setInterval(updateTime, 60000);
render();
