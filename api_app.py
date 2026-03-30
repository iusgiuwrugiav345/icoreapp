import os
from flask import Flask, abort, jsonify, redirect, request, send_from_directory

from database import db

BASE_DIR = os.path.dirname(__file__)
WEBAPP_DIR = os.path.join(BASE_DIR, "webapp")

app = Flask(__name__)


def _row_to_item(row):
    row_id, name, url, content_type, category, version, updated, genre, developer, size = row
    return {
        "id": row_id,
        "name": name,
        "download_url": url,
        "type": content_type,
        "category": category,
        "version": version,
        "updated": updated,
        "genre": genre,
        "developer": developer,
        "size": size,
        "rating_avg": 0,
        "rating_count": 0,
        "description": f"{genre} by {developer}" if genre != "N/A" or developer != "N/A" else "",
        "screenshots": db.get_screenshots(row_id),
        "icon_url": None,
    }


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


@app.get("/api/items")
def api_items():
    limit = request.args.get("limit", default=120, type=int)
    rows = db.get_all_games_with_id()[: max(limit, 0)]
    return jsonify({"items": [_row_to_item(row) for row in rows]})


@app.get("/api/items/<int:item_id>")
def api_item(item_id):
    row = db.get_game_by_id(item_id)
    if not row:
        abort(404)

    item = {
        "id": item_id,
        "name": row[0],
        "download_url": row[1],
        "type": row[2],
        "category": row[3],
        "version": row[4],
        "updated": row[5],
        "genre": row[6],
        "developer": row[7],
        "size": row[8],
        "rating_avg": 0,
        "rating_count": 0,
        "description": f"{row[6]} by {row[7]}" if row[6] != "N/A" or row[7] != "N/A" else "",
        "screenshots": db.get_screenshots(item_id),
        "icon_url": None,
    }
    return jsonify(item)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    app.run(host="0.0.0.0", port=port)
