// Android TV — ADB + Gradle + SDK tools

export function buildAdbDevicesArgs() {
  return ['devices', '-l'];
}

export function buildAdbConnectArgs({ host, port = 5555 }) {
  return ['connect', `${host}:${port}`];
}

export function buildAdbDisconnectArgs({ host, port = 5555 }) {
  return ['disconnect', `${host}:${port}`];
}

export function buildAdbInstallArgs({ apkPath, serial, replace = true }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('install');
  if (replace) args.push('-r');
  args.push(apkPath);
  return args;
}

export function buildAdbLaunchArgs({ packageName, activity, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('shell', 'am', 'start', '-n', `${packageName}/${activity}`);
  return args;
}

export function buildAdbStopArgs({ packageName, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('shell', 'am', 'force-stop', packageName);
  return args;
}

export function buildAdbListAppsArgs({ serial, includeSystem = false }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('shell', 'pm', 'list', 'packages');
  if (!includeSystem) args.push('-3');
  return args;
}

export function buildAdbUninstallArgs({ packageName, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('uninstall', packageName);
  return args;
}

export function buildAdbLogcatArgs({ serial, filter, tag }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('logcat');
  if (tag) args.push(`${tag}:V`, '*:S');
  if (filter) args.push(filter);
  return args;
}

export function buildAdbShellArgs({ command, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('shell');
  if (command) args.push(command);
  return args;
}

export function buildAdbPushArgs({ localPath, remotePath, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('push', localPath, remotePath);
  return args;
}

export function buildAdbPullArgs({ remotePath, localPath, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('pull', remotePath, localPath);
  return args;
}

export function buildGradleArgs({ task = 'assembleDebug', projectDir }) {
  return task === 'assembleDebug'
    ? ['assembleDebug']
    : task === 'assembleRelease'
    ? ['assembleRelease']
    : [task];
}

export function buildAvdListArgs() {
  return ['list', 'avd'];
}

export function buildEmulatorArgs({ avdName }) {
  return ['-avd', avdName];
}
