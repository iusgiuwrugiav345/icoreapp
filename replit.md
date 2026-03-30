# Replit.md

## Overview

This is a Telegram bot for downloading iOS .IPA files (games and applications). Users can search for games, download IPA files, and purchase premium subscriptions for unlimited downloads. The bot features a freemium model with 5 free downloads, after which users need a premium subscription.

Key features:
- Game/app search and IPA file downloads
- User profile management with download tracking
- Premium subscription system with CryptoBot payment integration
- Download history tracking
- Admin functionality for managing content
- Keep-alive Flask server for persistent hosting

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Bot Framework
- **Framework**: aiogram (Python async Telegram Bot framework)
- **Pattern**: Event-driven with message handlers and callback query handlers
- **Rationale**: aiogram provides async support for handling multiple users efficiently

### Database Layer
- **Technology**: SQLite with two separate database files
- **Design Decision**: Separate databases for users (`users.db`) and apps (`apps.db`)
- **Tables**:
  - `users`: Stores user_id, downloads_left, is_premium status, last_active timestamp
  - `apps`: Stores game/app name, download URL, content_type, date_added
  - `suggestions`: User-submitted app suggestions with approval workflow
  - `downloads`: Download history tracking

### Keep-Alive System
- **Technology**: Flask web server running on separate thread
- **Purpose**: Prevents the bot from going idle on hosting platforms
- **Implementation**: Simple HTTP endpoint on port 8080 returning "I'm alive!"

### UI/UX Pattern
- **Main Interface**: Reply keyboard with persistent action buttons
- **Interactive Elements**: Inline keyboards for specific actions (downloads, payments, about)
- **Input Method**: Text-based game search via input field placeholder

### Content Management
- Game categories defined in `update_categories.py` for organization
- Database seeding via `create_db.py` with predefined game entries
- Image assets stored in `attached_assets/` directory

## External Dependencies

### Telegram Bot API
- **Library**: aiogram
- **Purpose**: Core bot functionality, message handling, keyboards

### CryptoBot Payment API
- **Endpoint**: `https://pay.crypt.bot/api/`
- **Purpose**: Premium subscription payments
- **Currency**: USDT equivalent ($0.60 subscription price)

### HTTP Libraries
- **aiohttp**: Async HTTP client for API calls
- **requests**: Synchronous HTTP requests

### Image Processing
- **Pillow (PIL)**: Image resizing for Telegram's size limits

### Web Framework
- **Flask**: Keep-alive HTTP server

### Configuration
- API tokens and keys stored in `config.py`
- Admin user IDs for privileged operations
- Download limits and pricing constants