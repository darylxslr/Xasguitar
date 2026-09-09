@echo off
setlocal

set "BACKEND_DIR=backend"
set "FRONTEND_DIR=frontend"

if "%~1"=="" goto :usage
if "%~1"=="backend" goto :backend
if "%~1"=="frontend" goto :frontend
if "%~1"=="both" goto :both
if "%~1"=="test" goto :test
if "%~1"=="build" goto :build
goto :usage

:usage
echo.
echo Usage: run.bat ^<command^>
echo.
echo Commands:
echo   backend  - Install deps and start the FastAPI backend (uvicorn)
echo   frontend - Install deps and start the Next.js dev server
echo   both     - Start backend and frontend in separate windows
echo   test     - Run backend tests (pytest)
echo   build    - Build the frontend for production
echo.
exit /b 1

:backend
echo.
echo ========================================
echo  Starting Backend (FastAPI + Uvicorn)
echo ========================================
echo.
cd /d "%BACKEND_DIR%"

echo [1/2] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies.
    exit /b 1
)

echo.
echo [2/2] Starting uvicorn on http://localhost:8000 ...
echo.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
exit /b

:frontend
echo.
echo ========================================
echo  Starting Frontend (Next.js Dev Server)
echo ========================================
echo.
cd /d "%FRONTEND_DIR%"

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies.
    exit /b 1
)

echo.
echo [2/2] Starting Next.js dev server...
echo.
call npm run dev
exit /b

:both
echo.
echo ========================================
echo  Starting Both Servers
echo ========================================
echo.

echo Launching backend in a new window...
start "Xasguitar Backend" cmd /c "run.bat backend"

timeout /t 3 /nobreak >nul

echo Launching frontend in a new window...
start "Xasguitar Frontend" cmd /c "run.bat frontend"

echo.
echo Servers are starting. Close this window to leave them running.
echo   - Backend: http://localhost:8000
echo   - Frontend: http://localhost:3000
echo.
echo Run 'run.bat test' to run backend tests.
echo Run 'run.bat build' to build the frontend for production.
echo.
exit /b 0

:test
echo.
echo ========================================
echo  Running Backend Tests (pytest)
echo ========================================
echo.
cd /d "%BACKEND_DIR%"
pytest -v
exit /b

:build
echo.
echo ========================================
echo  Building Frontend (Production)
echo ========================================
echo.
cd /d "%FRONTEND_DIR%"
call npm run build
exit /b
