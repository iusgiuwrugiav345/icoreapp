const state = {
  query: "",
  genre: "All",
  tab: "games"
};

const listEl = document.getElementById("list");
const chipsEl = document.getElementById("genreChips");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearSearch");
const sectionTitle = document.getElementById("sectionTitle");
const sectionCount = document.getElementById("sectionCount");
const profilePanel = document.getElementById("profilePanel");
const searchWrap = document.getElementById("searchWrap");
const subtitle = document.getElementById("subtitle");
const profileName = document.getElementById("profileName");
const profileId = document.getElementById("profileId");
const statApps = document.getElementById("statApps");
const statGames = document.getElementById("statGames");
const statGenres = document.getElementById("statGenres");

let items = [];

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).slice(0, 2);
  return parts.map(p => p[0]).join("").toUpperCase() || "AP";
}

function hueFromName(name) {
  const str = String(name || "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) % 360;
  }
  return hash || 24;
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
    hue: hueFromName(item.name),
    screenshots: Array.isArray(item.screenshots) ? item.screenshots : [],
    iconUrl: item.icon_url || null
  };
}

function iconMarkup(item) {
  const src = item.iconUrl || item.screenshots[0] || "";
  if (src) {
    return `<img src="${src}" alt="${item.title}" />`;
  }
  return `<span>${item.icon}</span>`;
}

function filterByTab(list) {
  if (state.tab === "games") {
    return list.filter(i => i.type === "game" || i.type === "games");
  }
  if (state.tab === "apps") {
    return list.filter(i => i.type !== "game" && i.type !== "games");
  }
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

function card(item, index) {
  return `
    <div class="card" data-id="${item.id}" style="animation-delay:${index * 40}ms">
      <div class="icon" style="--hue:${item.hue}">${iconMarkup(item)}</div>
      <div class="meta">
        <div class="name">${item.title}</div>
        <div class="desc">${item.desc}</div>
      </div>
      <div class="actions">
        <button class="get" data-id="${item.id}">Get</button>
        <div class="note">${item.genre}</div>
      </div>
    </div>
  `;
}

function renderList(list) {
  if (!list.length) {
    listEl.innerHTML = "<div class=\"empty\">No items yet.</div>";
    return;
  }
  listEl.innerHTML = list.map(card).join("");
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
  const genres = new Set(items.map(i => i.genre));
  statGames.textContent = games.length;
  statApps.textContent = apps.length;
  statGenres.textContent = genres.size;
}

function setActiveTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  profilePanel.classList.toggle("hidden", tab !== "profile");
  listEl.classList.toggle("hidden", tab === "profile");
  document.querySelector(".section-head").classList.toggle("hidden", tab === "profile");
  searchWrap.classList.toggle("hidden", tab === "profile");

  if (tab === "games") {
    sectionTitle.textContent = "Games";
  } else if (tab === "apps") {
    sectionTitle.textContent = "Apps";
  } else if (tab === "search") {
    sectionTitle.textContent = "Search";
  } else {
    sectionTitle.textContent = "";
  }

  subtitle.textContent = tab === "profile" ? "Profile" : "Games • Apps";
  render();

  if (tab === "search") {
    setTimeout(() => searchInput.focus(), 120);
  }
}

function render() {
  const filtered = filterItems();
  const baseList = filterByTab(items);
  renderChips(baseList);
  sectionCount.textContent = `${filtered.length}`;
  renderList(filtered);
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

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

updateProfile();
setActiveTab("games");
loadData();
