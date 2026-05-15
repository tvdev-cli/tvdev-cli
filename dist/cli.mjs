#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.js
import React19 from "react";
import { render } from "ink";

// src/App.js
import React18, { useState as useState15 } from "react";
import { Box as Box18, useInput as useInput14, useApp as useApp2 } from "ink";

// src/components/Header.js
import React from "react";
import { Box, Text } from "ink";

// src/theme.js
import chalk from "chalk";
var PLATFORM_IDS = ["webos", "tizen", "amazon", "android"];
var PLATFORM_META = {
  webos: { label: "LG webOS", color: "#00C3E3", icon: "\u2B21", hint: "ares-cli" },
  tizen: { label: "Samsung Tizen", color: "#4C7BF4", icon: "\u25C8", hint: "tizen + sdb" },
  amazon: { label: "Amazon Fire TV", color: "#FF9900", icon: "\u25C6", hint: "adb + inputd-cli" },
  android: { label: "Android TV", color: "#3DDC84", icon: "\u25C9", hint: "adb + gradle" }
};
var COLORS = {
  primary: "#818CF8",
  accent: "#F59E0B",
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F97316",
  muted: "#64748B",
  text: "#E2E8F0",
  dim: "#475569",
  highlight: "#C084FC"
};
var c = {
  primary: chalk.hex(COLORS.primary),
  accent: chalk.hex(COLORS.accent),
  success: chalk.hex(COLORS.success),
  error: chalk.hex(COLORS.error),
  warning: chalk.hex(COLORS.warning),
  muted: chalk.hex(COLORS.muted),
  text: chalk.hex(COLORS.text),
  dim: chalk.hex(COLORS.dim),
  highlight: chalk.hex(COLORS.highlight),
  bold: chalk.bold,
  primaryBold: chalk.hex(COLORS.primary).bold,
  accentBold: chalk.hex(COLORS.accent).bold,
  successBold: chalk.hex(COLORS.success).bold,
  errorBold: chalk.hex(COLORS.error).bold,
  warningBold: chalk.hex(COLORS.warning).bold,
  platform: (p) => chalk.hex(PLATFORM_META[p]?.color ?? COLORS.primary)
};
var ICONS = {
  dashboard: "\u25C9",
  device: "\u2B21",
  generate: "\u2726",
  package: "\u229F",
  apps: "\u2295",
  logs: "\u2261",
  transfer: "\u21C4",
  shell: "$",
  debug: "\u25CE",
  build: "\u2699",
  input: "\u25C8",
  emulator: "\u25A3",
  check: "\u2713",
  cross: "\u2717",
  warn: "\u26A0",
  info: "\u25CF",
  arrow: "\u203A",
  arrowRight: "\u2192",
  connected: "\u25CF",
  disconnected: "\u25CB",
  running: "\u25B6",
  stopped: "\u25A0",
  selected: "\u25B6",
  spinner: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"]
};
var NAV_ITEMS = {
  webos: [
    { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { id: "devices", label: "Devices", icon: ICONS.device },
    { id: "generate", label: "Generate App", icon: ICONS.generate },
    { id: "deploy", label: "Package & Deploy", icon: ICONS.package },
    { id: "apps", label: "App Manager", icon: ICONS.apps },
    { id: "logs", label: "Log Viewer", icon: ICONS.logs },
    { id: "transfer", label: "File Transfer", icon: ICONS.transfer },
    { id: "shell", label: "Shell", icon: ICONS.shell },
    { id: "inspector", label: "Inspector", icon: ICONS.debug }
  ],
  tizen: [
    { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { id: "devices", label: "Devices", icon: ICONS.device },
    { id: "generate", label: "Generate App", icon: ICONS.generate },
    { id: "deploy", label: "Package & Deploy", icon: ICONS.package },
    { id: "apps", label: "App Manager", icon: ICONS.apps },
    { id: "logs", label: "Log Viewer", icon: ICONS.logs },
    { id: "transfer", label: "File Transfer", icon: ICONS.transfer },
    { id: "shell", label: "Shell", icon: ICONS.shell },
    { id: "emulator", label: "Emulator", icon: ICONS.emulator }
  ],
  amazon: [
    { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { id: "devices", label: "Devices", icon: ICONS.device },
    { id: "deploy", label: "Install APK", icon: ICONS.package },
    { id: "apps", label: "App Manager", icon: ICONS.apps },
    { id: "input", label: "Input Simulator", icon: ICONS.input },
    { id: "logs", label: "Log Viewer", icon: ICONS.logs },
    { id: "transfer", label: "File Transfer", icon: ICONS.transfer },
    { id: "shell", label: "Shell", icon: ICONS.shell },
    { id: "inspector", label: "Debug Info", icon: ICONS.debug }
  ],
  android: [
    { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { id: "devices", label: "Devices", icon: ICONS.device },
    { id: "build", label: "Build", icon: ICONS.build },
    { id: "deploy", label: "Install APK", icon: ICONS.package },
    { id: "apps", label: "App Manager", icon: ICONS.apps },
    { id: "logs", label: "Log Viewer", icon: ICONS.logs },
    { id: "transfer", label: "File Transfer", icon: ICONS.transfer },
    { id: "shell", label: "Shell", icon: ICONS.shell },
    { id: "emulator", label: "Emulator", icon: ICONS.emulator }
  ]
};

// src/components/Header.js
function Header({ currentDevice, platform, onChangePlatform }) {
  const meta = platform ? PLATFORM_META[platform] : null;
  const width = process.stdout.columns || 80;
  const deviceText = currentDevice ? `${ICONS.connected} ${currentDevice.name} (${currentDevice.host})` : `${ICONS.disconnected} No device`;
  return /* @__PURE__ */ React.createElement(
    Box,
    {
      borderStyle: "round",
      borderColor: meta?.color ?? "gray",
      paddingX: 1,
      width,
      justifyContent: "space-between"
    },
    /* @__PURE__ */ React.createElement(Box, { gap: 1 }, /* @__PURE__ */ React.createElement(Text, { bold: true, color: meta?.color ?? "white" }, meta?.icon ?? "\u25C9", "  TV Dev Manager"), meta && /* @__PURE__ */ React.createElement(Text, { color: meta.color, dimColor: true }, "[", meta.label, "]")),
    /* @__PURE__ */ React.createElement(Box, { gap: 2 }, /* @__PURE__ */ React.createElement(Text, { color: currentDevice ? "green" : "gray" }, deviceText), platform && /* @__PURE__ */ React.createElement(Text, { dimColor: true }, "[~] switch platform"))
  );
}

// src/components/Sidebar.js
import React2 from "react";
import { Box as Box2, Text as Text2 } from "ink";
function Sidebar({ menuIndex, currentScreen, focused, platform }) {
  const items = platform ? NAV_ITEMS[platform] : [];
  const meta = platform ? PLATFORM_META[platform] : null;
  const color = meta?.color ?? "gray";
  return /* @__PURE__ */ React2.createElement(
    Box2,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: focused ? color : "gray",
      width: 24,
      paddingX: 1
    },
    /* @__PURE__ */ React2.createElement(Text2, { bold: true, color: focused ? color : "gray" }, "Navigation"),
    /* @__PURE__ */ React2.createElement(Box2, { flexDirection: "column", marginTop: 1 }, items.map((item, i) => {
      const isCursor = focused && i === menuIndex;
      const isCurrent = !focused && item.id === currentScreen;
      const isActive = isCursor || isCurrent;
      return /* @__PURE__ */ React2.createElement(Box2, { key: item.id }, /* @__PURE__ */ React2.createElement(
        Text2,
        {
          bold: isActive,
          color: isCursor ? color : isCurrent ? "white" : "gray"
        },
        isCursor ? "\u25B6 " : "  ",
        item.icon,
        " ",
        item.label
      ));
    })),
    /* @__PURE__ */ React2.createElement(Box2, { marginTop: 1 }, /* @__PURE__ */ React2.createElement(Text2, { dimColor: true }, "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500")),
    /* @__PURE__ */ React2.createElement(Text2, { dimColor: true, color: "gray" }, "\u2191\u2193 navigate"),
    /* @__PURE__ */ React2.createElement(Text2, { dimColor: true, color: "gray" }, "\u23CE  select")
  );
}

// src/components/StatusBar.js
import React3 from "react";
import { Box as Box3, Text as Text3 } from "ink";
var SIDEBAR_HINTS = "\u2191\u2193 Navigate  \u23CE Select  q Quit";
var SCREEN_HINTS = "Esc Back  Tab Focus Sidebar  q Quit";
function StatusBar({ sidebarFocused, platform }) {
  const meta = platform ? PLATFORM_META[platform] : null;
  const width = (process.stdout.columns || 80) - 4;
  const hints = sidebarFocused ? SIDEBAR_HINTS : SCREEN_HINTS;
  return /* @__PURE__ */ React3.createElement(
    Box3,
    {
      borderStyle: "round",
      borderColor: "gray",
      paddingX: 1,
      width: process.stdout.columns || 80,
      justifyContent: "space-between"
    },
    /* @__PURE__ */ React3.createElement(Text3, { dimColor: true }, hints),
    meta && /* @__PURE__ */ React3.createElement(Text3, { color: meta.color, dimColor: true }, meta.hint)
  );
}

// src/components/PlatformPicker.js
import React4, { useState } from "react";
import { Box as Box4, Text as Text4, useInput, useApp } from "ink";
function PlatformPicker({ onSelect }) {
  const { exit } = useApp();
  const [cursor, setCursor] = useState(0);
  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      exit();
      return;
    }
    if (input === "q") {
      exit();
      return;
    }
    if (key.upArrow) setCursor((i) => Math.max(0, i - 1));
    if (key.downArrow) setCursor((i) => Math.min(PLATFORM_IDS.length - 1, i + 1));
    if (key.return) onSelect(PLATFORM_IDS[cursor]);
    const num = parseInt(input);
    if (num >= 1 && num <= PLATFORM_IDS.length) {
      onSelect(PLATFORM_IDS[num - 1]);
    }
  });
  const cols = process.stdout.columns || 80;
  return /* @__PURE__ */ React4.createElement(Box4, { flexDirection: "column", width: cols, padding: 2, gap: 1 }, /* @__PURE__ */ React4.createElement(
    Box4,
    {
      borderStyle: "double",
      borderColor: "#818CF8",
      paddingX: 2,
      paddingY: 1,
      flexDirection: "column",
      alignItems: "center"
    },
    /* @__PURE__ */ React4.createElement(Text4, { bold: true, color: "#818CF8" }, "\u25C9  TV Dev Manager"),
    /* @__PURE__ */ React4.createElement(Text4, { color: "#64748B" }, "Universal Smart TV Development CLI")
  ), /* @__PURE__ */ React4.createElement(Box4, { flexDirection: "column", borderStyle: "round", borderColor: "#475569", paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React4.createElement(Text4, { bold: true, color: "#E2E8F0" }, "Select Platform"), /* @__PURE__ */ React4.createElement(Text4, { color: "#64748B", dimColor: true }, "\u2191\u2193 navigate  \u23CE select  1-4 quick pick  q quit"), /* @__PURE__ */ React4.createElement(Box4, { flexDirection: "column", marginTop: 1, gap: 1 }, PLATFORM_IDS.map((id, i) => {
    const meta = PLATFORM_META[id];
    const active = i === cursor;
    return /* @__PURE__ */ React4.createElement(Box4, { key: id, gap: 2 }, /* @__PURE__ */ React4.createElement(Text4, { bold: true, color: active ? meta.color : "#475569" }, active ? "\u25B6" : " ", " ", i + 1, "."), /* @__PURE__ */ React4.createElement(Box4, { flexDirection: "column" }, /* @__PURE__ */ React4.createElement(Text4, { bold: active, color: active ? meta.color : "#94A3B8" }, meta.icon, "  ", meta.label), /* @__PURE__ */ React4.createElement(Text4, { color: "#64748B", dimColor: true }, "   ", meta.hint)));
  }))));
}

// src/screens/Dashboard.js
import React6, { useState as useState3, useEffect as useEffect2 } from "react";
import { Box as Box6, Text as Text6, useInput as useInput2 } from "ink";

// src/components/Loader.js
import React5, { useState as useState2, useEffect } from "react";
import { Box as Box5, Text as Text5 } from "ink";
function Loader({ label = "Loading...", color = "cyan" }) {
  const [frame, setFrame] = useState2(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % ICONS.spinner.length), 80);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ React5.createElement(Box5, null, /* @__PURE__ */ React5.createElement(Text5, { color }, ICONS.spinner[frame], " "), /* @__PURE__ */ React5.createElement(Text5, { color: "gray" }, label));
}

// src/utils/webos.js
var webos_exports = {};
__export(webos_exports, {
  INSTALL_HINT: () => INSTALL_HINT,
  addDevice: () => addDevice,
  checkAvailable: () => checkAvailable,
  closeApp: () => closeApp,
  generateApp: () => generateApp,
  getDeviceInfo: () => getDeviceInfo,
  installApp: () => installApp,
  launchApp: () => launchApp,
  launchInspector: () => launchInspector,
  listDevices: () => listDevices,
  listInstalledApps: () => listInstalledApps,
  listRunningApps: () => listRunningApps,
  listTemplates: () => listTemplates,
  packageApp: () => packageApp,
  pullFiles: () => pullFiles,
  pushFiles: () => pushFiles,
  removeApp: () => removeApp,
  removeDevice: () => removeDevice,
  runShellCommand: () => runShellCommand,
  setDefaultDevice: () => setDefaultDevice,
  spawnLogStream: () => spawnLogStream
});
import { execa } from "execa";

// src/backend/parsers/webos.js
function parseDeviceTable(output) {
  return output.split("\n").filter((l) => l.trim() && !l.startsWith("----") && !l.startsWith("name")).map((line) => {
    const parts = line.trim().split(/\s+/);
    return {
      name: parts[0] || "",
      host: parts[1] || "",
      port: parts[2] || "22",
      username: parts[3] || "root",
      default: line.includes("(default)")
    };
  }).filter((d) => d.name);
}
function parseInstalledApps(output) {
  return output.split("\n").filter((l) => l.trim() && !l.toLowerCase().startsWith("list")).map((line) => {
    const parts = line.trim().split(/\s+/);
    return { id: parts[0], version: parts[1] || "", title: parts.slice(2).join(" ") };
  }).filter((a) => a.id);
}
function parseRunningApps(output) {
  return output.split("\n").filter((l) => l.trim() && !l.toLowerCase().startsWith("running")).map((l) => l.trim()).filter(Boolean);
}
function parseTemplates(output) {
  return output.split("\n").filter((l) => l.trim() && !l.startsWith("Available")).map((l) => {
    const parts = l.trim().split(/\s{2,}/);
    return { name: parts[0], description: parts[1] || "" };
  }).filter((t) => t.name);
}
function parseIpkFilename(output, outDir) {
  const match = output.match(/[\w.-]+\.ipk/);
  return match ? `${outDir}/${match[0]}` : null;
}

