const state = {
    filter: ""
};

const timeBadgeEl = document.getElementById("timeBadge");
const emptyEl = document.getElementById("empty");
const chips = Array.from(document.querySelectorAll(".chip"));
const cards = Array.from(document.querySelectorAll(".item-card"));

function updateTime() {
    if (!timeBadgeEl) return;
    const now = new Date();
    timeBadgeEl.textContent = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function applyFilterUI() {
    chips.forEach((chip) => {
        chip.classList.toggle("active", chip.dataset.filter === state.filter);
    });
}

function applyFilters() {
    let visible = 0;
    cards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(" ");
        const show = !state.filter || tags.includes(state.filter);
        card.style.display = show ? "" : "none";
        if (show) visible += 1;
    });
    if (emptyEl) emptyEl.style.display = visible ? "none" : "block";
}

document.getElementById("chipRow").addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    state.filter = chip.dataset.filter || "";
    applyFilterUI();
    applyFilters();
});

document.querySelector(".bottom-nav").addEventListener("click", (event) => {
    const item = event.target.closest(".nav-item");
    if (!item) return;
    document.querySelectorAll(".nav-item").forEach((btn) => {
        btn.classList.toggle("active", btn === item);
    });
});

updateTime();
setInterval(updateTime, 60000);
applyFilters();
