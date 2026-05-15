// Tizen Studio CLI (tizen) + Samsung Device Bridge (sdb)

export function buildSdbDevicesArgs() {
  return ['devices'];
}

export function buildSdbConnectArgs({ host, port = 26101 }) {
  return ['connect', `${host}:${port}`];
}

export function buildSdbDisconnectArgs({ host, port = 26101 }) {
  return ['disconnect', `${host}:${port}`];
}

export function buildSdbShellArgs({ command, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('shell');
  if (command) args.push(command);
  return args;
}

export function buildSdbPushArgs({ localPath, remotePath, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('push', localPath, remotePath);
  return args;
}

export function buildSdbPullArgs({ remotePath, localPath, serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('pull', remotePath, localPath);
  return args;
}

export function buildSdbLogArgs({ serial, follow = true }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('dlog');
  if (follow) args.push('-v', 'time');
  return args;
}

export function buildTizenCreateArgs({ template = 'WebBasicapp', name, outDir = '.' }) {
  return ['create', 'web-project', '-t', template, '-n', name, '--', outDir];
}

export function buildTizenBuildArgs({ projectDir }) {
  return ['build-web', '--', projectDir];
}

export function buildTizenPackageArgs({ projectDir, type = 'wgt', cert }) {
  const args = ['package', '-t', type];
  if (cert) args.push('-s', cert);
  args.push('--', projectDir);
  return args;
}

export function buildTizenInstallArgs({ wgtPath, serial }) {
  const args = ['install'];
  if (serial) args.push('-t', serial);
  args.push('-n', wgtPath);
  return args;
}

export function buildTizenRunArgs({ appId, serial }) {
  const args = ['run', '-p', appId];
  if (serial) args.push('-t', serial);
  return args;
}

export function buildTizenUninstallArgs({ appId, serial }) {
  const args = ['uninstall', '-p', appId];
  if (serial) args.push('-t', serial);
  return args;
}

export function buildTizenListAppsArgs({ serial }) {
  const args = [];
  if (serial) args.push('-s', serial);
  args.push('shell', '0', 'pkgcmd', '-l');
  return args;
}

export function buildEmulatorListArgs() {
  return ['list-virtual-devices'];
}

export function buildEmulatorLaunchArgs({ name }) {
  return ['launch', '--name', name];
}
