#!/usr/bin/env bash
# unified-tvdevelopment-cli — one-line installer
# Supports: LG webOS, Samsung Tizen, Amazon Fire TV, Android TV
#
#   curl -fsSL https://raw.githubusercontent.com/FernandoHaeser/unified-tvdevelopment-cli/main/install.sh | bash
#
set -euo pipefail

PACKAGE="unified-tvdevelopment-cli"
BIN="tvdev"
REQUIRED_NODE=18
NVM_VERSION="v0.39.7"
INSTALL_NODE_VERSION="20"

if [ -t 1 ]; then
  INDIGO='\033[38;5;99m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
  RED='\033[0;31m'; BOLD='\033[1m'; DIM='\033[2m'; RESET='\033[0m'
else
  INDIGO=''; GREEN=''; YELLOW=''; RED=''; BOLD=''; DIM=''; RESET=''
fi

banner() {
  echo ""
  echo -e "${BOLD}${INDIGO}  ◉  TV Dev Manager${RESET}"
  echo -e "  ${INDIGO}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
  echo -e "  ${DIM}Universal Smart TV Development CLI${RESET}"
  echo -e "  ${DIM}LG webOS · Samsung Tizen · Amazon Fire TV · Android TV${RESET}"
  echo ""
}

step()  { echo -e "\n${BOLD}${INDIGO}  ▶  $*${RESET}"; }
ok()    { echo -e "  ${GREEN}✓${RESET}  $*"; }
info()  { echo -e "  ${INDIGO}●${RESET}  $*"; }
warn()  { echo -e "  ${YELLOW}⚠${RESET}  $*"; }
skip()  { echo -e "  ${DIM}–  $* (skipped)${RESET}"; }
fail()  { echo -e "\n  ${RED}✗  $*${RESET}\n"; exit 1; }

detect_shell_rc() {
  case "${SHELL:-}" in
    */zsh)  echo "$HOME/.zshrc"  ;;
    */bash)
      [ -f "$HOME/.bash_profile" ] && echo "$HOME/.bash_profile" || echo "$HOME/.bashrc"
      ;;
    */fish) echo "$HOME/.config/fish/config.fish" ;;
    *)      echo "$HOME/.profile" ;;
  esac
}

idempotent_path_export() {
  local bin_dir rc_file export_line
  bin_dir=$(npm prefix -g 2>/dev/null)/bin
  rc_file=$(detect_shell_rc)

  if echo ":${PATH}:" | grep -q ":${bin_dir}:"; then
    ok "PATH already contains npm global bin"
    return
  fi

  if [[ "${SHELL:-}" == */fish ]]; then
    export_line="set -gx PATH \$PATH ${bin_dir}"
  else
    export_line="export PATH=\"\$PATH:${bin_dir}\""
  fi

  if [ -f "$rc_file" ] && grep -qF "$bin_dir" "$rc_file" 2>/dev/null; then
    ok "PATH entry already in ${rc_file}"
    return
  fi

  echo "" >> "$rc_file"
  echo "# added by unified-tvdevelopment-cli installer" >> "$rc_file"
  echo "$export_line" >> "$rc_file"
  ok "Added PATH entry to ${rc_file}"
  export PATH="${PATH}:${bin_dir}"
}

# ── Idempotency ───────────────────────────────────────────────────────────────
banner

step "Checking existing installation"

if command -v "$BIN" &>/dev/null; then
  INSTALLED_VER=$(npm list -g --depth=0 "$PACKAGE" 2>/dev/null \
    | grep "$PACKAGE" | sed 's/.*@//' | tr -d '[:space:]' || true)
  LATEST_VER=$(npm show "$PACKAGE" version 2>/dev/null || true)

  ok "${BIN} already installed"
  [ -n "$INSTALLED_VER" ] && info "Installed : ${INSTALLED_VER}"
  [ -n "$LATEST_VER"    ] && info "Latest    : ${LATEST_VER}"

  if [ -n "$INSTALLED_VER" ] && [ "$INSTALLED_VER" = "$LATEST_VER" ]; then
    ok "Already up to date — nothing to do"
    echo ""
    echo -e "  ${BOLD}Run: ${INDIGO}${BIN}${RESET}"
    echo ""
    exit 0
  fi
