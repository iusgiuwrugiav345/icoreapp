const state = {
  query: "",
  genre: "All"
};

const featuredSection = document.getElementById("featuredSection");
const playingList = document.getElementById("playingList");
const mustList = document.getElementById("mustList");
const topList = document.getElementById("topList");
const chipsEl = document.getElementById("genreChips");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearSearch");

let items = [];

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

function setFeatured(item) {
  if (!item) {
    featuredSection.innerHTML = "";
    return;
  }

  const image = item.screenshots[0];
  const imageStyle = image
    ? `style=\"background-image:url('${image}')\"`
    : `style=\"background-image:linear-gradient(135deg, #3b3f4a, #1f232d)\"`;

  featuredSection.innerHTML = `
    <div class="featured-image" ${imageStyle}></div>
    <div class="featured-body">
      <div class="featured-badge">Now Available</div>
      <h3 class="featured-title">${item.title}</h3>
      <p class="featured-desc">${item.desc}</p>
      <div class="featured-footer">
        <div class="app-pill">
          <div class="app-icon" style="--hue:${item.hue}">${iconMarkup(item)}</div>
          <div>
            <div>${item.title}</div>
            <div style="font-size:12px;color:var(--muted);">${item.genre}</div>
          </div>
        </div>
        <button class="get primary" data-id="${item.id}">Get</button>
      </div>
    </div>
  `;
}

function row(item) {
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

function renderList(container, list) {
  if (!list.length) {
    container.innerHTML = "<div class=\"empty\">No items yet.</div>";
    return;
  }
  container.innerHTML = list.map(row).join("");
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
  renderChips(items);

  setFeatured(filtered[0]);
  renderList(playingList, filtered.slice(0, 4));
  renderList(mustList, filtered.slice(4, 9));
  renderList(topList, filtered.slice(9, 14));

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

loadData();
