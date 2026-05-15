// Amazon Fire TV — ADB + inputd-cli + LoggingCtl

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

export function buildAdbLogcatArgs({ serial, filter, clear = false }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('logcat');
  if (clear) args.push('-c');
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

// inputd-cli — Fire TV remote input simulation
export const FIRE_TV_KEYS = [
  'KEY_HOME', 'KEY_BACK', 'KEY_MENU',
  'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT', 'KEY_ENTER',
  'KEY_PLAY', 'KEY_PAUSE', 'KEY_PLAYPAUSE',
  'KEY_REWIND', 'KEY_FASTFORWARD',
  'KEY_VOLUMEUP', 'KEY_VOLUMEDOWN', 'KEY_MUTE',
  'KEY_0', 'KEY_1', 'KEY_2', 'KEY_3', 'KEY_4',
  'KEY_5', 'KEY_6', 'KEY_7', 'KEY_8', 'KEY_9',
];

export function buildInputdArgs({ key }) {
  return ['send', key];
}

// LoggingCtl
export function buildLoggingCtlArgs({ action }) {
  return [action];
}
