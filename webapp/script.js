const state = {
    type: "",
    tab: "popular",
    query: "",
    nav: "home"
};

const listEl = document.getElementById("list");
const emptyEl = document.getElementById("empty");
const sectionTitleEl = document.getElementById("sectionTitle");
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");

const cards = Array.from(document.querySelectorAll(".card"));

function applyTypeChipUI() {
    document.querySelectorAll("#typeFilter .chip").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.type === state.type);
    });
}

function applyTabChipUI() {
    document.querySelectorAll("#tabFilter .chip").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.tab === state.tab);
    });
}

function applyBottomNavUI() {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.nav === state.nav);
    });
}

function updateSectionTitle() {
    const activeTab = document.querySelector(`#tabFilter .chip[data-tab="${state.tab}"]`);
    sectionTitleEl.textContent = activeTab ? activeTab.textContent : "Каталог";
}

function applyFilters() {
    const query = state.query.toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
        const typeMatch = !state.type || card.dataset.type === state.type;
        const name = (card.dataset.name || "").toLowerCase();
        const queryMatch = !query || name.includes(query);
        const show = typeMatch && queryMatch;
        card.style.display = show ? "" : "none";
        if (show) visible += 1;
    });

    emptyEl.style.display = visible ? "none" : "block";
}

function doSearch() {
    state.query = searchInputEl.value.trim();
    applyFilters();
}

document.getElementById("typeFilter").addEventListener("click", (event) => {
    const btn = event.target.closest(".chip");
    if (!btn) return;
    state.type = btn.dataset.type || "";
    applyTypeChipUI();
    applyFilters();
});

document.getElementById("tabFilter").addEventListener("click", (event) => {
    const btn = event.target.closest(".chip");
    if (!btn) return;
    state.tab = btn.dataset.tab || "popular";
    applyTabChipUI();
    updateSectionTitle();
});

document.querySelector(".bottom-nav").addEventListener("click", (event) => {
    const btn = event.target.closest(".nav-btn");
    if (!btn) return;
    state.nav = btn.dataset.nav || "home";
    applyBottomNavUI();
});

searchBtnEl.addEventListener("click", doSearch);
searchInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") doSearch();
});

applyTypeChipUI();
applyTabChipUI();
applyBottomNavUI();
updateSectionTitle();
