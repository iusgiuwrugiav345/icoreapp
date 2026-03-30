const state = {
    filter: "all",
    query: "",
    nav: "apps"
};

const timeBadgeEl = document.getElementById("timeBadge");
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");
const resultCountEl = document.getElementById("resultCount");
const emptyEl = document.getElementById("empty");
const cards = Array.from(document.querySelectorAll(".app-card"));

function updateTime() {
    if (!timeBadgeEl) return;
    const now = new Date();
    const time = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    timeBadgeEl.textContent = time;
}

function applyFilterUI() {
    document.querySelectorAll("#filterRow .chip").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === state.filter);
    });
}

function applyNavUI() {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.nav === state.nav);
    });
}

function matchesFilter(card) {
    if (state.filter === "all") return true;
    const tags = (card.dataset.tags || "").split(" ");
    return tags.includes(state.filter);
}

function matchesQuery(card) {
    if (!state.query) return true;
    const name = (card.dataset.name || "").toLowerCase();
    return name.includes(state.query.toLowerCase());
}

function applyFilters() {
    let visible = 0;
    cards.forEach((card) => {
        const show = matchesFilter(card) && matchesQuery(card);
        card.style.display = show ? "" : "none";
        if (show) visible += 1;
    });

    if (resultCountEl) resultCountEl.textContent = `Найдено: ${visible}`;
    if (emptyEl) emptyEl.style.display = visible ? "none" : "block";
}

function doSearch() {
    state.query = searchInputEl.value.trim();
    applyFilters();
}

document.getElementById("filterRow").addEventListener("click", (event) => {
    const btn = event.target.closest(".chip");
    if (!btn) return;
    state.filter = btn.dataset.filter || "all";
    applyFilterUI();
    applyFilters();
});

document.querySelector(".bottom-nav").addEventListener("click", (event) => {
    const btn = event.target.closest(".nav-btn");
    if (!btn) return;
    state.nav = btn.dataset.nav || "apps";
    applyNavUI();
});

searchBtnEl.addEventListener("click", doSearch);
searchInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") doSearch();
});

searchInputEl.addEventListener("input", () => {
    state.query = searchInputEl.value.trim();
    applyFilters();
});

applyFilterUI();
applyNavUI();
applyFilters();
updateTime();
setInterval(updateTime, 60000);
