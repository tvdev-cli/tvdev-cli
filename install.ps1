# unified-tvdevelopment-cli — Windows installer
# Run: iwr -useb https://raw.githubusercontent.com/FernandoHaeser/unified-tvdevelopment-cli/main/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$Package = "unified-tvdevelopment-cli"
$Bin     = "tvdev"

function Write-Banner {
  Write-Host ""
  Write-Host "  [TV Dev Manager]" -ForegroundColor Cyan
  Write-Host "  Universal Smart TV Development CLI" -ForegroundColor DarkGray
  Write-Host "  LG webOS · Samsung Tizen · Amazon Fire TV · Android TV" -ForegroundColor DarkGray
  Write-Host ""
}

function Write-Step  { param($msg) Write-Host "`n  > $msg" -ForegroundColor Cyan }
function Write-Ok    { param($msg) Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Warn  { param($msg) Write-Host "  [!!] $msg" -ForegroundColor Yellow }
function Write-Fail  { param($msg) Write-Host "  [XX] $msg" -ForegroundColor Red; exit 1 }

Write-Banner

# Node.js
Write-Step "Checking Node.js"
try {
  $nodeVer = (node --version 2>$null)
  Write-Ok "Node.js $nodeVer"
} catch {
  Write-Fail "Node.js not found. Install from https://nodejs.org"
}

# npm
Write-Step "Checking npm"
try {
  $npmVer = (npm --version 2>$null)
  Write-Ok "npm $npmVer"
} catch {
  Write-Fail "npm not found."
}

# Install
Write-Step "Installing $Package"
npm install -g $Package
Write-Ok "$Package installed"

# Verify
Write-Step "Verifying"
try {
  $binPath = (Get-Command $Bin -ErrorAction Stop).Path
  Write-Ok "$Bin -> $binPath"
} catch {
  Write-Warn "$Bin not found in PATH. You may need to restart your terminal."
}

# Platform tools check
Write-Step "Checking platform-specific tools"

if (Get-Command "ares-setup-device" -ErrorAction SilentlyContinue) {
  Write-Ok "ares-cli (LG webOS) found"
} else {
  Write-Warn "ares-cli not found. Install: npm install -g @webosose/ares-cli"
}

if (Get-Command "sdb" -ErrorAction SilentlyContinue) {
  Write-Ok "sdb (Samsung Tizen) found"
} else {
  Write-Warn "sdb not found. Install Tizen Studio from developer.samsung.com/smarttv"
}

if (Get-Command "adb" -ErrorAction SilentlyContinue) {
  Write-Ok "adb (Amazon Fire TV / Android TV) found"
} else {
  Write-Warn "adb not found. Install Android SDK Platform Tools"
}

Write-Host ""
Write-Host "  Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "  Launch TV Dev Manager: " -NoNewline
Write-Host $Bin -ForegroundColor Cyan
Write-Host ""
