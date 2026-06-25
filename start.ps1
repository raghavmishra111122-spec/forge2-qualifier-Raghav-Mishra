# ZenFlow Kanban Startup Script
# This script reloads the local system environment PATH (to detect winget php) and runs both Laravel + Vite servers.

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "⚡ Starting ZenFlow Kanban Backend (Laravel API)..." -ForegroundColor Indigo
Start-Process php -ArgumentList "backend/artisan serve --port=8000" -NoNewWindow

Write-Host "⚡ Starting ZenFlow Kanban Frontend (React Vite)..." -ForegroundColor Cyan
Start-Process npm -ArgumentList "run dev" -WorkingDirectory frontend -NoNewWindow

Write-Host "✅ Both servers are booting!" -ForegroundColor Green
Write-Host "- API Endpoint: http://localhost:8000/api" -ForegroundColor Yellow
Write-Host "- Frontend Client: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Please open http://localhost:5173 in your browser to experience ZenFlow Kanban!" -ForegroundColor Green