else
  info "${BIN} not yet installed — starting fresh install"
fi

# ── Node.js ───────────────────────────────────────────────────────────────────
step "Checking Node.js"

install_node_via_nvm() {
  warn "Node.js not found — installing via nvm"
  export NVM_DIR="${HOME}/.nvm"
  curl -fsSL "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
  nvm install "$INSTALL_NODE_VERSION" --lts
  nvm use "$INSTALL_NODE_VERSION"
  nvm alias default "$INSTALL_NODE_VERSION"
  ok "Node.js $(node --version) installed via nvm"
}

if ! command -v node &>/dev/null; then
  NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
    if ! command -v node &>/dev/null; then nvm install "$INSTALL_NODE_VERSION" --lts && nvm use "$INSTALL_NODE_VERSION"; fi
  else
    install_node_via_nvm
  fi
fi

! command -v node &>/dev/null && fail "Node.js install failed. Install manually: https://nodejs.org"

NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
[ "$NODE_MAJOR" -lt "$REQUIRED_NODE" ] && fail "Node.js ${REQUIRED_NODE}+ required. Current: $(node --version)"

ok "Node.js $(node --version)"

# ── npm ───────────────────────────────────────────────────────────────────────
step "Checking npm"
! command -v npm &>/dev/null && fail "npm not found."
ok "npm $(npm --version)"

# ── Install ───────────────────────────────────────────────────────────────────
step "Installing ${PACKAGE}"
info "Running: npm install -g ${PACKAGE}"
echo ""
npm install -g "$PACKAGE"
echo ""
ok "${PACKAGE} installed"

# ── PATH ──────────────────────────────────────────────────────────────────────
step "Setting up PATH"
idempotent_path_export
hash -r 2>/dev/null || true

if command -v "$BIN" &>/dev/null; then
  ok "${BIN} is in PATH → $(command -v ${BIN})"
else
  warn "${BIN} not in PATH for this session. Restart your terminal or:"
  echo -e "\n  ${BOLD}source $(detect_shell_rc)${RESET}\n"
fi

# ── Platform tools ────────────────────────────────────────────────────────────
step "Checking platform-specific tools"

if command -v ares-setup-device &>/dev/null; then
  ok "ares-cli (LG webOS) → $(command -v ares-setup-device)"
else
  warn "ares-cli not found. Install for webOS: npm install -g @webosose/ares-cli"
fi

if command -v sdb &>/dev/null; then
  ok "sdb (Samsung Tizen) → $(command -v sdb)"
else
  warn "sdb not found. Install Tizen Studio from developer.samsung.com/smarttv"
fi

if command -v adb &>/dev/null; then
  ok "adb (Amazon Fire TV / Android TV) → $(command -v adb)"
else
  warn "adb not found. Install: brew install android-platform-tools (macOS) or Android Studio SDK"
fi

if command -v inputd-cli &>/dev/null; then
  ok "inputd-cli (Amazon Fire TV input) → $(command -v inputd-cli)"
else
  warn "inputd-cli not found (optional — Amazon Fire TV remote input simulation)"
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${INDIGO}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}${GREEN}  ✓  Installation complete!${RESET}"
echo ""
echo -e "  Launch TV Dev Manager:  ${BOLD}${INDIGO}${BIN}${RESET}"
echo ""
echo -e "  ${DIM}GitHub : https://github.com/FernandoHaeser/unified-tvdevelopment-cli${RESET}"
echo -e "  ${DIM}npm    : https://npmjs.com/package/unified-tvdevelopment-cli${RESET}"
echo ""
