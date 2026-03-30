const fallbackData = [
  {
    title: "Compass X",
    desc: "AR навигация и точное направление",
    genre: "Навигация",
    rating: 4.9,
    popularity: 98,
    purchases: true,
    icon: "CX",
    hue: 24
  },
  {
    title: "Night Race 19",
    desc: "GPS трекер, карта трасс",
    genre: "Гонки",
    rating: 4.6,
    popularity: 92,
    purchases: true,
    icon: "NR",
    hue: 205
  },
  {
    title: "TapeMeasure+",
    desc: "Измеряй все вокруг камерой",
    genre: "Инструменты",
    rating: 4.8,
    popularity: 95,
    purchases: false,
    icon: "TM",
    hue: 48
  },
  {
    title: "MD Clock",
    desc: "Минималистичный виджет времени",
    genre: "Утилиты",
    rating: 4.2,
    popularity: 70,
    purchases: true,
    icon: "MC",
    hue: 280
  },
  {
    title: "PLNR Space",
    desc: "Сканируй комнаты и строи план",
    genre: "AR",
    rating: 4.7,
    popularity: 88,
    purchases: true,
    icon: "PS",
    hue: 160
  },
  {
    title: "Neon Drift",
    desc: "Кибер-гонки с турбо",
    genre: "Гонки",
    rating: 4.9,
    popularity: 100,
    purchases: true,
    icon: "ND",
    hue: 320
  },
  {
    title: "Pixel Quest",
    desc: "Рогалик с быстрыми забегами",
    genre: "Экшн",
    rating: 4.5,
    popularity: 76,
    purchases: false,
    icon: "PQ",
    hue: 120
  },
  {
    title: "SkyForge Arena",
    desc: "Арена 5v5, короткие матчи",
    genre: "Экшн",
    rating: 4.4,
    popularity: 81,
    purchases: true,
    icon: "SA",
    hue: 12
  },
  {
    title: "Zen Garden",
    desc: "Медитативные головоломки",
    genre: "Головоломки",
    rating: 4.6,
    popularity: 84,
    purchases: false,
    icon: "ZG",
    hue: 80
  },
  {
    title: "Story Forge",
    desc: "Конструктор историй",
    genre: "Обучение",
    rating: 4.3,
    popularity: 66,
    purchases: true,
    icon: "SF",
    hue: 240
  }
];

let data = [];

const state = {
  query: "",
  genre: "Все",
  sort: "popular"
};

const listEl = document.getElementById("gameList");
const chipsEl = document.getElementById("genreChips");
const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearSearch");
const sortSelect = document.getElementById("sortSelect");

const genresFromData = () => ["Все", ...new Set(data.map(item => item.genre))];

function renderChips() {
  chipsEl.innerHTML = "";
  const genres = genresFromData();
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

function sortItems(items) {
  const sorted = [...items];
  if (state.sort === "popular") {
    sorted.sort((a, b) => b.popularity - a.popularity);
  } else if (state.sort === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else if (state.sort === "genre") {
    sorted.sort((a, b) => {
      const g = a.genre.localeCompare(b.genre);
      return g !== 0 ? g : b.popularity - a.popularity;
    });
  } else {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  return sorted;
}

function filterItems() {
  return data.filter((item) => {
    const matchGenre = state.genre === "Все" || item.genre === state.genre;
    const q = state.query.toLowerCase();
    const matchQuery = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
    return matchGenre && matchQuery;
  });
}

function render() {
  renderChips();
  const items = sortItems(filterItems());
  listEl.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "desc";
    empty.textContent = "Ничего не найдено. Попробуй другой запрос.";
    listEl.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.setProperty("--hue", item.hue);
    card.style.animationDelay = `${index * 70}ms`;

    card.innerHTML = `
      <div class="icon">${item.icon}</div>
      <div class="meta">
        <div class="title">${item.title}</div>
        <div class="desc">${item.desc}</div>
        <div class="tag">${item.genre} • ★ ${item.rating.toFixed(1)}</div>
      </div>
      <div class="cta">
        <button class="get">Get</button>
        <div class="purchase">${item.purchases ? "In‑App Purchases" : "Без покупок"}</div>
      </div>
    `;

    listEl.appendChild(card);
  });
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

sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  render();
});

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

async function loadData() {
  try {
    const res = await fetch("/api/items?limit=100");
    if (!res.ok) throw new Error("bad_response");
    const payload = await res.json();
    const items = Array.isArray(payload.items) ? payload.items : [];
    data = items.map((item) => ({
      title: item.name || "Без названия",
      desc: item.description || item.developer || item.category || "Описание отсутствует",
      genre: item.genre || "Другое",
      rating: Number(item.rating_avg || 0),
      popularity: Number(item.rating_count || 0),
      purchases: Boolean(item.download_url),
      icon: initials(item.name),
      hue: hueFromName(item.name)
    }));

    if (!data.length) {
      data = fallbackData;
    }
  } catch (e) {
    data = fallbackData;
  }
  render();
}

loadData();
