@echo off
echo ===========================================
echo   Copilot Agent Tools - Quick Publish
echo ===========================================
echo.

echo Step 1: Cleaning build...
if exist "out" rmdir /s /q "out"
if exist "copilot-agent-tools.vsix" del "copilot-agent-tools.vsix"

echo Step 2: Installing dependencies...
call npm ci

echo Step 3: Compiling TypeScript...
call npm run compile
if %errorlevel% neq 0 (
    echo ERROR: TypeScript compilation failed!
    pause
    exit /b 1
)

echo Step 4: Building webview...
call npm run build-webview
if %errorlevel% neq 0 (
    echo ERROR: Webview build failed!
    pause
    exit /b 1
)

echo Step 5: Packaging extension...
call npx vsce package --out copilot-agent-tools.vsix
if %errorlevel% neq 0 (
    echo ERROR: Extension packaging failed!
    pause
    exit /b 1
)

echo.
echo ===========================================
echo   Publishing preparation completed!
echo ===========================================
echo Package: copilot-agent-tools.vsix
echo.
echo Next steps:
echo   1. Test: code --install-extension copilot-agent-tools.vsix
echo   2. Publish: npx vsce publish
echo.
pause
