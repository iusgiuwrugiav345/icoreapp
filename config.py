import os

TOKEN = "8588396631:AAH3Vs064g_9esWe09EO8TeNVmLRLmZRQ6c"
# Ensure databases use absolute paths (useful when running webapp from different cwd)
BASE_DIR = os.path.dirname(__file__)
DB_NAME_USERS = os.path.join(BASE_DIR, "users.db")
DB_NAME_APPS = os.path.join(BASE_DIR, "apps.db")

# Лимиты
FREE_DOWNLOADS = 5  # Сколько раз можно скачать бесплатно
PRICE = 0.60  # Цена подписки (например, в USDT эквиваленте)

# URL of the Telegram Web App
WEBAPP_URL = "https://boostixnet.onrender.com/webapp/?v=12"

# API-ключи для оплаты
CRYPTOBOT_API = "451092:AAqI0nRURGaWhW5rHy0rFk3T6z6r1wYS87U"

ADMINS = [7120639769]  # Замени на свой Telegram ID
ADMIN_CHAT_ID = ADMINS[0]  # ???? ????? ??????? (????? ???????? ?? ???/?????)

# Photo ID for premium subscription message
PREMIUM_PHOTO_ID = "attached_assets/IMG_3562.jpeg"
