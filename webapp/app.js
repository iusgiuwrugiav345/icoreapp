const state = {
  query: "",
  genre: "All"
};

const heroSection = document.getElementById("heroSection");
const carousel = document.getElementById("carousel");
const playingList = document.getElementById("playingList");
const topList = document.getElementById("topList");
const chipsEl = document.getElementById("genreChips");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearSearch");
const todayDate = document.getElementById("todayDate");

let items = [];

if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.expand();
}

function setDate() {
  try {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });
    todayDate.textContent = fmt.format(now);
  } catch (e) {
    todayDate.textContent = "";
  }
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
    rating: Number(item.rating_avg || 0),
    ratingCount: Number(item.rating_count || 0),
    downloads: Boolean(item.download_url),
    icon: initials(item.name),
    hue: hueFromName(item.name),
    screenshots: Array.isArray(item.screenshots) ? item.screenshots : [],
    iconUrl: item.icon_url || null
  };
}

function filterItems() {
  const q = state.query.toLowerCase();
  return items.filter((item) => {
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
  const src = item.iconUrl || item.screenshots[0] || "";
  if (src) {
    return `<img src="${src}" alt="${item.title}" />`;
  }
  return `<span>${item.icon}</span>`;
}

function heroCard(item) {
  if (!item) {
    heroSection.innerHTML = "";
    return;
  }

  const heroImage = item.screenshots[0] || "";
  const heroStyle = heroImage
    ? `style=\"background-image:url('${heroImage}')\"`
    : `style=\"background-image:linear-gradient(135deg, #2e2f3a, #151820)\"`;

  heroSection.innerHTML = `
    <div class="hero-card">
      <div class="hero-media" ${heroStyle}></div>
      <div class="hero-body">
        <div class="hero-tag">Now Available</div>
        <h3 class="hero-title">${item.title}</h3>
        <p class="hero-desc">${item.desc}</p>
        <div class="hero-footer">
          <div class="app-pill">
            <div class="app-icon" style="--hue:${item.hue}">${iconMarkup(item)}</div>
            <div>
              <div>${item.title}</div>
              <div style="font-size:12px;color:var(--muted);">${item.genre}</div>
            </div>
          </div>
          <button class="get" data-id="${item.id}">Get</button>
        </div>
      </div>
    </div>
  `;
}

function carouselCard(item) {
  const img = item.screenshots[0] || "";
  const mediaStyle = img
    ? `style=\"background-image:url('${img}')\"`
    : `style=\"background-image:linear-gradient(135deg, #3b3f4a, #1f232d)\"`;

  return `
    <div class="carousel-card">
      <div class="carousel-media" ${mediaStyle}></div>
      <div class="carousel-body">
        <div class="carousel-info">
          <div class="carousel-title">${item.title}</div>
          <div class="carousel-desc">${item.genre}</div>
        </div>
        <button class="get" data-id="${item.id}">Get</button>
      </div>
    </div>
  `;
}

function listRow(item) {
  return `
    <div class="row" data-id="${item.id}">
      <div class="icon" style="--hue:${item.hue}">${iconMarkup(item)}</div>
      <div class="meta">
        <div class="title">${item.title}</div>
        <div class="desc">${item.desc}</div>
      </div>
      <div class="action">
        <button class="get" data-id="${item.id}">Get</button>
        <div class="note">${item.downloads ? "In‑App Purchases" : "Via Bot"}</div>
      </div>
    </div>
  `;
}

function rankRow(item, index) {
  return `
    <div class="rank-row" data-id="${item.id}">
      <div class="rank-num">${index + 1}</div>
      <div class="icon" style="--hue:${item.hue}">${iconMarkup(item)}</div>
      <div class="meta">
        <div class="title">${item.title}</div>
        <div class="desc">${item.desc}</div>
      </div>
      <div class="action">
        <button class="get" data-id="${item.id}">Get</button>
        <div class="note">${item.downloads ? "In‑App Purchases" : "Via Bot"}</div>
      </div>
    </div>
  `;
}

function renderList(container, list) {
  if (!list.length) {
    container.innerHTML = "<div class=\"empty\">No items yet.</div>";
    return;
  }
  container.innerHTML = list.map(listRow).join("");
}

function renderRankList(container, list) {
  if (!list.length) {
    container.innerHTML = "<div class=\"empty\">No items yet.</div>";
    return;
  }
  container.innerHTML = list.map(rankRow).join("");
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

function render() {
  const filtered = filterItems();
  const sorted = [...filtered].sort((a, b) => (b.ratingCount - a.ratingCount) || (b.rating - a.rating));

  renderChips(items);
  heroCard(sorted[0]);
  carousel.innerHTML = sorted.slice(0, 6).map(carouselCard).join("");
  renderList(playingList, sorted.slice(6, 11));
  renderRankList(topList, sorted.slice(0, 10));

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

setDate();
loadData();