// src/backend/commands/webos.js
function buildAddDeviceArgs({ name, host, port = 22, username = "root", password = "" }) {
  const args = ["--add", name, "--info", `host=${host}`, "--info", `port=${port}`, "--info", `username=${username}`];
  if (password) args.push("--info", `password=${password}`);
  return args;
}
var buildRemoveDeviceArgs = (name) => ["--remove", name];
var buildSetDefaultDeviceArgs = (name) => ["--default", name];
function buildGenerateArgs({ template, outDir, appId, title, version = "1.0.0" }) {
  const args = ["-t", template, outDir];
  if (appId) args.push("-p", `id=${appId}`);
  if (title) args.push("-p", `title=${title}`);
  if (version) args.push("-p", `version=${version}`);
  return args;
}
function buildPackageArgs({ appDir, outDir = ".", excludes = [] }) {
  const args = [appDir, "-o", outDir];
  for (const e of excludes) args.push("-e", e);
  return args;
}
function buildInstallArgs({ ipkPath, device }) {
  const args = [ipkPath];
  if (device) args.push("-d", device);
  return args;
}
function buildListAppsArgs(device) {
  const args = ["--list"];
  if (device) args.push("-d", device);
  return args;
}
function buildRemoveAppArgs({ appId, device }) {
  const args = ["--remove", appId];
  if (device) args.push("-d", device);
  return args;
}
function buildLaunchArgs({ appId, device, params }) {
  const args = [appId];
  if (device) args.push("-d", device);
  if (params) args.push("-p", params);
  return args;
}
function buildCloseArgs({ appId, device }) {
  const args = [appId, "--close"];
  if (device) args.push("-d", device);
  return args;
}
function buildRunningAppsArgs(device) {
  const args = ["--running"];
  if (device) args.push("-d", device);
  return args;
}
function buildPushArgs({ localPath, remotePath, device }) {
  const args = [localPath, remotePath];
  if (device) args.push("-d", device);
  return args;
}
function buildPullArgs({ remotePath, localPath, device }) {
  const args = [remotePath, localPath];
  if (device) args.push("-d", device);
  return args;
}
function buildShellArgs({ command, device }) {
  const args = [];
  if (device) args.push("-d", device);
  args.push("--cmd", command);
  return args;
}
function buildLogArgs({ device, follow = true, lines = 100, appId }) {
  const args = [];
  if (device) args.push("-d", device);
  if (follow) args.push("-f");
  args.push("-n", String(lines));
  if (appId) args.push("-id", appId);
  return args;
}
function buildDeviceInfoArgs(device) {
  const args = [];
  if (device) args.push("-d", device);
  return args;
}
function buildInspectorArgs({ appId, device, serviceId }) {
  const args = [appId];
  if (device) args.push("-d", device);
  if (serviceId) args.push("-s", serviceId);
  return args;
}

