import { execa } from 'execa';
import {
  parseDeviceTable,
  parseInstalledApps,
  parseRunningApps,
  parseTemplates,
  parseIpkFilename,
} from '../backend/parsers/webos.js';
import {
  buildAddDeviceArgs,
  buildRemoveDeviceArgs,
  buildSetDefaultDeviceArgs,
  buildGenerateArgs,
  buildPackageArgs,
  buildInstallArgs,
  buildListAppsArgs,
  buildRemoveAppArgs,
  buildLaunchArgs,
  buildCloseArgs,
  buildRunningAppsArgs,
  buildPushArgs,
  buildPullArgs,
  buildShellArgs,
  buildLogArgs,
  buildDeviceInfoArgs,
  buildInspectorArgs,
} from '../backend/commands/webos.js';

export async function checkAvailable() {
  try {
    await execa('ares-setup-device', ['--version'], { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

export async function listDevices() {
  const { stdout } = await execa('ares-setup-device', ['--listfull'], { timeout: 10000 });
  try { return JSON.parse(stdout); } catch { return parseDeviceTable(stdout); }
}

export async function addDevice(opts) {
  const { stdout } = await execa('ares-setup-device', buildAddDeviceArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function removeDevice(name) {
  const { stdout } = await execa('ares-setup-device', buildRemoveDeviceArgs(name), { timeout: 10000 });
  return stdout;
}

export async function setDefaultDevice(name) {
  const { stdout } = await execa('ares-setup-device', buildSetDefaultDeviceArgs(name), { timeout: 10000 });
  return stdout;
}

export async function listTemplates() {
  const { stdout } = await execa('ares-generate', ['--list'], { timeout: 10000 });
  return parseTemplates(stdout);
}

export async function generateApp(opts) {
  const { stdout } = await execa('ares-generate', buildGenerateArgs(opts), { timeout: 30000 });
  return stdout;
}

export async function packageApp(opts) {
  const { stdout } = await execa('ares-package', buildPackageArgs(opts), { timeout: 60000 });
  return { output: stdout, pkgFile: parseIpkFilename(stdout, opts.outDir ?? '.') };
}

export async function installApp(opts) {
  const { stdout } = await execa('ares-install', buildInstallArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function listInstalledApps(device) {
  const { stdout } = await execa('ares-install', buildListAppsArgs(device), { timeout: 15000 });
  return parseInstalledApps(stdout);
}

export async function removeApp(opts) {
  const { stdout } = await execa('ares-install', buildRemoveAppArgs(opts), { timeout: 30000 });
  return stdout;
}

export async function launchApp(opts) {
  const { stdout } = await execa('ares-launch', buildLaunchArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function closeApp(opts) {
  const { stdout } = await execa('ares-launch', buildCloseArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function listRunningApps(device) {
  const { stdout } = await execa('ares-launch', buildRunningAppsArgs(device), { timeout: 10000 });
  return parseRunningApps(stdout);
}

export async function pushFiles(opts) {
  const { stdout } = await execa('ares-push', buildPushArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function pullFiles(opts) {
  const { stdout } = await execa('ares-pull', buildPullArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function runShellCommand(opts) {
  const { stdout, stderr } = await execa('ares-shell', buildShellArgs(opts), { timeout: 30000 });
  return (stdout || '') + (stderr || '');
}

export function spawnLogStream(opts) {
  return execa('ares-log', buildLogArgs(opts), { timeout: 0 });
}

export async function getDeviceInfo(device) {
  const { stdout } = await execa('ares-device', buildDeviceInfoArgs(device), { timeout: 15000 });
  return stdout;
}

export async function launchInspector(opts) {
  const { stdout } = await execa('ares-inspect', buildInspectorArgs(opts), { timeout: 30000 });
  return stdout;
}

export const INSTALL_HINT = 'npm install -g @webosose/ares-cli';
