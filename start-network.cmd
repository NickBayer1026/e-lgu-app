@echo off
REM ============================================================
REM  e-LGU - Start production server on the local network
REM  Access from other devices: http://192.168.5.172:3000
REM ============================================================
cd /d "%~dp0"

echo Building e-LGU production bundle...
call npm.cmd run build
if errorlevel 1 (
  echo Build failed. Check the error above.
  pause
  exit /b 1
)

echo.
echo Starting server bound to all network interfaces...
echo   Local:   http://localhost:3000
echo   Network: http://192.168.5.172:3000
echo   (Other devices on the same Wi-Fi can open the Network URL)
echo.
echo Press Ctrl+C to stop.
call npm.cmd start -- -H 0.0.0.0
pause