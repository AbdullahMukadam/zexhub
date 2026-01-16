@echo off
echo Starting GitHub OAuth Backend Server...
echo.
cd /d "%~dp0"
echo Checking environment variables...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create a .env file with your GitHub OAuth credentials.
    echo.
    echo Example:
    echo GITHUB_CLIENT_ID=your_client_id
    echo GITHUB_CLIENT_SECRET=your_client_secret
    echo PORT=5000
    pause
    exit /b 1
)

echo Environment file found ✓
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting server...
call npm start
