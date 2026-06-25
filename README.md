# ZenFlow Kanban

ZenFlow Kanban is a premium, full-stack project management application inspired by modern work streams, built with a **Laravel 12 API backend** and a **React + Vite frontend**.

## Features

- **Decoupled Architecture**: Separate backend (Laravel SQLite database) and frontend (Vite SPA).
- **Core Kanban Entities**: Support for Boards, Lists, and Cards.
- **Card Customization**:
  - Edit card titles and descriptions.
  - Drag/move cards between lists.
  - Set colored tags (Urgent, Feature, Bug, Design) with HSL values.
  - Assign workspace members to specific tasks.
  - Set due dates with visual overdue flags (glowing warnings for overdue tasks).
- **Premium Dark Aesthetics**: Styled with high-fidelity custom CSS using the modern **Plus Jakarta Sans** font and glassmorphic micro-animations.

## Models & Routing Rationale

- **Brain (Hermes Agent / Planning)**: Guided by **Google Gemini 2.5 Flash** due to its generous token limits, superior context windows, and structured execution planning.
- **Hands (OpenClaw / Coding)**: Powered by **Ollama qwen2.5-coder** (local) and **Groq llama-3.3-70b-versatile** for fast, reliable, and free code generation.

## Project Structure

```
zenflow-kanban/
├── backend/          # Laravel 12 API
│   ├── app/          # Models, Request Validators, and REST Controllers
│   ├── database/     # DB Migrations + Seeders
│   ├── routes/api.php
│   └── .env.example
├── frontend/         # React + Vite SPA
│   ├── src/          # Components, CSS variables, Pages, and API services
│   ├── index.html
│   └── vite.config.js
├── skills/
│   └── status-report/SKILL.md  # Reusable status skill for Hermes
├── ARCHITECTURE.md   # System architecture and channel schema
├── agent-log.md      # Unedited loop execution log
├── openclaw.json     # Coding agent configs
├── config.yaml       # Hermes agent configuration
├── .env.example      # Project root environment variables
└── README.md         # This documentation
```

## Quick Start (Local Run)

### Prerequisites
- **PHP 8.2+** (with openssl, pdo_sqlite, sqlite3, and zip extensions enabled)
- **Composer**
- **Node.js 22+ & npm**

### 1. Setup Backend (Laravel)
```bash
cd backend
composer install --ignore-platform-reqs
cp .env.example .env
php artisan key:generate
# Create sqlite database
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
```
The REST API will boot at `http://localhost:8000/api`.

### 2. Setup Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
The frontend Vite server will start at `http://localhost:5173`. Open this URL in your browser to interact with the application.

## Live URL

- **Frontend Deployment**: `https://zenflow-kanban.vercel.app/`
- **Backend API**: `https://zenflow-api.onrender.com`

---
*Created as part of the Forge 2 Qualifier - Edition 1.*
