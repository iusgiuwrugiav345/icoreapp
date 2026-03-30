const state = {
  query: "",
  genre: "All",
  tab: "games"
};

const cardsEl = document.getElementById("cards");
const chipsEl = document.getElementById("genreChips");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearSearch");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const statItems = document.getElementById("statItems");
const statGames = document.getElementById("statGames");
const statApps = document.getElementById("statApps");
const profilePanel = document.getElementById("profilePanel");
const controls = document.getElementById("controls");
const profileName = document.getElementById("profileName");
const profileId = document.getElementById("profileId");

let items = [];

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]).join("").toUpperCase() || "AP";
}

function buildView(item) {
  return {
    id: item.id,
    title: item.name || "Untitled",
    desc: item.description || item.developer || item.category || "No description",
    genre: item.genre || item.category || "Other",
    type: String(item.type || "game").toLowerCase(),
    rating: Number(item.rating_avg || 0),
    ratingCount: Number(item.rating_count || 0),
    downloads: Boolean(item.download_url),
    icon: initials(item.name),
    iconUrl: item.icon_url || (Array.isArray(item.screenshots) ? item.screenshots[0] : null)
  };
}

function filterByTab(list) {
  if (state.tab === "games") return list.filter(i => i.type === "game" || i.type === "games");
  if (state.tab === "apps") return list.filter(i => i.type !== "game" && i.type !== "games");
  if (state.tab === "arcade") return list.filter(i => (i.genre || "").toLowerCase().includes("arcade"));
  return list;
}

function filterItems() {
  const q = state.query.toLowerCase();
  return filterByTab(items).filter((item) => {
    const matchGenre = state.genre === "All" || item.genre === state.genre;
    const matchQuery = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    return matchGenre && matchQuery;
  });
}

function renderChips(list) {
  const genres = ["All", ...new Set(list.map(i => i.genre))];
  chipsEl.innerHTML = "";
  genres.forEach((genre) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (genre === state.genre ? " active" : "");
    btn.textContent = genre;
    btn.addEventListener("click", () => {
      state.genre = genre;
      render();
    });
    chipsEl.appendChild(btn);
  });
}

function iconMarkup(item) {
  if (item.iconUrl) return `<img src="${item.iconUrl}" alt="${item.title}" />`;
  return `<span>${item.icon}</span>`;
}

function card(item, index) {
  return `
    <article class="card" style="animation-delay:${index * 40}ms">
      <div class="card-top">
        <div class="card-icon">${iconMarkup(item)}</div>
        <div>
          <div class="card-title">${item.title}</div>
          <div class="card-desc">${item.desc}</div>
        </div>
      </div>
      <div class="card-meta">
        <span>${item.genre}</span>
        <span>${item.type}</span>
      </div>
      <div class="card-actions">
        <span class="tag">${item.downloads ? "In‑App" : "Via Bot"}</span>
        <button class="get" data-id="${item.id}">Get</button>
      </div>
    </article>
  `;
}

function renderCards(list) {
  if (!list.length) {
    cardsEl.innerHTML = "<div class=\"empty\">No items yet.</div>";
    return;
  }
  cardsEl.innerHTML = list.map(card).join("");
}

async function openDownload(id) {
  try {
    const res = await fetch(`/api/items/${id}/download`);
    const data = await res.json();
    const url = data.url;
    if (!url) return;
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openLink) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.open(url, "_blank");
    }
  } catch (e) {
    console.error(e);
  }
}

function bindButtons() {
  document.querySelectorAll(".get").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (id) openDownload(id);
    });
  });
}

function updateProfile() {
  try {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user) {
      const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "User";
      profileName.textContent = name;
      profileId.textContent = `ID: ${user.id}`;
    }
  } catch (e) {
    // ignore
  }
}

function updateStats() {
  const games = items.filter(i => i.type === "game" || i.type === "games");
  const apps = items.filter(i => i.type !== "game" && i.type !== "games");
  statItems.textContent = items.length;
  statGames.textContent = games.length;
  statApps.textContent = apps.length;
}

function setActiveTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  profilePanel.classList.toggle("hidden", tab !== "profile");
  controls.classList.toggle("hidden", tab === "profile");
  cardsEl.classList.toggle("hidden", tab === "profile");

  if (tab === "games") {
    pageTitle.textContent = "Games";
    pageSubtitle.textContent = "Discover new releases and classics";
  } else if (tab === "apps") {
    pageTitle.textContent = "Apps";
    pageSubtitle.textContent = "Top utilities and productivity";
  } else if (tab === "arcade") {
    pageTitle.textContent = "Arcade";
    pageSubtitle.textContent = "Fast, bright, addictive";
  } else if (tab === "search") {
    pageTitle.textContent = "Search";
    pageSubtitle.textContent = "Find apps by name or genre";
  } else {
    pageTitle.textContent = "Profile";
    pageSubtitle.textContent = "Your account";
  }

  render();

  if (tab === "search") {
    setTimeout(() => searchInput.focus(), 120);
  }
}

function render() {
  const filtered = filterItems();
  const baseList = filterByTab(items);
  renderChips(baseList);
  renderCards(filtered);
  bindButtons();
}

async function loadData() {
  try {
    const res = await fetch("/api/items?limit=200");
    if (!res.ok) throw new Error("bad_response");
    const payload = await res.json();
    const raw = Array.isArray(payload.items) ? payload.items : [];
    items = raw.map(buildView);
  } catch (e) {
    items = [];
  }
  updateStats();
  render();
}

searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  render();
});

clearButton.addEventListener("click", () => {
  state.query = "";
  searchInput.value = "";
  searchInput.focus();
  render();
});

document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

updateProfile();
setActiveTab("games");
loadData();