// src/utils/webos.js
async function checkAvailable() {
  try {
    await execa("ares-setup-device", ["--version"], { timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
async function listDevices() {
  const { stdout } = await execa("ares-setup-device", ["--listfull"], { timeout: 1e4 });
  try {
    return JSON.parse(stdout);
  } catch {
    return parseDeviceTable(stdout);
  }
}
async function addDevice(opts) {
  const { stdout } = await execa("ares-setup-device", buildAddDeviceArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function removeDevice(name) {
  const { stdout } = await execa("ares-setup-device", buildRemoveDeviceArgs(name), { timeout: 1e4 });
  return stdout;
}
async function setDefaultDevice(name) {
  const { stdout } = await execa("ares-setup-device", buildSetDefaultDeviceArgs(name), { timeout: 1e4 });
  return stdout;
}
async function listTemplates() {
  const { stdout } = await execa("ares-generate", ["--list"], { timeout: 1e4 });
  return parseTemplates(stdout);
}
async function generateApp(opts) {
  const { stdout } = await execa("ares-generate", buildGenerateArgs(opts), { timeout: 3e4 });
  return stdout;
}
async function packageApp(opts) {
  const { stdout } = await execa("ares-package", buildPackageArgs(opts), { timeout: 6e4 });
  return { output: stdout, pkgFile: parseIpkFilename(stdout, opts.outDir ?? ".") };
}
async function installApp(opts) {
  const { stdout } = await execa("ares-install", buildInstallArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function listInstalledApps(device) {
  const { stdout } = await execa("ares-install", buildListAppsArgs(device), { timeout: 15e3 });
  return parseInstalledApps(stdout);
}
async function removeApp(opts) {
  const { stdout } = await execa("ares-install", buildRemoveAppArgs(opts), { timeout: 3e4 });
  return stdout;
}
async function launchApp(opts) {
  const { stdout } = await execa("ares-launch", buildLaunchArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function closeApp(opts) {
  const { stdout } = await execa("ares-launch", buildCloseArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function listRunningApps(device) {
  const { stdout } = await execa("ares-launch", buildRunningAppsArgs(device), { timeout: 1e4 });
  return parseRunningApps(stdout);
}
async function pushFiles(opts) {
  const { stdout } = await execa("ares-push", buildPushArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function pullFiles(opts) {
  const { stdout } = await execa("ares-pull", buildPullArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function runShellCommand(opts) {
  const { stdout, stderr } = await execa("ares-shell", buildShellArgs(opts), { timeout: 3e4 });
  return (stdout || "") + (stderr || "");
}
function spawnLogStream(opts) {
  return execa("ares-log", buildLogArgs(opts), { timeout: 0 });
}
async function getDeviceInfo(device) {
  const { stdout } = await execa("ares-device", buildDeviceInfoArgs(device), { timeout: 15e3 });
  return stdout;
}
async function launchInspector(opts) {
  const { stdout } = await execa("ares-inspect", buildInspectorArgs(opts), { timeout: 3e4 });
  return stdout;
}
var INSTALL_HINT = "npm install -g @webosose/ares-cli";

// src/utils/tizen.js
var tizen_exports = {};
__export(tizen_exports, {
  INSTALL_HINT: () => INSTALL_HINT2,
  buildApp: () => buildApp,
  checkAvailable: () => checkAvailable2,
  connectDevice: () => connectDevice,
  disconnectDevice: () => disconnectDevice,
  generateApp: () => generateApp2,
  installApp: () => installApp2,
  launchApp: () => launchApp2,
  launchEmulator: () => launchEmulator,
  listDevices: () => listDevices2,
  listInstalledApps: () => listInstalledApps2,
  listTemplates: () => listTemplates2,
  packageApp: () => packageApp2,
  pullFiles: () => pullFiles2,
  pushFiles: () => pushFiles2,
  removeApp: () => removeApp2,
  runShellCommand: () => runShellCommand2,
  spawnLogStream: () => spawnLogStream2
});
import { execa as execa2 } from "execa";

// src/backend/parsers/tizen.js
function parseSdbDevices(output) {
  return output.split("\n").filter((l) => l.trim() && !l.startsWith("List of devices")).map((line) => {
    const parts = line.trim().split(/\s+/);
    const serial = parts[0] || "";
    const status = parts[1] || "";
    const extra = parts.slice(2).join(" ");
    const hostMatch = serial.match(/^(.+):(\d+)$/);
    return {
      name: extra || serial,
      serial,
      host: hostMatch ? hostMatch[1] : serial,
      port: hostMatch ? hostMatch[2] : "26101",
      status,
      default: false
    };
  }).filter((d) => d.serial && d.status === "device");
}
function parseTizenTemplates(output) {
  return output.split("\n").filter((l) => l.trim() && /^\d+\./.test(l.trim())).map((l) => {
    const match = l.trim().match(/^\d+\.\s+(\S+)\s*(.*)/);
    return match ? { name: match[1], description: match[2].trim() } : null;
  }).filter(Boolean);
}
function parseTizenApps(output) {
  return output.split("\n").filter((l) => l.includes("pkgid")).map((l) => {
    const idMatch = l.match(/pkgid\s*:\s*(\S+)/);
    const verMatch = l.match(/version\s*:\s*(\S+)/);
    return idMatch ? { id: idMatch[1], version: verMatch?.[1] || "" } : null;
  }).filter(Boolean);
}
function parseWgtFilename(output, outDir) {
  const match = output.match(/[\w.-]+\.wgt/);
  return match ? `${outDir}/${match[0]}` : null;
}

// src/backend/commands/tizen.js
function buildSdbDevicesArgs() {
  return ["devices"];
}
function buildSdbConnectArgs({ host, port = 26101 }) {
  return ["connect", `${host}:${port}`];
}
function buildSdbDisconnectArgs({ host, port = 26101 }) {
  return ["disconnect", `${host}:${port}`];
}
function buildSdbShellArgs({ command, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell");
  if (command) args.push(command);
  return args;
}
function buildSdbPushArgs({ localPath, remotePath, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("push", localPath, remotePath);
  return args;
}
function buildSdbPullArgs({ remotePath, localPath, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("pull", remotePath, localPath);
  return args;
}
function buildSdbLogArgs({ serial, follow = true }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("dlog");
  if (follow) args.push("-v", "time");
  return args;
}
function buildTizenCreateArgs({ template = "WebBasicapp", name, outDir = "." }) {
  return ["create", "web-project", "-t", template, "-n", name, "--", outDir];
}
function buildTizenBuildArgs({ projectDir }) {
  return ["build-web", "--", projectDir];
}
function buildTizenPackageArgs({ projectDir, type = "wgt", cert }) {
  const args = ["package", "-t", type];
  if (cert) args.push("-s", cert);
  args.push("--", projectDir);
  return args;
}
function buildTizenInstallArgs({ wgtPath, serial }) {
  const args = ["install"];
  if (serial) args.push("-t", serial);
  args.push("-n", wgtPath);
  return args;
}
function buildTizenRunArgs({ appId, serial }) {
  const args = ["run", "-p", appId];
  if (serial) args.push("-t", serial);
  return args;
}
function buildTizenUninstallArgs({ appId, serial }) {
  const args = ["uninstall", "-p", appId];
  if (serial) args.push("-t", serial);
  return args;
}
function buildEmulatorLaunchArgs({ name }) {
  return ["launch", "--name", name];
}

// src/utils/tizen.js
async function checkAvailable2() {
  try {
    await execa2("sdb", ["version"], { timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
async function listDevices2() {
  const { stdout } = await execa2("sdb", buildSdbDevicesArgs(), { timeout: 1e4 });
  return parseSdbDevices(stdout);
}
async function connectDevice(opts) {
  const { stdout } = await execa2("sdb", buildSdbConnectArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function disconnectDevice(opts) {
  const { stdout } = await execa2("sdb", buildSdbDisconnectArgs(opts), { timeout: 1e4 });
  return stdout;
}
async function listTemplates2() {
  const { stdout } = await execa2("tizen", ["list-templates"], { timeout: 1e4 });
  return parseTizenTemplates(stdout);
}
async function generateApp2(opts) {
  const { stdout } = await execa2("tizen", buildTizenCreateArgs(opts), { timeout: 3e4 });
  return stdout;
}
async function buildApp(opts) {
  const { stdout, stderr } = await execa2("tizen", buildTizenBuildArgs(opts), { timeout: 12e4 });
  return (stdout || "") + (stderr || "");
}
async function packageApp2(opts) {
  const { stdout } = await execa2("tizen", buildTizenPackageArgs(opts), { timeout: 6e4 });
  return { output: stdout, pkgFile: parseWgtFilename(stdout, opts.projectDir ?? ".") };
}
async function installApp2(opts) {
  const { stdout } = await execa2("tizen", buildTizenInstallArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function listInstalledApps2(device) {
  const { stdout } = await execa2("sdb", buildSdbShellArgs({ command: "0 pkgcmd -l", serial: device }), { timeout: 15e3 });
  return parseTizenApps(stdout);
}
async function launchApp2(opts) {
  const { stdout } = await execa2("tizen", buildTizenRunArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function removeApp2(opts) {
  const { stdout } = await execa2("tizen", buildTizenUninstallArgs(opts), { timeout: 3e4 });
  return stdout;
}
async function pushFiles2(opts) {
  const { stdout } = await execa2("sdb", buildSdbPushArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function pullFiles2(opts) {
  const { stdout } = await execa2("sdb", buildSdbPullArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function runShellCommand2(opts) {
  const { stdout, stderr } = await execa2("sdb", buildSdbShellArgs(opts), { timeout: 3e4 });
  return (stdout || "") + (stderr || "");
}
function spawnLogStream2(opts) {
  return execa2("sdb", buildSdbLogArgs(opts), { timeout: 0 });
}
async function launchEmulator(opts) {
  const { stdout } = await execa2("tizen", buildEmulatorLaunchArgs(opts), { timeout: 3e4 });
  return stdout;
}
var INSTALL_HINT2 = "Install Tizen Studio from developer.samsung.com/smarttv";

// src/utils/amazon.js
var amazon_exports = {};
__export(amazon_exports, {
  INSTALL_HINT: () => INSTALL_HINT3,
  checkAvailable: () => checkAvailable3,
  connectDevice: () => connectDevice2,
  disconnectDevice: () => disconnectDevice2,
  installApp: () => installApp3,
  launchApp: () => launchApp3,
  listDevices: () => listDevices3,
  listInstalledApps: () => listInstalledApps3,
  loggingCtl: () => loggingCtl,
  pullFiles: () => pullFiles3,
  pushFiles: () => pushFiles3,
  removeApp: () => removeApp3,
  runShellCommand: () => runShellCommand3,
  sendInput: () => sendInput,
  spawnLogStream: () => spawnLogStream3,
  stopApp: () => stopApp
});
import { execa as execa3 } from "execa";

// src/backend/parsers/amazon.js
function parseAdbDevices(output) {
  return output.split("\n").filter((l) => l.trim() && !l.startsWith("List of devices")).map((line) => {
    const parts = line.trim().split(/\s+/);
    const serial = parts[0] || "";
    const status = parts[1] || "";
    const hostMatch = serial.match(/^(.+):(\d+)$/);
    const modelMatch = line.match(/model:(\S+)/);
    return {
      name: modelMatch ? modelMatch[1].replace(/_/g, " ") : serial,
      serial,
      host: hostMatch ? hostMatch[1] : serial,
      port: hostMatch ? hostMatch[2] : "5555",
      status,
      default: false
    };
  }).filter((d) => d.serial && d.status === "device");
}
function parseAdbPackages(output) {
  return output.split("\n").filter((l) => l.startsWith("package:")).map((l) => ({
    id: l.replace("package:", "").trim(),
    version: ""
  }));
}

// src/backend/commands/amazon.js
function buildAdbDevicesArgs() {
  return ["devices", "-l"];
}
function buildAdbConnectArgs({ host, port = 5555 }) {
  return ["connect", `${host}:${port}`];
}
function buildAdbDisconnectArgs({ host, port = 5555 }) {
  return ["disconnect", `${host}:${port}`];
}
function buildAdbInstallArgs({ apkPath, serial, replace = true }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("install");
  if (replace) args.push("-r");
  args.push(apkPath);
  return args;
}
function buildAdbLaunchArgs({ packageName, activity, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell", "am", "start", "-n", `${packageName}/${activity}`);
  return args;
}
function buildAdbStopArgs({ packageName, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell", "am", "force-stop", packageName);
  return args;
}
function buildAdbListAppsArgs({ serial, includeSystem = false }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell", "pm", "list", "packages");
  if (!includeSystem) args.push("-3");
  return args;
}
function buildAdbUninstallArgs({ packageName, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("uninstall", packageName);
  return args;
}
function buildAdbLogcatArgs({ serial, filter, clear = false }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("logcat");
  if (clear) args.push("-c");
  if (filter) args.push(filter);
  return args;
}
function buildAdbShellArgs({ command, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell");
  if (command) args.push(command);
  return args;
}
function buildAdbPushArgs({ localPath, remotePath, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("push", localPath, remotePath);
  return args;
}
function buildAdbPullArgs({ remotePath, localPath, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("pull", remotePath, localPath);
  return args;
}
function buildInputdArgs({ key }) {
  return ["send", key];
}
function buildLoggingCtlArgs({ action }) {
  return [action];
}

// src/utils/amazon.js
async function checkAvailable3() {
  try {
    await execa3("adb", ["version"], { timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
async function listDevices3() {
  const { stdout } = await execa3("adb", buildAdbDevicesArgs(), { timeout: 1e4 });
  return parseAdbDevices(stdout);
}
async function connectDevice2(opts) {
  const { stdout } = await execa3("adb", buildAdbConnectArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function disconnectDevice2(opts) {
  const { stdout } = await execa3("adb", buildAdbDisconnectArgs(opts), { timeout: 1e4 });
  return stdout;
}
async function installApp3(opts) {
  const { stdout, stderr } = await execa3("adb", buildAdbInstallArgs(opts), { timeout: 12e4 });
  return (stdout || "") + (stderr || "");
}
async function launchApp3(opts) {
  const { stdout } = await execa3("adb", buildAdbLaunchArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function stopApp(opts) {
  const { stdout } = await execa3("adb", buildAdbStopArgs(opts), { timeout: 15e3 });
  return stdout;
}
async function listInstalledApps3(device) {
  const { stdout } = await execa3("adb", buildAdbListAppsArgs({ serial: device }), { timeout: 15e3 });
  return parseAdbPackages(stdout);
}
async function removeApp3(opts) {
  const { stdout } = await execa3("adb", buildAdbUninstallArgs(opts), { timeout: 3e4 });
  return stdout;
}
function spawnLogStream3(opts) {
  return execa3("adb", buildAdbLogcatArgs(opts), { timeout: 0 });
}
async function runShellCommand3(opts) {
  const { stdout, stderr } = await execa3("adb", buildAdbShellArgs(opts), { timeout: 3e4 });
  return (stdout || "") + (stderr || "");
}
async function pushFiles3(opts) {
  const { stdout } = await execa3("adb", buildAdbPushArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function pullFiles3(opts) {
  const { stdout } = await execa3("adb", buildAdbPullArgs(opts), { timeout: 6e4 });
  return stdout;
}
async function sendInput(key) {
  const { stdout } = await execa3("inputd-cli", buildInputdArgs({ key }), { timeout: 5e3 });
  return stdout;
}
async function loggingCtl(action) {
  const { stdout } = await execa3("LoggingCtl", buildLoggingCtlArgs({ action }), { timeout: 3e4 });
  return stdout;
}
var INSTALL_HINT3 = "Install ADB: brew install android-platform-tools (macOS) or see developer.amazon.com/docs/fire-tv/connecting-adb";

// src/utils/android.js
var android_exports = {};
__export(android_exports, {
  INSTALL_HINT: () => INSTALL_HINT4,
  buildProject: () => buildProject,
  checkAvailable: () => checkAvailable4,
  connectDevice: () => connectDevice3,
  disconnectDevice: () => disconnectDevice3,
  installApp: () => installApp4,
  launchApp: () => launchApp4,
  launchEmulator: () => launchEmulator2,
  listAvds: () => listAvds,
  listDevices: () => listDevices4,
  listInstalledApps: () => listInstalledApps4,
  pullFiles: () => pullFiles4,
  pushFiles: () => pushFiles4,
  removeApp: () => removeApp4,
  runShellCommand: () => runShellCommand4,
  spawnLogStream: () => spawnLogStream4,
  stopApp: () => stopApp2
});
import { execa as execa4 } from "execa";

// src/backend/parsers/android.js
function parseAdbDevices2(output) {
  return output.split("\n").filter((l) => l.trim() && !l.startsWith("List of devices")).map((line) => {
    const parts = line.trim().split(/\s+/);
    const serial = parts[0] || "";
    const status = parts[1] || "";
    const hostMatch = serial.match(/^(.+):(\d+)$/);
    const modelMatch = line.match(/model:(\S+)/);
    const prodMatch = line.match(/product:(\S+)/);
    return {
      name: modelMatch ? modelMatch[1].replace(/_/g, " ") : prodMatch?.[1] ?? serial,
      serial,
      host: hostMatch ? hostMatch[1] : serial,
      port: hostMatch ? hostMatch[2] : "5555",
      status,
      default: false
    };
  }).filter((d) => d.serial && d.status === "device");
}
function parseAdbPackages2(output) {
  return output.split("\n").filter((l) => l.startsWith("package:")).map((l) => ({
    id: l.replace("package:", "").trim(),
    version: ""
  }));
}
function parseAvdList(output) {
  const avds = [];
  let current = null;
  for (const line of output.split("\n")) {
    const nameMatch = line.match(/Name:\s+(.+)/);
    const typeMatch = line.match(/Type:\s+(.+)/);
    const apiMatch = line.match(/API level:\s+(\d+)/);
    if (nameMatch) {
      current = { name: nameMatch[1].trim(), type: "", api: "" };
      avds.push(current);
    }
    if (current && typeMatch) current.type = typeMatch[1].trim();
    if (current && apiMatch) current.api = apiMatch[1];
  }
  return avds;
}
function parseGradleOutput(output) {
  const successMatch = output.match(/BUILD SUCCESSFUL/);
  const failMatch = output.match(/BUILD FAILED/);
  const apkMatch = output.match(/[\w\/.-]+\.apk/);
  return {
    success: !!successMatch,
    failed: !!failMatch,
    apkPath: apkMatch ? apkMatch[0] : null
  };
}

// src/backend/commands/android.js
function buildAdbDevicesArgs2() {
  return ["devices", "-l"];
}
function buildAdbConnectArgs2({ host, port = 5555 }) {
  return ["connect", `${host}:${port}`];
}
function buildAdbDisconnectArgs2({ host, port = 5555 }) {
  return ["disconnect", `${host}:${port}`];
}
function buildAdbInstallArgs2({ apkPath, serial, replace = true }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("install");
  if (replace) args.push("-r");
  args.push(apkPath);
  return args;
}
function buildAdbLaunchArgs2({ packageName, activity, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell", "am", "start", "-n", `${packageName}/${activity}`);
  return args;
}
function buildAdbStopArgs2({ packageName, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell", "am", "force-stop", packageName);
  return args;
}
function buildAdbListAppsArgs2({ serial, includeSystem = false }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell", "pm", "list", "packages");
  if (!includeSystem) args.push("-3");
  return args;
}
function buildAdbUninstallArgs2({ packageName, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("uninstall", packageName);
  return args;
}
function buildAdbLogcatArgs2({ serial, filter, tag }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("logcat");
  if (tag) args.push(`${tag}:V`, "*:S");
  if (filter) args.push(filter);
  return args;
}
function buildAdbShellArgs2({ command, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("shell");
  if (command) args.push(command);
  return args;
}
function buildAdbPushArgs2({ localPath, remotePath, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("push", localPath, remotePath);
  return args;
}
function buildAdbPullArgs2({ remotePath, localPath, serial }) {
  const args = [];
  if (serial) args.push("-s", serial);
  args.push("pull", remotePath, localPath);
  return args;
}
function buildAvdListArgs() {
  return ["list", "avd"];
}
function buildEmulatorArgs({ avdName }) {
  return ["-avd", avdName];
}

// src/utils/android.js
async function checkAvailable4() {
  try {
    await execa4("adb", ["version"], { timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
async function listDevices4() {
  const { stdout } = await execa4("adb", buildAdbDevicesArgs2(), { timeout: 1e4 });
  return parseAdbDevices2(stdout);
}
async function connectDevice3(opts) {
  const { stdout } = await execa4("adb", buildAdbConnectArgs2(opts), { timeout: 15e3 });
  return stdout;
}
async function disconnectDevice3(opts) {
  const { stdout } = await execa4("adb", buildAdbDisconnectArgs2(opts), { timeout: 1e4 });
  return stdout;
}
async function installApp4(opts) {
  const { stdout, stderr } = await execa4("adb", buildAdbInstallArgs2(opts), { timeout: 12e4 });
  return (stdout || "") + (stderr || "");
}
async function launchApp4(opts) {
  const { stdout } = await execa4("adb", buildAdbLaunchArgs2(opts), { timeout: 15e3 });
  return stdout;
}
async function stopApp2(opts) {
  const { stdout } = await execa4("adb", buildAdbStopArgs2(opts), { timeout: 15e3 });
  return stdout;
}
async function listInstalledApps4(device) {
  const { stdout } = await execa4("adb", buildAdbListAppsArgs2({ serial: device }), { timeout: 15e3 });
  return parseAdbPackages2(stdout);
}
async function removeApp4(opts) {
  const { stdout } = await execa4("adb", buildAdbUninstallArgs2(opts), { timeout: 3e4 });
  return stdout;
}
function spawnLogStream4(opts) {
  return execa4("adb", buildAdbLogcatArgs2(opts), { timeout: 0 });
}
async function runShellCommand4(opts) {
  const { stdout, stderr } = await execa4("adb", buildAdbShellArgs2(opts), { timeout: 3e4 });
  return (stdout || "") + (stderr || "");
}
async function pushFiles4(opts) {
  const { stdout } = await execa4("adb", buildAdbPushArgs2(opts), { timeout: 6e4 });
  return stdout;
}
async function pullFiles4(opts) {
  const { stdout } = await execa4("adb", buildAdbPullArgs2(opts), { timeout: 6e4 });
  return stdout;
}
async function buildProject(opts) {
  const gradlew = opts.useWrapper ? "./gradlew" : "gradle";
  const { stdout, stderr } = await execa4(gradlew, [opts.task ?? "assembleDebug"], {
    cwd: opts.projectDir,
    timeout: 3e5
  });
  return parseGradleOutput((stdout || "") + (stderr || ""));
}
async function listAvds() {
  const { stdout } = await execa4("avdmanager", buildAvdListArgs(), { timeout: 15e3 });
  return parseAvdList(stdout);
}
async function launchEmulator2(opts) {
  return execa4("emulator", buildEmulatorArgs(opts), { timeout: 0, detached: true });
}
var INSTALL_HINT4 = "Install Android SDK: see developer.android.com/studio or brew install --cask android-studio";

// src/screens/Dashboard.js
var UTILS = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
function Dashboard({ focused, currentDevice, platform, onDeviceChange, onNavigate }) {
  const [devices, setDevices] = useState3([]);
  const [apps, setApps] = useState3([]);
  const [cliOk, setCliOk] = useState3(null);
  const [loading, setLoading] = useState3(true);
  const [menuIdx, setMenuIdx] = useState3(0);
  const meta = PLATFORM_META[platform];
  const utils = UTILS[platform];
  const navItems = NAV_ITEMS[platform];
  const quickActions = navItems.filter((n) => n.id !== "dashboard").slice(0, 6).map((n, i) => ({
    key: String(i + 1),
    label: n.label,
    screen: n.id,
    icon: n.icon
  }));
  useEffect2(() => {
    async function load() {
      setLoading(true);
      const ok = await utils.checkAvailable().catch(() => false);
      setCliOk(ok);
      if (ok) {
        const devs = await utils.listDevices().catch(() => []);
        setDevices(devs);
        const def = devs.find((d) => d.default) || devs[0];
        if (def && !currentDevice) onDeviceChange(def);
        if (def && utils.listInstalledApps) {
          const a = await utils.listInstalledApps(def.name ?? def.serial).catch(() => []);
          setApps(a);
        }
      }
      setLoading(false);
    }
    load();
  }, [platform]);
  useInput2((input, key) => {
    if (!focused) return;
    if (key.upArrow) setMenuIdx((i) => Math.max(0, i - 1));
    if (key.downArrow) setMenuIdx((i) => Math.min(quickActions.length - 1, i + 1));
    if (key.return) onNavigate(quickActions[menuIdx].screen);
    const action = quickActions.find((a) => a.key === input);
    if (action) onNavigate(action.screen);
  }, { isActive: focused });
  if (loading) {
    return /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React6.createElement(Loader, { label: `Loading ${meta.label} info...`, color: meta.color }));
  }
  return /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", padding: 1, gap: 1 }, !cliOk && /* @__PURE__ */ React6.createElement(Box6, { borderStyle: "round", borderColor: "red", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React6.createElement(Text6, { color: "red", bold: true }, ICONS.warn, " CLI tools not found.  "), /* @__PURE__ */ React6.createElement(Text6, { color: "gray" }, utils.INSTALL_HINT)), /* @__PURE__ */ React6.createElement(Box6, { gap: 2 }, /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1, paddingY: 0, width: 34 }, /* @__PURE__ */ React6.createElement(Text6, { bold: true, color: meta.color }, meta.icon, "  Devices"), /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", marginTop: 1 }, devices.length === 0 && /* @__PURE__ */ React6.createElement(Text6, { color: "gray" }, "  No devices found"), devices.map((d) => /* @__PURE__ */ React6.createElement(Box6, { key: d.name ?? d.serial }, /* @__PURE__ */ React6.createElement(Text6, { color: d.default ? "green" : "gray" }, d.default ? ICONS.connected : ICONS.disconnected, " ", /* @__PURE__ */ React6.createElement(Text6, { bold: d.default }, d.name ?? d.serial), /* @__PURE__ */ React6.createElement(Text6, { dimColor: true }, "  ", d.host, ":", d.port)))))), /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", borderStyle: "round", borderColor: "magenta", paddingX: 1, paddingY: 0, width: 40 }, /* @__PURE__ */ React6.createElement(Text6, { bold: true, color: "magenta" }, ICONS.apps, "  Installed Apps", currentDevice && /* @__PURE__ */ React6.createElement(Text6, { dimColor: true }, "  [", currentDevice.name ?? currentDevice.serial, "]")), /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", marginTop: 1 }, apps.length === 0 && /* @__PURE__ */ React6.createElement(Text6, { color: "gray" }, "  No apps / select a device first"), apps.slice(0, 8).map((app) => /* @__PURE__ */ React6.createElement(Box6, { key: app.id }, /* @__PURE__ */ React6.createElement(Text6, { color: "white" }, ICONS.arrow, " "), /* @__PURE__ */ React6.createElement(Text6, null, app.id), app.version && /* @__PURE__ */ React6.createElement(Text6, { dimColor: true }, "  v", app.version))), apps.length > 8 && /* @__PURE__ */ React6.createElement(Text6, { dimColor: true }, "  ... +", apps.length - 8, " more")))), /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", borderStyle: "round", borderColor: focused ? meta.color : "gray", paddingX: 1, paddingY: 0 }, /* @__PURE__ */ React6.createElement(Text6, { bold: true, color: focused ? meta.color : "gray" }, "Quick Actions"), /* @__PURE__ */ React6.createElement(Box6, { flexDirection: "column", marginTop: 1 }, quickActions.map((a, i) => /* @__PURE__ */ React6.createElement(Box6, { key: a.screen }, /* @__PURE__ */ React6.createElement(
    Text6,
    {
      bold: focused && i === menuIdx,
      color: focused && i === menuIdx ? meta.color : "white"
    },
    focused && i === menuIdx ? "\u25B6 " : "  ",
    /* @__PURE__ */ React6.createElement(Text6, { dimColor: true }, "[", a.key, "]"),
    "  ",
    a.icon,
    " ",
    a.label
  )))), focused && /* @__PURE__ */ React6.createElement(Text6, { dimColor: true, marginTop: 1 }, "\u2191\u2193 navigate  \u23CE open  or press shortcut key")));
}

// src/screens/Devices.js
import React7, { useState as useState4, useEffect as useEffect3, useCallback } from "react";
import { Box as Box7, Text as Text7, useInput as useInput3 } from "ink";
import TextInput from "ink-text-input";
var UTILS2 = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
var MODES = { LIST: "list", ADD: "add", CONFIRM_REMOVE: "confirm_remove" };
var WEBOS_FIELDS = ["name", "host", "port", "username", "password"];
var ADB_FIELDS = ["host", "port"];
var TIZEN_FIELDS = ["host", "port"];
function getFields(platform) {
  if (platform === "webos") return WEBOS_FIELDS;
  if (platform === "tizen") return TIZEN_FIELDS;
  return ADB_FIELDS;
}
function getDefaultForm(platform) {
  if (platform === "webos") return { name: "", host: "", port: "22", username: "root", password: "" };
  if (platform === "tizen") return { host: "", port: "26101" };
  return { host: "", port: "5555" };
}
function getFormLabel(field, platform) {
  if (field === "port" && platform === "webos") return "SSH Port";
  if (field === "port" && platform === "tizen") return "SDB Port";
  if (field === "port") return "ADB Port";
  return field.charAt(0).toUpperCase() + field.slice(1);
}
function Devices({ focused, platform, onDeviceChange }) {
  const [devices, setDevices] = useState4([]);
  const [loading, setLoading] = useState4(true);
  const [mode, setMode] = useState4(MODES.LIST);
  const [cursor, setCursor] = useState4(0);
  const [status, setStatus] = useState4(null);
  const [working, setWorking] = useState4(false);
  const meta = PLATFORM_META[platform];
  const utils = UTILS2[platform];
  const fields = getFields(platform);
  const [form, setForm] = useState4(getDefaultForm(platform));
  const [formField, setFormField] = useState4(0);
  const load = useCallback(async () => {
    setLoading(true);
    const devs = await utils.listDevices().catch(() => []);
    setDevices(devs);
    setLoading(false);
  }, [platform]);
  useEffect3(() => {
    load();
  }, [platform]);
  useInput3(async (input, key) => {
    if (!focused) return;
    if (mode === MODES.LIST) {
      if (key.upArrow) setCursor((c2) => Math.max(0, c2 - 1));
      if (key.downArrow) setCursor((c2) => Math.min(devices.length - 1, c2 + 1));
      if (input === "a") {
        setMode(MODES.ADD);
        setForm(getDefaultForm(platform));
        setFormField(0);
      }
      if (input === "d" && devices[cursor]) setMode(MODES.CONFIRM_REMOVE);
      if (input === "r") {
        setStatus(null);
        load();
      }
      if (input === "s" && devices[cursor] && platform === "webos") {
        setWorking(true);
        try {
          await utils.setDefaultDevice(devices[cursor].name);
          onDeviceChange(devices[cursor]);
          setStatus({ ok: true, msg: `Default set to ${devices[cursor].name}` });
          await load();
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setWorking(false);
      }
      if ((key.return || input === "s") && devices[cursor] && platform !== "webos") {
        onDeviceChange({ ...devices[cursor], default: true });
        setStatus({ ok: true, msg: `Active device set to ${devices[cursor].name ?? devices[cursor].serial}` });
      }
    }
    if (mode === MODES.ADD) {
      if (key.escape) {
        setMode(MODES.LIST);
        return;
      }
      if (key.tab || key.return) {
        if (formField < fields.length - 1) {
          setFormField((f) => f + 1);
        } else {
          setWorking(true);
          try {
            if (platform === "webos") {
              await utils.addDevice(form);
              setStatus({ ok: true, msg: `Device '${form.name}' added` });
            } else {
              const out = await utils.connectDevice({ host: form.host, port: parseInt(form.port) || void 0 });
              setStatus({ ok: true, msg: out || `Connected to ${form.host}:${form.port}` });
            }
            await load();
            setMode(MODES.LIST);
          } catch (e) {
            setStatus({ ok: false, msg: e.message });
          }
          setWorking(false);
        }
      }
    }
    if (mode === MODES.CONFIRM_REMOVE) {
      if (input === "y") {
        setWorking(true);
        try {
          if (platform === "webos") {
            await utils.removeDevice(devices[cursor].name);
          } else {
            await utils.disconnectDevice({ host: devices[cursor].host, port: devices[cursor].port });
          }
          setStatus({ ok: true, msg: `Removed ${devices[cursor].name ?? devices[cursor].serial}` });
          setCursor(0);
          await load();
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setMode(MODES.LIST);
        setWorking(false);
      }
      if (input === "n" || key.escape) setMode(MODES.LIST);
    }
  }, { isActive: focused });
  if (loading) return /* @__PURE__ */ React7.createElement(Box7, { padding: 2 }, /* @__PURE__ */ React7.createElement(Loader, { label: "Loading devices...", color: meta.color }));
  const addLabel = platform === "webos" ? "Add Device" : "Connect Device";
  const removeLabel = platform === "webos" ? "Remove" : "Disconnect";
  return /* @__PURE__ */ React7.createElement(Box7, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React7.createElement(Text7, { bold: true, color: meta.color }, meta.icon, "  Device Manager"), status && /* @__PURE__ */ React7.createElement(Box7, { borderStyle: "round", borderColor: status.ok ? "green" : "red", paddingX: 1 }, /* @__PURE__ */ React7.createElement(Text7, { color: status.ok ? "green" : "red" }, status.ok ? ICONS.check : ICONS.cross, "  ", status.msg)), working && /* @__PURE__ */ React7.createElement(Loader, { label: "Working...", color: meta.color }), mode === MODES.LIST && /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement(Box7, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1 }, /* @__PURE__ */ React7.createElement(Box7, { marginBottom: 1 }, /* @__PURE__ */ React7.createElement(Text7, { bold: true }, "Name / Serial".padEnd(24)), /* @__PURE__ */ React7.createElement(Text7, { bold: true }, "Host".padEnd(18)), /* @__PURE__ */ React7.createElement(Text7, { bold: true }, "Port")), devices.length === 0 && /* @__PURE__ */ React7.createElement(Text7, { color: "gray" }, "  No devices. Press [a] to add / connect."), devices.map((d, i) => /* @__PURE__ */ React7.createElement(Box7, { key: d.name ?? d.serial }, /* @__PURE__ */ React7.createElement(
    Text7,
    {
      bold: focused && i === cursor,
      color: focused && i === cursor ? meta.color : d.default ? "green" : "white"
    },
    focused && i === cursor ? "\u25B6 " : "  ",
    (d.name ?? d.serial).padEnd(22),
    /* @__PURE__ */ React7.createElement(Text7, { color: "gray" }, "  " + (d.host ?? "").padEnd(16)),
    /* @__PURE__ */ React7.createElement(Text7, { color: "gray" }, "  " + String(d.port ?? "")),
    d.default && /* @__PURE__ */ React7.createElement(Text7, { color: "green" }, "  \u2605")
  )))), /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "[a] ", addLabel, "  [d] ", removeLabel, "  ", platform === "webos" ? "[s] Set Default  " : "[\u23CE] Set Active  ", "[r] Refresh")), mode === MODES.ADD && /* @__PURE__ */ React7.createElement(Box7, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React7.createElement(Text7, { bold: true, color: meta.color }, addLabel), fields.map((field, i) => /* @__PURE__ */ React7.createElement(Box7, { key: field }, /* @__PURE__ */ React7.createElement(Text7, { color: formField === i ? meta.color : "gray" }, getFormLabel(field, platform).padEnd(12)), formField === i ? /* @__PURE__ */ React7.createElement(
    TextInput,
    {
      value: form[field] ?? "",
      onChange: (v) => setForm((f) => ({ ...f, [field]: v })),
      onSubmit: () => {
        if (formField < fields.length - 1) setFormField((f) => f + 1);
      },
      placeholder: field === "port" ? platform === "tizen" ? "26101" : "5555" : `Enter ${field}...`
    }
  ) : /* @__PURE__ */ React7.createElement(Text7, { color: "white" }, form[field] || /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "(empty)")))), /* @__PURE__ */ React7.createElement(Text7, { dimColor: true }, "Tab/Enter next  Last field Enter submits  Esc cancel")), mode === MODES.CONFIRM_REMOVE && devices[cursor] && /* @__PURE__ */ React7.createElement(Box7, { borderStyle: "round", borderColor: "red", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React7.createElement(Text7, { color: "red" }, removeLabel, " "), /* @__PURE__ */ React7.createElement(Text7, { bold: true, color: "white" }, devices[cursor].name ?? devices[cursor].serial), /* @__PURE__ */ React7.createElement(Text7, { color: "red" }, "? "), /* @__PURE__ */ React7.createElement(Text7, { color: "yellow" }, "[y] Yes  [n] No")));
}

// src/screens/Generate.js
import React8, { useState as useState5, useEffect as useEffect4 } from "react";
import { Box as Box8, Text as Text8, useInput as useInput4 } from "ink";
import TextInput2 from "ink-text-input";
var UTILS3 = { webos: webos_exports, tizen: tizen_exports };
var WEBOS_FALLBACK = [
  { name: "webapp", description: "Basic web application" },
  { name: "hosted_webapp", description: "Hosted web application" },
  { name: "js_service", description: "JavaScript service" },
  { name: "qmlapp", description: "QML application" }
];
var TIZEN_FALLBACK = [
  { name: "WebBasicapp", description: "Basic Tizen web app" },
  { name: "WebUIApplication", description: "Tizen UI framework app" },
  { name: "BasicProject", description: "Minimal project" }
];
var STEPS = { SELECT_TPL: 0, FILL_FORM: 1, DONE: 2 };
var WEBOS_FIELDS2 = ["appId", "title", "version", "outDir"];
var TIZEN_FIELDS2 = ["name", "outDir"];
var FIELD_LABELS = {
  appId: "App ID",
  title: "Title",
  version: "Version",
  outDir: "Output Dir",
  name: "Project Name"
};
var FIELD_DEFAULTS = {
  webos: { appId: "com.example.app", title: "My App", version: "1.0.0", outDir: "./myapp" },
  tizen: { name: "MyTizenApp", outDir: "." }
};
function Generate({ focused, platform }) {
  const [templates, setTemplates] = useState5([]);
  const [loading, setLoading] = useState5(true);
  const [step, setStep] = useState5(STEPS.SELECT_TPL);
  const [tplIdx, setTplIdx] = useState5(0);
  const [fieldIdx, setFieldIdx] = useState5(0);
  const [form, setForm] = useState5({ ...FIELD_DEFAULTS[platform] ?? FIELD_DEFAULTS.webos });
  const [working, setWorking] = useState5(false);
  const [result, setResult] = useState5(null);
  const [error, setError] = useState5(null);
  const meta = PLATFORM_META[platform];
  const utils = UTILS3[platform];
  const fields = platform === "tizen" ? TIZEN_FIELDS2 : WEBOS_FIELDS2;
  const fallback = platform === "tizen" ? TIZEN_FALLBACK : WEBOS_FALLBACK;
  useEffect4(() => {
    utils.listTemplates().then((t) => setTemplates(t.length ? t : fallback)).catch(() => setTemplates(fallback)).finally(() => setLoading(false));
  }, [platform]);
  useInput4(async (input, key) => {
    if (!focused) return;
    if (step === STEPS.SELECT_TPL) {
      if (key.upArrow) setTplIdx((i) => Math.max(0, i - 1));
      if (key.downArrow) setTplIdx((i) => Math.min(templates.length - 1, i + 1));
      if (key.return) setStep(STEPS.FILL_FORM);
    }
    if (step === STEPS.FILL_FORM) {
      if (key.escape) {
        setStep(STEPS.SELECT_TPL);
        setFieldIdx(0);
        return;
      }
      if (key.tab || key.return) {
        if (fieldIdx < fields.length - 1) {
          setFieldIdx((f) => f + 1);
        } else {
          setWorking(true);
          setError(null);
          try {
            let out;
            if (platform === "tizen") {
              out = await utils.generateApp({
                template: templates[tplIdx].name,
                name: form.name,
                outDir: form.outDir
              });
            } else {
              out = await utils.generateApp({
                template: templates[tplIdx].name,
                outDir: form.outDir,
                appId: form.appId,
                title: form.title,
                version: form.version
              });
            }
            setResult(out || `App created at ${form.outDir ?? form.name}`);
            setStep(STEPS.DONE);
          } catch (e) {
            setError(e.message);
          }
          setWorking(false);
        }
      }
    }
    if (step === STEPS.DONE) {
      if (key.return || input === "r") {
        setStep(STEPS.SELECT_TPL);
        setResult(null);
        setForm({ ...FIELD_DEFAULTS[platform] ?? FIELD_DEFAULTS.webos });
        setFieldIdx(0);
      }
    }
  }, { isActive: focused });
  if (loading) return /* @__PURE__ */ React8.createElement(Box8, { padding: 2 }, /* @__PURE__ */ React8.createElement(Loader, { label: "Loading templates...", color: meta.color }));
  return /* @__PURE__ */ React8.createElement(Box8, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React8.createElement(Text8, { bold: true, color: meta.color }, ICONS.generate, "  Generate App  ", /* @__PURE__ */ React8.createElement(Text8, { color: "gray" }, "[", meta.label, "]")), error && /* @__PURE__ */ React8.createElement(Box8, { borderStyle: "round", borderColor: "red", paddingX: 1 }, /* @__PURE__ */ React8.createElement(Text8, { color: "red" }, ICONS.cross, "  ", error)), working && /* @__PURE__ */ React8.createElement(Loader, { label: "Generating app...", color: meta.color }), step === STEPS.SELECT_TPL && !working && /* @__PURE__ */ React8.createElement(Box8, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1, paddingY: 1, gap: 1 }, /* @__PURE__ */ React8.createElement(Text8, { bold: true }, "Select Template"), templates.map((t, i) => /* @__PURE__ */ React8.createElement(Box8, { key: t.name }, /* @__PURE__ */ React8.createElement(
    Text8,
    {
      bold: focused && i === tplIdx,
      color: focused && i === tplIdx ? meta.color : "white"
    },
    focused && i === tplIdx ? "\u25B6 " : "  ",
    /* @__PURE__ */ React8.createElement(Text8, { bold: true }, t.name.padEnd(20)),
    /* @__PURE__ */ React8.createElement(Text8, { dimColor: true }, "  ", t.description)
  ))), /* @__PURE__ */ React8.createElement(Text8, { dimColor: true, marginTop: 1 }, "\u2191\u2193 select  \u23CE continue")), step === STEPS.FILL_FORM && !working && /* @__PURE__ */ React8.createElement(Box8, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React8.createElement(Text8, { bold: true }, "Template: ", /* @__PURE__ */ React8.createElement(Text8, { color: meta.color }, templates[tplIdx]?.name)), fields.map((field, i) => /* @__PURE__ */ React8.createElement(Box8, { key: field }, /* @__PURE__ */ React8.createElement(Text8, { color: fieldIdx === i ? meta.color : "gray" }, (FIELD_LABELS[field] ?? field).padEnd(14)), fieldIdx === i ? /* @__PURE__ */ React8.createElement(
    TextInput2,
    {
      value: form[field] ?? "",
      onChange: (v) => setForm((f) => ({ ...f, [field]: v })),
      onSubmit: () => {
        if (fieldIdx < fields.length - 1) setFieldIdx((f) => f + 1);
      },
      placeholder: FIELD_DEFAULTS[platform]?.[field] ?? field
    }
  ) : /* @__PURE__ */ React8.createElement(Text8, { color: "white" }, form[field] ?? ""))), /* @__PURE__ */ React8.createElement(Text8, { dimColor: true }, "Tab/Enter next  Last field Enter generates  Esc back")), step === STEPS.DONE && /* @__PURE__ */ React8.createElement(Box8, { flexDirection: "column", borderStyle: "round", borderColor: "green", paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React8.createElement(Text8, { bold: true, color: "green" }, ICONS.check, "  App Generated!"), /* @__PURE__ */ React8.createElement(Text8, { color: "gray" }, result), /* @__PURE__ */ React8.createElement(Text8, { dimColor: true }, "\u23CE or [r] to generate another")));
}

// src/screens/Deploy.js
import React9, { useState as useState6 } from "react";
import { Box as Box9, Text as Text9, useInput as useInput5 } from "ink";
import TextInput3 from "ink-text-input";
var UTILS4 = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
var STEPS2 = { INPUT: 0, PACKAGING: 1, CONFIRM_INSTALL: 2, INSTALLING: 3, CONFIRM_LAUNCH: 4, DONE: 5 };
function getPkgLabel(platform) {
  if (platform === "webos") return "App Source Directory";
  if (platform === "tizen") return "Project Directory";
  return "APK File Path";
}
function getInstallLabel(platform) {
  if (platform === "webos" || platform === "tizen") return "Package & Install";
  return "Install APK";
}
var NEEDS_PACKAGING = ["webos", "tizen"];
function Deploy({ focused, currentDevice, platform }) {
  const meta = PLATFORM_META[platform];
  const utils = UTILS4[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  const [step, setStep] = useState6(STEPS2.INPUT);
  const [srcPath, setSrcPath] = useState6("");
  const [outDir, setOutDir] = useState6("./dist");
  const [pkgFile, setPkgFile] = useState6("");
  const [output, setOutput] = useState6([]);
  const [error, setError] = useState6(null);
  const [inputField, setInputField] = useState6(0);
  const needsPkg = NEEDS_PACKAGING.includes(platform);
  const addOutput = (msg, ok = true) => setOutput((o) => [...o, { msg, ok }]);
  const runDeploy = async () => {
    setStep(STEPS2.PACKAGING);
    setError(null);
    try {
      if (needsPkg) {
        const { output: out, pkgFile: pf } = await utils.packageApp({ appDir: srcPath, projectDir: srcPath, outDir });
        addOutput(out || `Packaged to ${outDir}`);
        setPkgFile(pf || `${outDir}/app.${platform === "tizen" ? "wgt" : "ipk"}`);
      } else {
        setPkgFile(srcPath);
      }
      setStep(STEPS2.CONFIRM_INSTALL);
    } catch (e) {
      setError(e.message);
      setStep(STEPS2.INPUT);
    }
  };
  const runInstall = async () => {
    setStep(STEPS2.INSTALLING);
    try {
      let out;
      if (platform === "webos") {
        out = await utils.installApp({ ipkPath: pkgFile, device });
      } else if (platform === "tizen") {
        out = await utils.installApp({ wgtPath: pkgFile, serial: device });
      } else {
        out = await utils.installApp({ apkPath: pkgFile, serial: device });
      }
      addOutput(out || "Installed successfully");
      setStep(STEPS2.CONFIRM_LAUNCH);
    } catch (e) {
      setError(e.message);
      setStep(STEPS2.CONFIRM_INSTALL);
    }
  };
  const runLaunch = async () => {
    try {
      const idGuess = pkgFile.replace(/.*\//, "").replace(/[_\.].*/, "");
      let out;
      if (platform === "webos") {
        out = await utils.launchApp({ appId: idGuess, device });
      } else if (platform === "tizen") {
        out = await utils.launchApp({ appId: idGuess, serial: device });
      } else {
        out = await utils.launchApp({ packageName: idGuess, activity: ".MainActivity", serial: device });
      }
      addOutput(out || `Launched ${idGuess}`);
    } catch (e) {
      addOutput(e.message, false);
    }
    setStep(STEPS2.DONE);
  };
  useInput5(async (input, key) => {
    if (!focused) return;
    if (step === STEPS2.INPUT) {
      if (key.return) {
        if (needsPkg && inputField === 0) {
          setInputField(1);
          return;
        }
        await runDeploy();
      }
      if (key.escape) setInputField(0);
    }
    if (step === STEPS2.CONFIRM_INSTALL) {
      if (input === "y" || key.return) await runInstall();
      if (input === "n") setStep(STEPS2.DONE);
    }
    if (step === STEPS2.CONFIRM_LAUNCH) {
      if (input === "y" || key.return) await runLaunch();
      if (input === "n") setStep(STEPS2.DONE);
    }
    if (step === STEPS2.DONE) {
      if (input === "r" || key.return) {
        setStep(STEPS2.INPUT);
        setOutput([]);
        setError(null);
        setPkgFile("");
        setInputField(0);
      }
    }
  }, { isActive: focused });
  const isLoading = step === STEPS2.PACKAGING || step === STEPS2.INSTALLING;
  return /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React9.createElement(Text9, { bold: true, color: meta.color }, ICONS.package, "  ", getInstallLabel(platform)), device && /* @__PURE__ */ React9.createElement(Text9, { color: "gray" }, "Device: ", /* @__PURE__ */ React9.createElement(Text9, { color: "green" }, device)), !device && /* @__PURE__ */ React9.createElement(Text9, { color: "yellow" }, ICONS.warn, "  No device selected \u2014 go to Devices screen first"), error && /* @__PURE__ */ React9.createElement(Box9, { borderStyle: "round", borderColor: "red", paddingX: 1 }, /* @__PURE__ */ React9.createElement(Text9, { color: "red" }, ICONS.cross, "  ", error)), isLoading && /* @__PURE__ */ React9.createElement(
    Loader,
    {
      label: step === STEPS2.PACKAGING ? "Packaging..." : "Installing...",
      color: meta.color
    }
  ), step === STEPS2.INPUT && /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React9.createElement(Box9, null, /* @__PURE__ */ React9.createElement(Text9, { color: inputField === 0 ? meta.color : "gray" }, getPkgLabel(platform), ": "), inputField === 0 ? /* @__PURE__ */ React9.createElement(
    TextInput3,
    {
      value: srcPath,
      onChange: setSrcPath,
      onSubmit: () => needsPkg ? setInputField(1) : runDeploy(),
      placeholder: needsPkg ? "./myapp" : "./app.apk"
    }
  ) : /* @__PURE__ */ React9.createElement(Text9, { color: "white" }, srcPath)), needsPkg && /* @__PURE__ */ React9.createElement(Box9, null, /* @__PURE__ */ React9.createElement(Text9, { color: inputField === 1 ? meta.color : "gray" }, "Output Directory:     "), inputField === 1 ? /* @__PURE__ */ React9.createElement(
    TextInput3,
    {
      value: outDir,
      onChange: setOutDir,
      onSubmit: runDeploy,
      placeholder: "./dist"
    }
  ) : /* @__PURE__ */ React9.createElement(Text9, { color: "white" }, outDir)), /* @__PURE__ */ React9.createElement(Text9, { dimColor: true }, "\u23CE to ", needsPkg ? "continue" : "install")), step === STEPS2.CONFIRM_INSTALL && /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column", borderStyle: "round", borderColor: "yellow", paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React9.createElement(Text9, { bold: true, color: "yellow" }, "Install package?"), /* @__PURE__ */ React9.createElement(Text9, { color: "gray" }, "File: ", /* @__PURE__ */ React9.createElement(Text9, { color: "white" }, pkgFile)), /* @__PURE__ */ React9.createElement(Text9, { color: "gray" }, "Device: ", /* @__PURE__ */ React9.createElement(Text9, { color: device ? "green" : "red" }, device || "none")), /* @__PURE__ */ React9.createElement(Text9, { color: "yellow" }, "[y] Install  [n] Skip")), step === STEPS2.CONFIRM_LAUNCH && /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React9.createElement(Text9, { bold: true, color: meta.color }, "Launch app?"), /* @__PURE__ */ React9.createElement(Text9, { color: "yellow" }, "[y] Launch  [n] Skip")), output.length > 0 && /* @__PURE__ */ React9.createElement(Box9, { flexDirection: "column", borderStyle: "round", borderColor: "gray", paddingX: 1 }, /* @__PURE__ */ React9.createElement(Text9, { bold: true, color: "gray" }, "Output"), output.map((o, i) => /* @__PURE__ */ React9.createElement(Text9, { key: i, color: o.ok ? "green" : "red" }, o.ok ? ICONS.check : ICONS.cross, "  ", o.msg))), step === STEPS2.DONE && /* @__PURE__ */ React9.createElement(Box9, null, /* @__PURE__ */ React9.createElement(Text9, { bold: true, color: "green" }, ICONS.check, "  Done!  "), /* @__PURE__ */ React9.createElement(Text9, { dimColor: true }, "\u23CE or [r] restart")));
}

// src/screens/Apps.js
import React10, { useState as useState7, useEffect as useEffect5, useCallback as useCallback2 } from "react";
import { Box as Box10, Text as Text10, useInput as useInput6 } from "ink";
var UTILS5 = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
var MODES2 = { LIST: "list", CONFIRM_REMOVE: "confirm_remove", LAUNCH_OPTS: "launch_opts" };
function Apps({ focused, currentDevice, platform }) {
  const [apps, setApps] = useState7([]);
  const [running, setRunning] = useState7([]);
  const [loading, setLoading] = useState7(true);
  const [cursor, setCursor] = useState7(0);
  const [mode, setMode] = useState7(MODES2.LIST);
  const [status, setStatus] = useState7(null);
  const [working, setWorking] = useState7(false);
  const meta = PLATFORM_META[platform];
  const utils = UTILS5[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  const load = useCallback2(async () => {
    if (!device) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const ins = await utils.listInstalledApps(device).catch(() => []);
    setApps(ins);
    if (utils.listRunningApps) {
      const run = await utils.listRunningApps(device).catch(() => []);
      setRunning(run);
    }
    setCursor(0);
    setLoading(false);
  }, [device, platform]);
  useEffect5(() => {
    load();
  }, [device, platform]);
  const isRunning = (id) => running.includes(id);
  useInput6(async (input, key) => {
    if (!focused) return;
    if (mode === MODES2.LIST) {
      if (key.upArrow) setCursor((c2) => Math.max(0, c2 - 1));
      if (key.downArrow) setCursor((c2) => Math.min(apps.length - 1, c2 + 1));
      if (input === "r") {
        setStatus(null);
        load();
        return;
      }
      const app = apps[cursor];
      if (!app) return;
      if (input === "l" || key.return) {
        setWorking(true);
        try {
          if (platform === "webos") {
            if (isRunning(app.id)) {
              await utils.closeApp({ appId: app.id, device });
              setStatus({ ok: true, msg: `Stopped ${app.id}` });
            } else {
              await utils.launchApp({ appId: app.id, device });
              setStatus({ ok: true, msg: `Launched ${app.id}` });
            }
          } else if (platform === "tizen") {
            await utils.launchApp({ appId: app.id, serial: device });
            setStatus({ ok: true, msg: `Launched ${app.id}` });
          } else {
            if (isRunning(app.id)) {
              await utils.stopApp({ packageName: app.id, serial: device });
              setStatus({ ok: true, msg: `Stopped ${app.id}` });
            } else {
              await utils.launchApp({ packageName: app.id, activity: ".MainActivity", serial: device });
              setStatus({ ok: true, msg: `Launched ${app.id}` });
            }
          }
          await load();
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setWorking(false);
      }
      if (input === "d") setMode(MODES2.CONFIRM_REMOVE);
    }
    if (mode === MODES2.CONFIRM_REMOVE) {
      if (input === "y") {
        setWorking(true);
        try {
          const app = apps[cursor];
          if (platform === "webos") {
            await utils.removeApp({ appId: app.id, device });
          } else if (platform === "tizen") {
            await utils.removeApp({ appId: app.id, serial: device });
          } else {
            await utils.removeApp({ packageName: app.id, serial: device });
          }
          setStatus({ ok: true, msg: `Removed ${apps[cursor].id}` });
          await load();
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setMode(MODES2.LIST);
        setWorking(false);
      }
      if (input === "n" || key.escape) setMode(MODES2.LIST);
    }
  }, { isActive: focused });
  if (!device) {
    return /* @__PURE__ */ React10.createElement(Box10, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React10.createElement(Text10, { color: "yellow" }, ICONS.warn, "  No device selected."), /* @__PURE__ */ React10.createElement(Text10, { color: "gray" }, "Go to Devices screen and set an active device."));
  }
  if (loading) return /* @__PURE__ */ React10.createElement(Box10, { padding: 2 }, /* @__PURE__ */ React10.createElement(Loader, { label: "Loading apps...", color: meta.color }));
  return /* @__PURE__ */ React10.createElement(Box10, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React10.createElement(Text10, { bold: true, color: meta.color }, ICONS.apps, "  App Manager  ", /* @__PURE__ */ React10.createElement(Text10, { color: "gray" }, "[", device, "]")), status && /* @__PURE__ */ React10.createElement(Box10, { borderStyle: "round", borderColor: status.ok ? "green" : "red", paddingX: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: status.ok ? "green" : "red" }, status.ok ? ICONS.check : ICONS.cross, "  ", status.msg)), working && /* @__PURE__ */ React10.createElement(Loader, { label: "Working...", color: meta.color }), /* @__PURE__ */ React10.createElement(Box10, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1 }, /* @__PURE__ */ React10.createElement(Box10, { marginBottom: 1 }, /* @__PURE__ */ React10.createElement(Text10, { bold: true, color: "gray" }, "Status".padEnd(10)), /* @__PURE__ */ React10.createElement(Text10, { bold: true, color: "gray" }, "Package / App ID".padEnd(40)), /* @__PURE__ */ React10.createElement(Text10, { bold: true, color: "gray" }, "Version")), apps.length === 0 && /* @__PURE__ */ React10.createElement(Text10, { color: "gray" }, "  No apps installed on ", device), apps.map((app, i) => {
    const run = isRunning(app.id);
    return /* @__PURE__ */ React10.createElement(Box10, { key: app.id }, /* @__PURE__ */ React10.createElement(
      Text10,
      {
        bold: focused && i === cursor,
        color: focused && i === cursor ? meta.color : "white"
      },
      focused && i === cursor ? "\u25B6 " : "  ",
      /* @__PURE__ */ React10.createElement(Text10, { color: run ? "green" : "gray" }, run ? `${ICONS.running} RUN ` : `${ICONS.stopped} STOP`),
      "  ",
      app.id.padEnd(38),
      /* @__PURE__ */ React10.createElement(Text10, { color: "gray" }, "  ", app.version)
    ));
  })), mode === MODES2.CONFIRM_REMOVE && apps[cursor] && /* @__PURE__ */ React10.createElement(Box10, { borderStyle: "round", borderColor: "red", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React10.createElement(Text10, { color: "red" }, "Remove "), /* @__PURE__ */ React10.createElement(Text10, { bold: true, color: "white" }, apps[cursor].id), /* @__PURE__ */ React10.createElement(Text10, { color: "red" }, "? "), /* @__PURE__ */ React10.createElement(Text10, { color: "yellow" }, "[y] Yes  [n] No")), /* @__PURE__ */ React10.createElement(Text10, { dimColor: true }, "\u2191\u2193 navigate  \u23CE/[l] Launch/Stop  [d] Remove  [r] Refresh"));
}

// src/screens/Logs.js
import React11, { useState as useState8, useEffect as useEffect6, useRef } from "react";
import { Box as Box11, Text as Text11, useInput as useInput7 } from "ink";
var UTILS6 = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
var MAX_LINES = 50;
function Logs({ focused, currentDevice, platform }) {
  const [lines, setLines] = useState8([]);
  const [paused, setPaused] = useState8(false);
  const [streaming, setStreaming] = useState8(false);
  const [error, setError] = useState8(null);
  const procRef = useRef(null);
  const meta = PLATFORM_META[platform];
  const utils = UTILS6[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  function startStream() {
    if (procRef.current) {
      procRef.current.kill();
      procRef.current = null;
    }
    setLines([]);
    setError(null);
    setStreaming(true);
    try {
      const opts = platform === "webos" ? { device, follow: true, lines: 50 } : { serial: device };
      const proc = utils.spawnLogStream(opts);
      procRef.current = proc;
      proc.stdout?.on("data", (chunk) => {
        if (paused) return;
        const newLines = chunk.toString().split("\n").filter(Boolean);
        setLines((prev) => [...prev, ...newLines].slice(-MAX_LINES));
      });
      proc.stderr?.on("data", (chunk) => {
        setLines((prev) => [...prev, `[stderr] ${chunk.toString().trim()}`].slice(-MAX_LINES));
      });
      proc.catch((e) => {
        if (e.signal !== "SIGTERM") setError(e.message);
        setStreaming(false);
      });
    } catch (e) {
      setError(e.message);
      setStreaming(false);
    }
  }
  useEffect6(() => {
    if (device && focused) startStream();
    return () => {
      procRef.current?.kill();
      procRef.current = null;
    };
  }, [device, focused, platform]);
  useInput7((input) => {
    if (!focused) return;
    if (input === "p") setPaused((p) => !p);
    if (input === "c") setLines([]);
    if (input === "r") startStream();
  }, { isActive: focused });
  if (!device) {
    return /* @__PURE__ */ React11.createElement(Box11, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React11.createElement(Text11, { color: "yellow" }, ICONS.warn, "  No device selected."));
  }
  return /* @__PURE__ */ React11.createElement(Box11, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React11.createElement(Box11, { justifyContent: "space-between" }, /* @__PURE__ */ React11.createElement(Text11, { bold: true, color: meta.color }, ICONS.logs, "  Log Viewer  ", /* @__PURE__ */ React11.createElement(Text11, { color: "gray" }, "[", device, "]")), /* @__PURE__ */ React11.createElement(Text11, { color: paused ? "yellow" : "green" }, paused ? `${ICONS.stopped} PAUSED` : streaming ? `${ICONS.running} LIVE` : `${ICONS.disconnected} STOPPED`)), error && /* @__PURE__ */ React11.createElement(Box11, { borderStyle: "round", borderColor: "red", paddingX: 1 }, /* @__PURE__ */ React11.createElement(Text11, { color: "red" }, ICONS.cross, "  ", error)), !streaming && !error && /* @__PURE__ */ React11.createElement(Loader, { label: "Starting log stream...", color: meta.color }), /* @__PURE__ */ React11.createElement(
    Box11,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: "gray",
      paddingX: 1,
      height: Math.max(10, (process.stdout.rows || 30) - 12)
    },
    lines.length === 0 && /* @__PURE__ */ React11.createElement(Text11, { color: "gray" }, "  Waiting for log output..."),
    lines.map((line, i) => {
      const isError = /error|fatal|critical|\sE\//i.test(line);
      const isWarning = /warn|\sW\//i.test(line);
      return /* @__PURE__ */ React11.createElement(
        Text11,
        {
          key: i,
          color: isError ? "red" : isWarning ? "yellow" : "white",
          wrap: "truncate"
        },
        line
      );
    })
  ), /* @__PURE__ */ React11.createElement(Text11, { dimColor: true }, "[p] Pause/Resume  [c] Clear  [r] Restart  ", lines.length, "/", MAX_LINES, " lines"));
}

// src/screens/Transfer.js
import React12, { useState as useState9 } from "react";
import { Box as Box12, Text as Text12, useInput as useInput8 } from "ink";
import TextInput4 from "ink-text-input";
var UTILS7 = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
var DIR = { PUSH: "push", PULL: "pull" };
var STEP = { SELECT_DIR: 0, SRC: 1, DEST: 2, DONE: 3 };
function Transfer({ focused, currentDevice, platform }) {
  const [direction, setDirection] = useState9(DIR.PUSH);
  const [step, setStep] = useState9(STEP.SELECT_DIR);
  const [src, setSrc] = useState9("");
  const [dest, setDest] = useState9("");
  const [working, setWorking] = useState9(false);
  const [result, setResult] = useState9(null);
  const [error, setError] = useState9(null);
  const meta = PLATFORM_META[platform];
  const utils = UTILS7[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  async function runTransfer() {
    setWorking(true);
    setError(null);
    try {
      let out;
      const isPush2 = direction === DIR.PUSH;
      const pushOpts = platform === "webos" ? { localPath: src, remotePath: dest, device } : { localPath: src, remotePath: dest, serial: device };
      const pullOpts = platform === "webos" ? { remotePath: src, localPath: dest, device } : { remotePath: src, localPath: dest, serial: device };
      out = isPush2 ? await utils.pushFiles(pushOpts) : await utils.pullFiles(pullOpts);
      setResult(out || "Transfer complete");
      setStep(STEP.DONE);
    } catch (e) {
      setError(e.message);
    }
    setWorking(false);
  }
  function reset() {
    setStep(STEP.SELECT_DIR);
    setSrc("");
    setDest("");
    setResult(null);
    setError(null);
  }
  useInput8((input, key) => {
    if (!focused) return;
    if (step === STEP.SELECT_DIR) {
      if (input === "p") {
        setDirection(DIR.PUSH);
        setStep(STEP.SRC);
      }
      if (input === "l") {
        setDirection(DIR.PULL);
        setStep(STEP.SRC);
      }
    }
    if (step === STEP.SRC && key.return) setStep(STEP.DEST);
    if (step === STEP.DEST && key.return) runTransfer();
    if (step === STEP.DONE && (key.return || input === "r")) reset();
    if (key.escape && step !== STEP.SELECT_DIR) setStep((s) => Math.max(0, s - 1));
  }, { isActive: focused });
  if (!device) {
    return /* @__PURE__ */ React12.createElement(Box12, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React12.createElement(Text12, { color: "yellow" }, ICONS.warn, "  No device selected."));
  }
  const isPush = direction === DIR.PUSH;
  const srcLabel = isPush ? "Local path (host)" : "Remote path (device)";
  const destLabel = isPush ? "Remote path (device)" : "Local path (host)";
  return /* @__PURE__ */ React12.createElement(Box12, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React12.createElement(Text12, { bold: true, color: meta.color }, ICONS.transfer, "  File Transfer  ", /* @__PURE__ */ React12.createElement(Text12, { color: "gray" }, "[", device, "]")), error && /* @__PURE__ */ React12.createElement(Box12, { borderStyle: "round", borderColor: "red", paddingX: 1 }, /* @__PURE__ */ React12.createElement(Text12, { color: "red" }, ICONS.cross, "  ", error)), working && /* @__PURE__ */ React12.createElement(Loader, { label: `${isPush ? "Pushing" : "Pulling"} files...`, color: meta.color }), step === STEP.SELECT_DIR && /* @__PURE__ */ React12.createElement(Box12, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React12.createElement(Text12, { bold: true }, "Transfer Direction"), /* @__PURE__ */ React12.createElement(Box12, null, /* @__PURE__ */ React12.createElement(Text12, { color: meta.color }, "\u25B6  "), /* @__PURE__ */ React12.createElement(Text12, { bold: true }, "[p] Push  "), /* @__PURE__ */ React12.createElement(Text12, { color: "gray" }, "Host \u2192 Device")), /* @__PURE__ */ React12.createElement(Box12, null, /* @__PURE__ */ React12.createElement(Text12, { color: "magenta" }, "\u25C0  "), /* @__PURE__ */ React12.createElement(Text12, { bold: true }, "[l] Pull  "), /* @__PURE__ */ React12.createElement(Text12, { color: "gray" }, "Device \u2192 Host"))), step === STEP.SRC && !working && /* @__PURE__ */ React12.createElement(Box12, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React12.createElement(Text12, { bold: true, color: isPush ? meta.color : "magenta" }, isPush ? "\u25B6 Push" : "\u25C0 Pull"), /* @__PURE__ */ React12.createElement(Box12, null, /* @__PURE__ */ React12.createElement(Text12, { color: meta.color }, srcLabel, ": "), /* @__PURE__ */ React12.createElement(
    TextInput4,
    {
      value: src,
      onChange: setSrc,
      onSubmit: () => setStep(STEP.DEST),
      placeholder: isPush ? "./local/file.txt" : "/data/file.txt"
    }
  )), /* @__PURE__ */ React12.createElement(Text12, { dimColor: true }, "\u23CE next  Esc back")), step === STEP.DEST && !working && /* @__PURE__ */ React12.createElement(Box12, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React12.createElement(Text12, { bold: true }, srcLabel, ": ", /* @__PURE__ */ React12.createElement(Text12, { color: "white" }, src)), /* @__PURE__ */ React12.createElement(Box12, null, /* @__PURE__ */ React12.createElement(Text12, { color: meta.color }, destLabel, ": "), /* @__PURE__ */ React12.createElement(
    TextInput4,
    {
      value: dest,
      onChange: setDest,
      onSubmit: runTransfer,
      placeholder: isPush ? "/data/file.txt" : "./local/file.txt"
    }
  )), /* @__PURE__ */ React12.createElement(Text12, { dimColor: true }, "\u23CE transfer  Esc back")), step === STEP.DONE && /* @__PURE__ */ React12.createElement(Box12, { flexDirection: "column", borderStyle: "round", borderColor: "green", paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React12.createElement(Text12, { bold: true, color: "green" }, ICONS.check, "  Transfer Complete!"), /* @__PURE__ */ React12.createElement(Text12, { color: "gray" }, result), /* @__PURE__ */ React12.createElement(Text12, { dimColor: true }, "\u23CE or [r] again")));
}

// src/screens/Shell.js
import React13, { useState as useState10 } from "react";
import { Box as Box13, Text as Text13, useInput as useInput9 } from "ink";
import TextInput5 from "ink-text-input";
var UTILS8 = { webos: webos_exports, tizen: tizen_exports, amazon: amazon_exports, android: android_exports };
var MAX_HISTORY = 100;
function Shell({ focused, currentDevice, platform }) {
  const [input, setInput] = useState10("");
  const [history, setHistory] = useState10([]);
  const [cmdHist, setCmdHist] = useState10([]);
  const [histIdx, setHistIdx] = useState10(-1);
  const [working, setWorking] = useState10(false);
  const meta = PLATFORM_META[platform];
  const utils = UTILS8[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  async function execute(cmd) {
    if (!cmd.trim()) return;
    const entry = { cmd, output: null, error: null, ts: (/* @__PURE__ */ new Date()).toLocaleTimeString() };
    setHistory((h) => [...h, entry].slice(-MAX_HISTORY));
    setCmdHist((h) => [cmd, ...h.filter((c2) => c2 !== cmd)].slice(-50));
    setHistIdx(-1);
    setInput("");
    setWorking(true);
    try {
      const opts = platform === "webos" ? { command: cmd, device } : { command: cmd, serial: device };
      const out = await utils.runShellCommand(opts);
      setHistory((h) => {
        const copy = [...h];
        copy[copy.length - 1] = { ...copy[copy.length - 1], output: out };
        return copy;
      });
    } catch (e) {
      setHistory((h) => {
        const copy = [...h];
        copy[copy.length - 1] = { ...copy[copy.length - 1], error: e.message };
        return copy;
      });
    }
    setWorking(false);
  }
  useInput9((inp, key) => {
    if (!focused) return;
    if (key.upArrow && cmdHist.length > 0) {
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next]);
    }
    if (key.downArrow) {
      const next = histIdx - 1;
      if (next < 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(cmdHist[next]);
      }
    }
    if (inp === "c" && key.ctrl) setHistory([]);
  }, { isActive: focused });
  if (!device) {
    return /* @__PURE__ */ React13.createElement(Box13, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React13.createElement(Text13, { color: "yellow" }, ICONS.warn, "  No device selected."));
  }
  const visible = history.slice(-(process.stdout.rows - 12 || 10));
  return /* @__PURE__ */ React13.createElement(Box13, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React13.createElement(Text13, { bold: true, color: meta.color }, ICONS.shell, "  Shell  ", /* @__PURE__ */ React13.createElement(Text13, { color: "gray" }, "[", device, "]")), /* @__PURE__ */ React13.createElement(
    Box13,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: "gray",
      paddingX: 1,
      height: Math.max(8, (process.stdout.rows || 30) - 12)
    },
    history.length === 0 && /* @__PURE__ */ React13.createElement(Text13, { color: "gray" }, "  Type a command below and press Enter to run it on the device."),
    visible.map((entry, i) => /* @__PURE__ */ React13.createElement(Box13, { key: i, flexDirection: "column" }, /* @__PURE__ */ React13.createElement(Text13, { color: meta.color }, /* @__PURE__ */ React13.createElement(Text13, { dimColor: true }, "[", entry.ts, "] "), "$ ", entry.cmd), entry.output != null && /* @__PURE__ */ React13.createElement(Text13, { color: "white", wrap: "wrap" }, entry.output), entry.error != null && /* @__PURE__ */ React13.createElement(Text13, { color: "red" }, ICONS.cross, "  ", entry.error))),
    working && /* @__PURE__ */ React13.createElement(Loader, { label: "Running...", color: meta.color })
  ), /* @__PURE__ */ React13.createElement(Box13, { borderStyle: "round", borderColor: focused ? meta.color : "gray", paddingX: 1 }, /* @__PURE__ */ React13.createElement(Text13, { color: meta.color }, "$ "), /* @__PURE__ */ React13.createElement(
    TextInput5,
    {
      value: input,
      onChange: setInput,
      onSubmit: execute,
      placeholder: "Enter command... (\u2191\u2193 history, Ctrl+C clear)",
      focus: focused && !working
    }
  )), /* @__PURE__ */ React13.createElement(Text13, { dimColor: true }, "\u2191\u2193 command history  Ctrl+C clear output"));
}

// src/screens/Inspector.js
import React14, { useState as useState11, useEffect as useEffect7, useCallback as useCallback3 } from "react";
import { Box as Box14, Text as Text14, useInput as useInput10 } from "ink";
function Inspector({ focused, currentDevice, platform }) {
  const [apps, setApps] = useState11([]);
  const [loading, setLoading] = useState11(true);
  const [cursor, setCursor] = useState11(0);
  const [working, setWorking] = useState11(false);
  const [result, setResult] = useState11(null);
  const [error, setError] = useState11(null);
  const meta = PLATFORM_META[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  const load = useCallback3(async () => {
    if (!device || platform !== "webos") {
      setLoading(false);
      return;
    }
    setLoading(true);
    const list = await listInstalledApps(device).catch(() => []);
    setApps(list);
    setLoading(false);
  }, [device, platform]);
  useEffect7(() => {
    load();
  }, [device, platform]);
  useInput10(async (input, key) => {
    if (!focused) return;
    if (platform === "webos") {
      if (key.upArrow) setCursor((c2) => Math.max(0, c2 - 1));
      if (key.downArrow) setCursor((c2) => Math.min(apps.length - 1, c2 + 1));
      if (input === "r") {
        setResult(null);
        setError(null);
        load();
      }
      if (key.return && apps[cursor]) {
        setWorking(true);
        setResult(null);
        setError(null);
        try {
          const out = await launchInspector({ appId: apps[cursor].id, device });
          setResult(out || "Web Inspector launched. Open the URL in your browser.");
        } catch (e) {
          setError(e.message);
        }
        setWorking(false);
      }
    }
  }, { isActive: focused });
  if (!device) {
    return /* @__PURE__ */ React14.createElement(Box14, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React14.createElement(Text14, { color: "yellow" }, ICONS.warn, "  No device selected."));
  }
  if (platform !== "webos") {
    const debugInfo = {
      amazon: [
        "Enable ADB debugging in Fire TV Settings \u2192 My Fire TV \u2192 Developer Options",
        "Use Chrome DevTools via: adb forward tcp:9222 localabstract:chrome_devtools_remote",
        "Open chrome://inspect in Chrome to see connected targets",
        "LoggingCtl tool available for system log management"
      ],
      tizen: [
        "Enable Developer Mode in Tizen Settings \u2192 General \u2192 System Manager",
        "Use Remote Web Inspector via Tizen Studio Tools \u2192 Device Manager",
        "Connect via Chrome DevTools with sdb forward"
      ],
      android: [
        "Enable USB Debugging in Developer Options",
        "Use Android Studio Profiler or Chrome DevTools",
        "adb shell am start --enable-debugging for debug builds",
        "chrome://inspect works for WebView-based apps"
      ]
    };
    return /* @__PURE__ */ React14.createElement(Box14, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React14.createElement(Text14, { bold: true, color: meta.color }, ICONS.debug, "  Debug Info  ", /* @__PURE__ */ React14.createElement(Text14, { color: "gray" }, "[", meta.label, "]")), /* @__PURE__ */ React14.createElement(Box14, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React14.createElement(Text14, { bold: true }, "Setup Steps"), (debugInfo[platform] ?? []).map((line, i) => /* @__PURE__ */ React14.createElement(Box14, { key: i }, /* @__PURE__ */ React14.createElement(Text14, { color: meta.color }, ICONS.arrow, " "), /* @__PURE__ */ React14.createElement(Text14, { color: "white", wrap: "wrap" }, line)))), /* @__PURE__ */ React14.createElement(Box14, { borderStyle: "round", borderColor: "gray", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React14.createElement(Text14, { dimColor: true }, ICONS.info, "  For ", meta.label, " debugging, use the platform's native tools alongside tvdev.")));
  }
  if (loading) return /* @__PURE__ */ React14.createElement(Box14, { padding: 2 }, /* @__PURE__ */ React14.createElement(Loader, { label: "Loading apps...", color: meta.color }));
  return /* @__PURE__ */ React14.createElement(Box14, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React14.createElement(Text14, { bold: true, color: meta.color }, ICONS.debug, "  Web Inspector  ", /* @__PURE__ */ React14.createElement(Text14, { color: "gray" }, "[", device, "]")), /* @__PURE__ */ React14.createElement(Text14, { color: "gray" }, "Select an app to open the Web Inspector (ares-inspect)."), result && /* @__PURE__ */ React14.createElement(Box14, { borderStyle: "round", borderColor: "green", paddingX: 2, paddingY: 1 }, /* @__PURE__ */ React14.createElement(Text14, { bold: true, color: "green" }, ICONS.check, "  Inspector launched!"), /* @__PURE__ */ React14.createElement(Text14, { color: "gray" }, "\n", result)), error && /* @__PURE__ */ React14.createElement(Box14, { borderStyle: "round", borderColor: "red", paddingX: 1 }, /* @__PURE__ */ React14.createElement(Text14, { color: "red" }, ICONS.cross, "  ", error)), working && /* @__PURE__ */ React14.createElement(Loader, { label: "Launching Inspector...", color: meta.color }), !working && /* @__PURE__ */ React14.createElement(Box14, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1, paddingY: 1 }, /* @__PURE__ */ React14.createElement(Text14, { bold: true, marginBottom: 1 }, "Installed Apps"), apps.length === 0 && /* @__PURE__ */ React14.createElement(Text14, { color: "gray" }, "  No apps found on device."), apps.map((app, i) => /* @__PURE__ */ React14.createElement(Box14, { key: app.id }, /* @__PURE__ */ React14.createElement(
    Text14,
    {
      bold: focused && i === cursor,
      color: focused && i === cursor ? meta.color : "white"
    },
    focused && i === cursor ? "\u25B6 " : "  ",
    app.id,
    app.version && /* @__PURE__ */ React14.createElement(Text14, { dimColor: true }, "  v", app.version)
  )))), /* @__PURE__ */ React14.createElement(Box14, { flexDirection: "column", borderStyle: "round", borderColor: "gray", paddingX: 1 }, /* @__PURE__ */ React14.createElement(Text14, { dimColor: true }, ICONS.info, "  After launching, open the URL in your browser to debug the app.")), /* @__PURE__ */ React14.createElement(Text14, { dimColor: true }, "\u2191\u2193 select  \u23CE launch inspector  [r] refresh"));
}

// src/screens/Build.js
import React15, { useState as useState12 } from "react";
import { Box as Box15, Text as Text15, useInput as useInput11 } from "ink";
import TextInput6 from "ink-text-input";
var UTILS9 = { tizen: tizen_exports, android: android_exports };
var TASKS = {
  android: [
    { id: "assembleDebug", label: "Debug Build", hint: "./gradlew assembleDebug" },
    { id: "assembleRelease", label: "Release Build", hint: "./gradlew assembleRelease" },
    { id: "test", label: "Run Tests", hint: "./gradlew test" },
    { id: "clean", label: "Clean", hint: "./gradlew clean" }
  ],
  tizen: [
    { id: "build-web", label: "Build Web App", hint: "tizen build-web" },
    { id: "package-wgt", label: "Package \u2192 .wgt", hint: "tizen package -t wgt" }
  ]
};
var STEPS3 = { SELECT: 0, DIR: 1, BUILDING: 2, DONE: 3 };
function Build({ focused, platform }) {
  const meta = PLATFORM_META[platform];
  const utils = UTILS9[platform];
  const tasks = TASKS[platform] ?? TASKS.android;
  const [taskIdx, setTaskIdx] = useState12(0);
  const [step, setStep] = useState12(STEPS3.SELECT);
  const [projDir, setProjDir] = useState12(".");
  const [working, setWorking] = useState12(false);
  const [result, setResult] = useState12(null);
  const [error, setError] = useState12(null);
  async function runBuild() {
    setStep(STEPS3.BUILDING);
    setError(null);
    setWorking(true);
    try {
      let out;
      if (platform === "android") {
        out = await utils.buildProject({
          task: tasks[taskIdx].id,
          projectDir: projDir,
          useWrapper: true
        });
        setResult(out.success ? `Build successful${out.apkPath ? `
APK: ${out.apkPath}` : ""}` : "Build failed \u2014 check output");
      } else {
        out = await utils.buildApp({ projectDir: projDir });
        setResult(out || "Build complete");
      }
      setStep(STEPS3.DONE);
    } catch (e) {
      setError(e.message);
      setStep(STEPS3.DIR);
    }
    setWorking(false);
  }
  useInput11(async (input, key) => {
    if (!focused) return;
    if (step === STEPS3.SELECT) {
      if (key.upArrow) setTaskIdx((i) => Math.max(0, i - 1));
      if (key.downArrow) setTaskIdx((i) => Math.min(tasks.length - 1, i + 1));
      if (key.return) setStep(STEPS3.DIR);
    }
    if (step === STEPS3.DIR && key.return) await runBuild();
    if (step === STEPS3.DIR && key.escape) setStep(STEPS3.SELECT);
    if (step === STEPS3.DONE && (key.return || input === "r")) {
      setStep(STEPS3.SELECT);
      setResult(null);
      setError(null);
    }
  }, { isActive: focused });
  return /* @__PURE__ */ React15.createElement(Box15, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React15.createElement(Text15, { bold: true, color: meta.color }, ICONS.build, "  Build  ", /* @__PURE__ */ React15.createElement(Text15, { color: "gray" }, "[", meta.label, "]")), error && /* @__PURE__ */ React15.createElement(Box15, { borderStyle: "round", borderColor: "red", paddingX: 1 }, /* @__PURE__ */ React15.createElement(Text15, { color: "red" }, ICONS.cross, "  ", error)), working && /* @__PURE__ */ React15.createElement(Loader, { label: "Building...", color: meta.color }), step === STEPS3.SELECT && /* @__PURE__ */ React15.createElement(Box15, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1, paddingY: 1, gap: 1 }, /* @__PURE__ */ React15.createElement(Text15, { bold: true }, "Select Build Task"), tasks.map((t, i) => /* @__PURE__ */ React15.createElement(Box15, { key: t.id }, /* @__PURE__ */ React15.createElement(
    Text15,
    {
      bold: focused && i === taskIdx,
      color: focused && i === taskIdx ? meta.color : "white"
    },
    focused && i === taskIdx ? "\u25B6 " : "  ",
    t.label.padEnd(20),
    /* @__PURE__ */ React15.createElement(Text15, { dimColor: true }, "  ", t.hint)
  ))), /* @__PURE__ */ React15.createElement(Text15, { dimColor: true, marginTop: 1 }, "\u2191\u2193 select  \u23CE continue")), step === STEPS3.DIR && !working && /* @__PURE__ */ React15.createElement(Box15, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React15.createElement(Text15, { bold: true }, "Task: ", /* @__PURE__ */ React15.createElement(Text15, { color: meta.color }, tasks[taskIdx]?.label)), /* @__PURE__ */ React15.createElement(Box15, null, /* @__PURE__ */ React15.createElement(Text15, { color: meta.color }, "Project Dir: "), /* @__PURE__ */ React15.createElement(
    TextInput6,
    {
      value: projDir,
      onChange: setProjDir,
      onSubmit: runBuild,
      placeholder: "."
    }
  )), /* @__PURE__ */ React15.createElement(Text15, { dimColor: true }, "\u23CE build  Esc back")), step === STEPS3.DONE && /* @__PURE__ */ React15.createElement(Box15, { flexDirection: "column", borderStyle: "round", borderColor: "green", paddingX: 2, paddingY: 1, gap: 1 }, /* @__PURE__ */ React15.createElement(Text15, { bold: true, color: "green" }, ICONS.check, "  Build Complete!"), /* @__PURE__ */ React15.createElement(Text15, { color: "gray", wrap: "wrap" }, result), /* @__PURE__ */ React15.createElement(Text15, { dimColor: true }, "\u23CE or [r] again")));
}

// src/screens/Emulator.js
import React16, { useState as useState13, useEffect as useEffect8 } from "react";
import { Box as Box16, Text as Text16, useInput as useInput12 } from "ink";
var UTILS10 = { tizen: tizen_exports, android: android_exports };
function Emulator({ focused, platform }) {
  const [avds, setAvds] = useState13([]);
  const [loading, setLoading] = useState13(true);
  const [cursor, setCursor] = useState13(0);
  const [working, setWorking] = useState13(false);
  const [status, setStatus] = useState13(null);
  const meta = PLATFORM_META[platform];
  const utils = UTILS10[platform];
  useEffect8(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await utils.listAvds();
        setAvds(list);
      } catch {
        setAvds([]);
      }
      setLoading(false);
    }
    load();
  }, [platform]);
  useInput12(async (input, key) => {
    if (!focused) return;
    if (key.upArrow) setCursor((c2) => Math.max(0, c2 - 1));
    if (key.downArrow) setCursor((c2) => Math.min(avds.length - 1, c2 + 1));
    if (input === "r") {
      setLoading(true);
      const list = await utils.listAvds().catch(() => []);
      setAvds(list);
      setLoading(false);
    }
    if (key.return && avds[cursor]) {
      setWorking(true);
      setStatus(null);
      try {
        await utils.launchEmulator({ name: avds[cursor].name });
        setStatus({ ok: true, msg: `Emulator ${avds[cursor].name} launching...` });
      } catch (e) {
        setStatus({ ok: false, msg: e.message });
      }
      setWorking(false);
    }
  }, { isActive: focused });
  if (loading) return /* @__PURE__ */ React16.createElement(Box16, { padding: 2 }, /* @__PURE__ */ React16.createElement(Loader, { label: "Loading emulators...", color: meta.color }));
  return /* @__PURE__ */ React16.createElement(Box16, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React16.createElement(Text16, { bold: true, color: meta.color }, ICONS.emulator, "  Emulator Manager  ", /* @__PURE__ */ React16.createElement(Text16, { color: "gray" }, "[", meta.label, "]")), status && /* @__PURE__ */ React16.createElement(Box16, { borderStyle: "round", borderColor: status.ok ? "green" : "red", paddingX: 1 }, /* @__PURE__ */ React16.createElement(Text16, { color: status.ok ? "green" : "red" }, status.ok ? ICONS.check : ICONS.cross, "  ", status.msg)), working && /* @__PURE__ */ React16.createElement(Loader, { label: "Launching emulator...", color: meta.color }), /* @__PURE__ */ React16.createElement(Box16, { flexDirection: "column", borderStyle: "round", borderColor: meta.color, paddingX: 1, paddingY: 1 }, /* @__PURE__ */ React16.createElement(Text16, { bold: true, marginBottom: 1 }, "Available Emulators / AVDs"), avds.length === 0 && /* @__PURE__ */ React16.createElement(Box16, { flexDirection: "column", gap: 1 }, /* @__PURE__ */ React16.createElement(Text16, { color: "gray" }, "  No emulators found."), platform === "android" && /* @__PURE__ */ React16.createElement(Text16, { color: "gray" }, '  Create one with: avdmanager create avd -n <name> -k "system-images;android-33;google_tv;x86_64"'), platform === "tizen" && /* @__PURE__ */ React16.createElement(Text16, { color: "gray" }, "  Create one in Tizen Studio \u2192 Emulator Manager")), avds.map((avd, i) => /* @__PURE__ */ React16.createElement(Box16, { key: avd.name }, /* @__PURE__ */ React16.createElement(
    Text16,
    {
      bold: focused && i === cursor,
      color: focused && i === cursor ? meta.color : "white"
    },
    focused && i === cursor ? "\u25B6 " : "  ",
    avd.name.padEnd(30),
    avd.api && /* @__PURE__ */ React16.createElement(Text16, { color: "gray" }, "  API ", avd.api),
    avd.type && /* @__PURE__ */ React16.createElement(Text16, { dimColor: true }, "  ", avd.type)
  )))), /* @__PURE__ */ React16.createElement(Text16, { color: "gray", dimColor: true }, "\u2191\u2193 select  \u23CE launch  [r] refresh"));
}

// src/screens/InputSim.js
import React17, { useState as useState14 } from "react";
import { Box as Box17, Text as Text17, useInput as useInput13 } from "ink";
var KEY_GROUPS = [
  { label: "Navigation", keys: ["KEY_UP", "KEY_DOWN", "KEY_LEFT", "KEY_RIGHT", "KEY_ENTER"] },
  { label: "System", keys: ["KEY_HOME", "KEY_BACK", "KEY_MENU"] },
  { label: "Media", keys: ["KEY_PLAY", "KEY_PAUSE", "KEY_PLAYPAUSE", "KEY_REWIND", "KEY_FASTFORWARD"] },
  { label: "Volume", keys: ["KEY_VOLUMEUP", "KEY_VOLUMEDOWN", "KEY_MUTE"] },
  { label: "Numbers", keys: ["KEY_0", "KEY_1", "KEY_2", "KEY_3", "KEY_4", "KEY_5", "KEY_6", "KEY_7", "KEY_8", "KEY_9"] }
];
function InputSim({ focused, currentDevice, platform }) {
  const [groupIdx, setGroupIdx] = useState14(0);
  const [keyIdx, setKeyIdx] = useState14(0);
  const [working, setWorking] = useState14(false);
  const [status, setStatus] = useState14(null);
  const [inKey, setInKey] = useState14(false);
  const meta = PLATFORM_META[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;
  const currentGroup = KEY_GROUPS[groupIdx];
  const currentKeys = currentGroup.keys;
  useInput13(async (input, key) => {
    if (!focused) return;
    if (!inKey) {
      if (key.upArrow) setGroupIdx((g) => Math.max(0, g - 1));
      if (key.downArrow) setGroupIdx((g) => Math.min(KEY_GROUPS.length - 1, g + 1));
      if (key.rightArrow) setInKey(true);
      if (key.return) setInKey(true);
    } else {
      if (key.leftArrow || key.escape) {
        setInKey(false);
        return;
      }
      if (key.upArrow) setKeyIdx((k) => Math.max(0, k - 1));
      if (key.downArrow) setKeyIdx((k) => Math.min(currentKeys.length - 1, k + 1));
      if (key.return) {
        const tvKey = currentKeys[keyIdx];
        setWorking(true);
        setStatus(null);
        try {
          await sendInput(tvKey);
          setStatus({ ok: true, msg: `Sent: ${tvKey}` });
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setWorking(false);
      }
    }
  }, { isActive: focused });
  if (!device) {
    return /* @__PURE__ */ React17.createElement(Box17, { flexDirection: "column", padding: 2 }, /* @__PURE__ */ React17.createElement(Text17, { color: "yellow" }, ICONS.warn, "  No device selected."), /* @__PURE__ */ React17.createElement(Text17, { color: "gray" }, "Go to Devices screen and connect a Fire TV device."));
  }
  return /* @__PURE__ */ React17.createElement(Box17, { flexDirection: "column", padding: 1, gap: 1 }, /* @__PURE__ */ React17.createElement(Text17, { bold: true, color: meta.color }, ICONS.input, "  Input Simulator  ", /* @__PURE__ */ React17.createElement(Text17, { color: "gray" }, "[", device, "]")), /* @__PURE__ */ React17.createElement(Text17, { color: "gray", dimColor: true }, "Sends remote control key events via inputd-cli"), status && /* @__PURE__ */ React17.createElement(Box17, { borderStyle: "round", borderColor: status.ok ? "green" : "red", paddingX: 1 }, /* @__PURE__ */ React17.createElement(Text17, { color: status.ok ? "green" : "red" }, status.ok ? ICONS.check : ICONS.cross, "  ", status.msg)), working && /* @__PURE__ */ React17.createElement(Loader, { label: "Sending key...", color: meta.color }), /* @__PURE__ */ React17.createElement(Box17, { gap: 2 }, /* @__PURE__ */ React17.createElement(Box17, { flexDirection: "column", borderStyle: "round", borderColor: !inKey ? meta.color : "gray", paddingX: 1, paddingY: 1, width: 16 }, /* @__PURE__ */ React17.createElement(Text17, { bold: true, color: !inKey ? meta.color : "gray" }, "Groups"), KEY_GROUPS.map((g, i) => /* @__PURE__ */ React17.createElement(Box17, { key: g.label }, /* @__PURE__ */ React17.createElement(
    Text17,
    {
      bold: i === groupIdx,
      color: i === groupIdx ? meta.color : "gray"
    },
    i === groupIdx ? "\u25B6 " : "  ",
    g.label
  )))), /* @__PURE__ */ React17.createElement(Box17, { flexDirection: "column", borderStyle: "round", borderColor: inKey ? meta.color : "gray", paddingX: 1, paddingY: 1, width: 26 }, /* @__PURE__ */ React17.createElement(Text17, { bold: true, color: inKey ? meta.color : "gray" }, currentGroup.label), currentKeys.map((k, i) => /* @__PURE__ */ React17.createElement(Box17, { key: k }, /* @__PURE__ */ React17.createElement(
    Text17,
    {
      bold: inKey && i === keyIdx,
      color: inKey && i === keyIdx ? meta.color : "white"
    },
    inKey && i === keyIdx ? "\u25B6 " : "  ",
    k.replace("KEY_", "")
  ))))), /* @__PURE__ */ React17.createElement(Text17, { dimColor: true }, !inKey ? "\u2191\u2193 group  \u2192 / \u23CE into keys" : "\u2191\u2193 key  \u23CE send  \u2190 / Esc back"));
}

// src/App.js
var SCREENS = {
  dashboard: Dashboard,
  devices: Devices,
  generate: Generate,
  deploy: Deploy,
  apps: Apps,
  logs: Logs,
  transfer: Transfer,
  shell: Shell,
  inspector: Inspector,
  build: Build,
  emulator: Emulator,
  input: InputSim
};
function App() {
  const { exit } = useApp2();
  const [platform, setPlatform] = useState15(null);
  const [menuIndex, setMenuIndex] = useState15(0);
  const [currentScreen, setCurrentScreen] = useState15("dashboard");
  const [sidebarFocused, setSidebarFocused] = useState15(true);
  const [currentDevice, setCurrentDevice] = useState15(null);
  const navItems = platform ? NAV_ITEMS[platform] : [];
  useInput14((input, key) => {
    if (!platform) return;
    if (key.ctrl && input === "c") {
      exit();
      return;
    }
    if (input === "q" && sidebarFocused) {
      exit();
      return;
    }
    if (sidebarFocused) {
      if (key.upArrow) setMenuIndex((i) => Math.max(0, i - 1));
      if (key.downArrow) setMenuIndex((i) => Math.min(navItems.length - 1, i + 1));
      if (key.return) {
        setCurrentScreen(navItems[menuIndex].id);
        setSidebarFocused(false);
      }
    } else {
      if (key.escape) setSidebarFocused(true);
      if (key.tab) setSidebarFocused(true);
      if (input === "q") {
        exit();
        return;
      }
    }
  });
  if (!platform) {
    return /* @__PURE__ */ React18.createElement(
      PlatformPicker,
      {
        onSelect: (p) => {
          setPlatform(p);
          setCurrentScreen("dashboard");
          setMenuIndex(0);
          setCurrentDevice(null);
        }
      }
    );
  }
  const ScreenComponent = SCREENS[currentScreen] || Dashboard;
  const cols = process.stdout.columns || 80;
  return /* @__PURE__ */ React18.createElement(Box18, { flexDirection: "column", width: cols }, /* @__PURE__ */ React18.createElement(Header, { currentDevice, platform, onChangePlatform: () => {
    setPlatform(null);
    setCurrentDevice(null);
    setMenuIndex(0);
    setCurrentScreen("dashboard");
    setSidebarFocused(true);
  } }), /* @__PURE__ */ React18.createElement(Box18, null, /* @__PURE__ */ React18.createElement(
    Sidebar,
    {
      menuIndex,
      currentScreen,
      focused: sidebarFocused,
      platform
    }
  ), /* @__PURE__ */ React18.createElement(Box18, { flexGrow: 1, flexDirection: "column" }, /* @__PURE__ */ React18.createElement(
    ScreenComponent,
    {
      focused: !sidebarFocused,
      currentDevice,
      platform,
      onDeviceChange: setCurrentDevice,
      onNavigate: (screen) => {
        const idx = navItems.findIndex((m) => m.id === screen);
        if (idx >= 0) setMenuIndex(idx);
        setCurrentScreen(screen);
        setSidebarFocused(false);
      }
    }
  ))), /* @__PURE__ */ React18.createElement(StatusBar, { sidebarFocused, platform }));
}

// src/index.js
render(/* @__PURE__ */ React19.createElement(App, null), { exitOnCtrlC: false });
