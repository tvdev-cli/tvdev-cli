import { execa } from 'execa';
import { parseAdbDevices, parseAdbPackages } from '../backend/parsers/amazon.js';
import {
  buildAdbDevicesArgs,
  buildAdbConnectArgs,
  buildAdbDisconnectArgs,
  buildAdbInstallArgs,
  buildAdbLaunchArgs,
  buildAdbStopArgs,
  buildAdbListAppsArgs,
  buildAdbUninstallArgs,
  buildAdbLogcatArgs,
  buildAdbShellArgs,
  buildAdbPushArgs,
  buildAdbPullArgs,
  buildInputdArgs,
  buildLoggingCtlArgs,
} from '../backend/commands/amazon.js';

export async function checkAvailable() {
  try {
    await execa('adb', ['version'], { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

export async function listDevices() {
  const { stdout } = await execa('adb', buildAdbDevicesArgs(), { timeout: 10000 });
  return parseAdbDevices(stdout);
}

export async function connectDevice(opts) {
  const { stdout } = await execa('adb', buildAdbConnectArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function disconnectDevice(opts) {
  const { stdout } = await execa('adb', buildAdbDisconnectArgs(opts), { timeout: 10000 });
  return stdout;
}

export async function installApp(opts) {
  const { stdout, stderr } = await execa('adb', buildAdbInstallArgs(opts), { timeout: 120000 });
  return (stdout || '') + (stderr || '');
}

export async function launchApp(opts) {
  const { stdout } = await execa('adb', buildAdbLaunchArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function stopApp(opts) {
  const { stdout } = await execa('adb', buildAdbStopArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function listInstalledApps(device) {
  const { stdout } = await execa('adb', buildAdbListAppsArgs({ serial: device }), { timeout: 15000 });
  return parseAdbPackages(stdout);
}

export async function removeApp(opts) {
  const { stdout } = await execa('adb', buildAdbUninstallArgs(opts), { timeout: 30000 });
  return stdout;
}

export function spawnLogStream(opts) {
  return execa('adb', buildAdbLogcatArgs(opts), { timeout: 0 });
}

export async function runShellCommand(opts) {
  const { stdout, stderr } = await execa('adb', buildAdbShellArgs(opts), { timeout: 30000 });
  return (stdout || '') + (stderr || '');
}

export async function pushFiles(opts) {
  const { stdout } = await execa('adb', buildAdbPushArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function pullFiles(opts) {
  const { stdout } = await execa('adb', buildAdbPullArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function sendInput(key) {
  const { stdout } = await execa('inputd-cli', buildInputdArgs({ key }), { timeout: 5000 });
  return stdout;
}

export async function loggingCtl(action) {
  const { stdout } = await execa('LoggingCtl', buildLoggingCtlArgs({ action }), { timeout: 30000 });
  return stdout;
}

export const INSTALL_HINT = 'Install ADB: brew install android-platform-tools (macOS) or see developer.amazon.com/docs/fire-tv/connecting-adb';
