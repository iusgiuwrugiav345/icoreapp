import os
import re
from functools import lru_cache
from urllib.parse import quote, urlparse

import requests
from flask import Flask, abort, jsonify, make_response, redirect, request, send_from_directory

from database import db
import smtplib
from email.message import EmailMessage
import config as app_config

try:
    import config as app_config
except ModuleNotFoundError:
    app_config = None

BASE_DIR = os.path.dirname(__file__)
WEBAPP_DIR = os.path.join(BASE_DIR, "webapp")

app = Flask(__name__)
AUTH_COOKIE = "ipa_store_session"
EMAIL_RE = re.compile(r"^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$", re.I)


def _valid_email(value: str) -> bool:
    return bool(EMAIL_RE.match((value or "").strip()))


def _valid_password(value: str) -> bool:
    return len((value or "").strip()) >= 6


def _normalize_username(email: str, username: str | None) -> str:
    raw = (username or "").strip().lower()
    if not raw:
        raw = (email.split("@", 1)[0] if "@" in email else email).strip().lower()
    raw = re.sub(r"[^a-z0-9_.-]+", "", raw)
    return raw[:32] or "user"


def _session_payload():
    token = request.cookies.get(AUTH_COOKIE, "").strip()
    if not token:
        return None
    return db.get_auth_session(token)


def _auth_response(payload, session_data=None):
    response = make_response(jsonify(payload))
    if session_data:
        response.set_cookie(
            AUTH_COOKIE,
            session_data["token"],
            max_age=30 * 24 * 3600 if session_data["remember_me"] else 7 * 24 * 3600,
            httponly=True,
            samesite="Lax",
            secure=request.is_secure,
            path="/",
        )
    return response


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
    row_id, name, url, content_type, category, version, updated, genre, developer, size, icon_url, cover_url = row
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
        "icon_url": icon_url or None,
        "cover_url": cover_url or None,
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
    items = [_row_to_item(row) for row in db.get_catalog_rows_with_id()]
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
    row = db.get_catalog_item_by_id(item_id)
    if not row:
        abort(404)

    item = _row_to_item((item_id, *row))
    related = [
        candidate
        for candidate in _filter_items([_row_to_item(value) for value in db.get_catalog_rows_with_id()])
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


@app.get("/api/auth/me")
def api_auth_me():
    session = _session_payload()
    if not session:
        return jsonify({"authenticated": False}), 401
    return jsonify({"authenticated": True, "user": session["user"], "remember_me": session["remember_me"]})


@app.post("/api/auth/register")
def api_auth_register():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", ""))
    display_name = str(payload.get("display_name", "")).strip()
    username = _normalize_username(email, payload.get("username"))
    remember_me = bool(payload.get("remember_me"))

    if not display_name:
        return jsonify({"error": "display_name_required"}), 400
    if not _valid_email(email):
        return jsonify({"error": "invalid_email"}), 400
    if not _valid_password(password):
        return jsonify({"error": "invalid_password"}), 400

    user = db.create_auth_user(email, username, display_name, password)
    if not user:
        return jsonify({"error": "user_exists"}), 409

    session = db.create_auth_session(user["id"], remember_me=remember_me)
    return _auth_response({"authenticated": True, "user": user, "remember_me": remember_me}, session)


@app.post('/api/auth/send-code')
def api_auth_send_code():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get('email', '')).strip().lower()
    if not _valid_email(email):
        return jsonify({'error': 'invalid_email'}), 400

    ver = db.create_email_verification(email)
    if not ver:
        return jsonify({'error': 'server_error'}), 500

    # send email if SMTP configured
    host = getattr(app_config, 'SMTP_HOST', '')
    port = getattr(app_config, 'SMTP_PORT', 0)
    user = getattr(app_config, 'SMTP_USER', '')
    password = getattr(app_config, 'SMTP_PASS', '')
    sender = getattr(app_config, 'SMTP_FROM', 'no-reply@local')

    try:
        if host and port and user and password:
            msg = EmailMessage()
            msg['Subject'] = 'Your verification code'
            msg['From'] = sender
            msg['To'] = email
            msg.set_content(f'Your verification code: {ver["code"]}\nThis code will expire shortly.')
            with smtplib.SMTP(host, port, timeout=20) as s:
                s.starttls()
                s.login(user, password)
                s.send_message(msg)
        else:
            # SMTP not configured — include code in response for dev/testing
            pass
    except Exception as e:
        print(f"Email send error: {e}")

    # For security, do not always expose code; expose only when SMTP not configured
    response = {'ok': True}
    if not (host and port and user and password):
        response['debug_code'] = ver['code']
    return jsonify(response)


@app.post('/api/auth/verify-code')
def api_auth_verify_code():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get('email', '')).strip().lower()
    code = str(payload.get('code', '')).strip()
    if not _valid_email(email) or not code:
        return jsonify({'error': 'invalid_request'}), 400

    ok = db.verify_email_code(email, code)
    if not ok:
        return jsonify({'error': 'invalid_or_expired_code'}), 400
    return jsonify({'ok': True})


@app.post("/api/auth/login")
def api_auth_login():
    payload = request.get_json(silent=True) or {}
    login = str(payload.get("login", "")).strip()
    password = str(payload.get("password", ""))
    remember_me = bool(payload.get("remember_me"))

    if not login or not password:
        return jsonify({"error": "missing_credentials"}), 400

    user = db.verify_auth_user(login, password)
    if not user:
        return jsonify({"error": "invalid_credentials"}), 401

    session = db.create_auth_session(user["id"], remember_me=remember_me)
    return _auth_response({"authenticated": True, "user": user, "remember_me": remember_me}, session)


@app.post("/api/auth/logout")
def api_auth_logout():
    token = request.cookies.get(AUTH_COOKIE, "").strip()
    if token:
        db.delete_auth_session(token)
    response = make_response(jsonify({"ok": True}))
    response.delete_cookie(AUTH_COOKIE, path="/")
    return response


@app.post("/api/auth/forgot-password")
def api_auth_forgot_password():
    payload = request.get_json(silent=True) or {}
    email = str(payload.get("email", "")).strip().lower()
    if not _valid_email(email):
        return jsonify({"error": "invalid_email"}), 400

    reset = db.create_password_reset(email)
    if not reset:
        return jsonify({"ok": True, "message": "If the account exists, a reset token has been created."})

    return jsonify(
        {
            "ok": True,
            "message": "Reset token created.",
            "reset_token": reset["token"],
            "expires_at": reset["expires_at"],
            "delivery": "manual",
        }
    )


@app.post("/api/auth/reset-password")
def api_auth_reset_password():
    payload = request.get_json(silent=True) or {}
    token = str(payload.get("token", "")).strip()
    password = str(payload.get("password", ""))

    if not token:
        return jsonify({"error": "missing_token"}), 400
    if not _valid_password(password):
        return jsonify({"error": "invalid_password"}), 400

    user = db.consume_password_reset(token, password)
    if not user:
        return jsonify({"error": "invalid_or_expired_token"}), 400

    session = db.create_auth_session(user["id"], remember_me=True)
    return _auth_response({"authenticated": True, "user": user, "remember_me": True}, session)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    app.run(host="0.0.0.0", port=port)
