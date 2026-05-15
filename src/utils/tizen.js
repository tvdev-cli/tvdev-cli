import { execa } from 'execa';
import {
  parseSdbDevices,
  parseTizenTemplates,
  parseTizenApps,
  parseWgtFilename,
} from '../backend/parsers/tizen.js';
import {
  buildSdbDevicesArgs,
  buildSdbConnectArgs,
  buildSdbDisconnectArgs,
  buildSdbShellArgs,
  buildSdbPushArgs,
  buildSdbPullArgs,
  buildSdbLogArgs,
  buildTizenCreateArgs,
  buildTizenBuildArgs,
  buildTizenPackageArgs,
  buildTizenInstallArgs,
  buildTizenRunArgs,
  buildTizenUninstallArgs,
  buildEmulatorLaunchArgs,
} from '../backend/commands/tizen.js';

export async function checkAvailable() {
  try {
    await execa('sdb', ['version'], { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

export async function listDevices() {
  const { stdout } = await execa('sdb', buildSdbDevicesArgs(), { timeout: 10000 });
  return parseSdbDevices(stdout);
}

export async function connectDevice(opts) {
  const { stdout } = await execa('sdb', buildSdbConnectArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function disconnectDevice(opts) {
  const { stdout } = await execa('sdb', buildSdbDisconnectArgs(opts), { timeout: 10000 });
  return stdout;
}

export async function listTemplates() {
  const { stdout } = await execa('tizen', ['list-templates'], { timeout: 10000 });
  return parseTizenTemplates(stdout);
}

export async function generateApp(opts) {
  const { stdout } = await execa('tizen', buildTizenCreateArgs(opts), { timeout: 30000 });
  return stdout;
}

export async function buildApp(opts) {
  const { stdout, stderr } = await execa('tizen', buildTizenBuildArgs(opts), { timeout: 120000 });
  return (stdout || '') + (stderr || '');
}

export async function packageApp(opts) {
  const { stdout } = await execa('tizen', buildTizenPackageArgs(opts), { timeout: 60000 });
  return { output: stdout, pkgFile: parseWgtFilename(stdout, opts.projectDir ?? '.') };
}

export async function installApp(opts) {
  const { stdout } = await execa('tizen', buildTizenInstallArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function listInstalledApps(device) {
  const { stdout } = await execa('sdb', buildSdbShellArgs({ command: '0 pkgcmd -l', serial: device }), { timeout: 15000 });
  return parseTizenApps(stdout);
}

export async function launchApp(opts) {
  const { stdout } = await execa('tizen', buildTizenRunArgs(opts), { timeout: 15000 });
  return stdout;
}

export async function removeApp(opts) {
  const { stdout } = await execa('tizen', buildTizenUninstallArgs(opts), { timeout: 30000 });
  return stdout;
}

export async function pushFiles(opts) {
  const { stdout } = await execa('sdb', buildSdbPushArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function pullFiles(opts) {
  const { stdout } = await execa('sdb', buildSdbPullArgs(opts), { timeout: 60000 });
  return stdout;
}

export async function runShellCommand(opts) {
  const { stdout, stderr } = await execa('sdb', buildSdbShellArgs(opts), { timeout: 30000 });
  return (stdout || '') + (stderr || '');
}

export function spawnLogStream(opts) {
  return execa('sdb', buildSdbLogArgs(opts), { timeout: 0 });
}

export async function launchEmulator(opts) {
  const { stdout } = await execa('tizen', buildEmulatorLaunchArgs(opts), { timeout: 30000 });
  return stdout;
}

export const INSTALL_HINT = 'Install Tizen Studio from developer.samsung.com/smarttv';
