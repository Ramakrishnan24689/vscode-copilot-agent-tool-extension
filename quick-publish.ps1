# Copilot Agent Tools - Publishing Script
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  Copilot Agent Tools - Quick Publish" -ForegroundColor Yellow
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous builds
Write-Host "Step 1: Cleaning build..." -ForegroundColor Green
if (Test-Path "out") { Remove-Item "out" -Recurse -Force }
if (Test-Path "copilot-agent-tools.vsix") { Remove-Item "copilot-agent-tools.vsix" }

# Step 2: Install dependencies
Write-Host "Step 2: Installing dependencies..." -ForegroundColor Green
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm ci failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Step 3: Compile TypeScript
Write-Host "Step 3: Compiling TypeScript..." -ForegroundColor Green
npm run compile
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: TypeScript compilation failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Step 4: Build webview
Write-Host "Step 4: Building webview..." -ForegroundColor Green
npm run build-webview
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Webview build failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Step 5: Package extension
Write-Host "Step 5: Packaging extension..." -ForegroundColor Green
npx vsce package --out copilot-agent-tools.vsix
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Extension packaging failed!" -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

# Success
Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "  Publishing preparation completed!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Package: copilot-agent-tools.vsix" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Test: code --install-extension copilot-agent-tools.vsix" -ForegroundColor Gray
Write-Host "  2. Publish: npx vsce publish" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to continue"
