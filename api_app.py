import os
from functools import lru_cache
from urllib.parse import quote, urlparse

import requests
from flask import Flask, abort, jsonify, redirect, request, send_from_directory

from database import db

try:
    import config as app_config
except ModuleNotFoundError:
    app_config = None

BASE_DIR = os.path.dirname(__file__)
WEBAPP_DIR = os.path.join(BASE_DIR, "webapp")

app = Flask(__name__)


def _normalize_type(value: str | None) -> str:
    text = (value or "").strip().lower()
    if text in {"game", "games", "игра", "игры"}:
        return "game"
    if text in {"app", "apps", "application", "applications", "приложение", "приложения"}:
        return "app"
    return "game"


def _normalize_category(value: str | None, item_type: str) -> str:
    category = (value or "").strip().lower()
    if not category or category == "n/a":
        return "games" if item_type == "game" else "apps"
    return category


def _display_name(raw_name: str) -> str:
    keep_upper = {"ea", "fc", "gta", "vpn", "pdf", "ios", "ipa", "ui", "ux"}
    words = str(raw_name or "").replace("_", " ").split()
    if not words:
        return "Untitled"

    cooked = []
    for word in words:
        lower = word.lower()
        if lower in keep_upper:
            cooked.append(lower.upper())
        elif any(ch.isdigit() for ch in word) and len(word) <= 5:
            cooked.append(word.upper())
        else:
            cooked.append(word[:1].upper() + word[1:])
    return " ".join(cooked)


def _combined_rating(game_name: str) -> tuple[float, int]:
    real_avg, real_count = db.get_game_rating_stats(game_name)
    virtual_avg, virtual_count = db.get_virtual_rating(game_name)
    real_avg = float(real_avg or 0.0)
    real_count = int(real_count or 0)
    virtual_avg = float(virtual_avg or 0.0)
    virtual_count = int(virtual_count or 0)
    total_count = real_count + virtual_count
    if total_count <= 0:
        return 0.0, 0
    total_sum = (real_avg * real_count) + (virtual_avg * virtual_count)
    return round(total_sum / total_count, 1), total_count


@lru_cache(maxsize=512)
def _telegram_file_url(file_id: str) -> str | None:
    token = getattr(app_config, "TOKEN", None) if app_config else None
    if not token or not file_id:
        return None

    try:
        response = requests.get(
            f"https://api.telegram.org/bot{token}/getFile",
            params={"file_id": file_id},
            timeout=10,
        )
        data = response.json()
    except Exception:
        return None

    if not response.ok or not data.get("ok"):
        return None

    file_path = data.get("result", {}).get("file_path")
    if not file_path:
        return None

    return f"https://api.telegram.org/file/bot{token}/{file_path}"


def _media_to_url(value: str | None) -> str | None:
    source = str(value or "").strip()
    if not source:
        return None
    if source.startswith(("http://", "https://", "/")):
        return source
    return f"/api/media/telegram/{quote(source, safe='')}"


def _item_description(genre: str, developer: str, category: str, item_type: str) -> str:
    parts = []
    if genre and genre != "N/A":
        parts.append(genre)
    elif category and category not in {"games", "apps"}:
        parts.append(category.title())

    if developer and developer != "N/A":
        parts.append(developer)

    if not parts:
        return "iOS game" if item_type == "game" else "iOS app"
    return " · ".join(parts)


def _row_to_item(row):
    row_id, name, url, content_type, category, version, updated, genre, developer, size = row
    item_type = _normalize_type(content_type)
    item_category = _normalize_category(category or genre, item_type)
    rating_avg, rating_count = _combined_rating(name)
    screenshots = [_media_to_url(value) for value in db.get_screenshots(row_id)]
    screenshots = [value for value in screenshots if value]

    return {
        "id": row_id,
        "name": _display_name(name),
        "slug": str(name or "").strip().lower(),
        "download_url": url,
        "source_host": urlparse(url).netloc,
        "type": item_type,
        "category": item_category,
        "version": version or "N/A",
        "updated": updated or "N/A",
        "genre": genre or "N/A",
        "developer": developer or "N/A",
        "size": size or "N/A",
        "rating_avg": rating_avg,
        "rating_count": rating_count,
        "description": _item_description(genre, developer, item_category, item_type),
        "screenshots": screenshots,
        "icon_url": None,
    }


def _sort_key(item):
    rating_count = int(item.get("rating_count") or 0)
    rating_avg = float(item.get("rating_avg") or 0.0)
    screenshots = len(item.get("screenshots") or [])
    return (
        rating_count > 0,
        rating_count,
        rating_avg,
        screenshots,
        item.get("id") or 0,
    )


def _filter_items(items):
    query = (request.args.get("q") or "").strip().lower()
    item_type = _normalize_type(request.args.get("type")) if request.args.get("type") else ""
    category = (request.args.get("category") or "").strip().lower()
    sort = (request.args.get("sort") or "featured").strip().lower()

    filtered = list(items)
    if item_type:
        filtered = [item for item in filtered if item["type"] == item_type]
    if category and category != "all":
        filtered = [item for item in filtered if item["category"] == category]
    if query:
        filtered = [
            item
            for item in filtered
            if query in " ".join(
                [
                    item["name"].lower(),
                    item["developer"].lower(),
                    item["genre"].lower(),
                    item["category"].lower(),
                ]
            )
        ]

    if sort == "name":
        filtered.sort(key=lambda item: item["name"].lower())
    elif sort == "new":
        filtered.sort(key=lambda item: item["id"], reverse=True)
    else:
        filtered.sort(key=_sort_key, reverse=True)

    return filtered


@app.get("/")
def root():
    return redirect("/webapp/", code=302)


@app.get("/healthz")
def healthz():
    return jsonify({"ok": True})


@app.get("/webapp")
@app.get("/webapp/")
def webapp_index():
    return send_from_directory(WEBAPP_DIR, "index.html")


@app.get("/webapp/<path:filename>")
def webapp_assets(filename):
    return send_from_directory(WEBAPP_DIR, filename)


@app.get("/api/media/telegram/<path:file_id>")
def api_media_telegram(file_id):
    url = _telegram_file_url(file_id)
    if not url:
        abort(404)
    return redirect(url, code=302)


@app.get("/api/items")
def api_items():
    limit = max(request.args.get("limit", default=240, type=int), 0)
    items = [_row_to_item(row) for row in db.get_all_games_with_id()]
    filtered = _filter_items(items)[:limit]

    categories = sorted({item["category"] for item in items if item["category"]})
    return jsonify(
        {
            "items": filtered,
            "meta": {
                "total": len(filtered),
                "categories": categories,
            },
        }
    )


@app.get("/api/items/<int:item_id>")
def api_item(item_id):
    row = db.get_game_by_id(item_id)
    if not row:
        abort(404)

    item = _row_to_item((item_id, *row))
    related = [
        candidate
        for candidate in _filter_items([_row_to_item(value) for value in db.get_all_games_with_id()])
        if candidate["id"] != item_id
        and (
            candidate["category"] == item["category"]
            or candidate["type"] == item["type"]
        )
    ][:6]
    item["related"] = related
    return jsonify(item)


@app.get("/api/items/<int:item_id>/download")
def api_item_download(item_id):
    row = db.get_game_by_id(item_id)
    if not row:
        abort(404)

    name, url = row[0], row[1]
    user_id = request.args.get("user_id", type=int)

    if user_id:
        user = db.get_user(user_id)
        if not user:
            db.create_user(user_id)
        db.update_user_activity(user_id)
        db.add_download(user_id, name)

    return redirect(url, code=302)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    app.run(host="0.0.0.0", port=port)
