export function buildAddDeviceArgs({ name, host, port = 22, username = 'root', password = '' }) {
  const args = ['--add', name, '--info', `host=${host}`, '--info', `port=${port}`, '--info', `username=${username}`];
  if (password) args.push('--info', `password=${password}`);
  return args;
}

export const buildRemoveDeviceArgs    = (name) => ['--remove', name];
export const buildSetDefaultDeviceArgs = (name) => ['--default', name];

export function buildGenerateArgs({ template, outDir, appId, title, version = '1.0.0' }) {
  const args = ['-t', template, outDir];
  if (appId)   args.push('-p', `id=${appId}`);
  if (title)   args.push('-p', `title=${title}`);
  if (version) args.push('-p', `version=${version}`);
  return args;
}

export function buildPackageArgs({ appDir, outDir = '.', excludes = [] }) {
  const args = [appDir, '-o', outDir];
  for (const e of excludes) args.push('-e', e);
  return args;
}

export function buildInstallArgs({ ipkPath, device }) {
  const args = [ipkPath];
  if (device) args.push('-d', device);
  return args;
}

export function buildListAppsArgs(device) {
  const args = ['--list'];
  if (device) args.push('-d', device);
  return args;
}

export function buildRemoveAppArgs({ appId, device }) {
  const args = ['--remove', appId];
  if (device) args.push('-d', device);
  return args;
}

export function buildLaunchArgs({ appId, device, params }) {
  const args = [appId];
  if (device) args.push('-d', device);
  if (params) args.push('-p', params);
  return args;
}

export function buildCloseArgs({ appId, device }) {
  const args = [appId, '--close'];
  if (device) args.push('-d', device);
  return args;
}

export function buildRunningAppsArgs(device) {
  const args = ['--running'];
  if (device) args.push('-d', device);
  return args;
}

export function buildPushArgs({ localPath, remotePath, device }) {
  const args = [localPath, remotePath];
  if (device) args.push('-d', device);
  return args;
}

export function buildPullArgs({ remotePath, localPath, device }) {
  const args = [remotePath, localPath];
  if (device) args.push('-d', device);
  return args;
}

export function buildShellArgs({ command, device }) {
  const args = [];
  if (device) args.push('-d', device);
  args.push('--cmd', command);
  return args;
}

export function buildLogArgs({ device, follow = true, lines = 100, appId }) {
  const args = [];
  if (device) args.push('-d', device);
  if (follow) args.push('-f');
  args.push('-n', String(lines));
  if (appId) args.push('-id', appId);
  return args;
}

export function buildDeviceInfoArgs(device) {
  const args = [];
  if (device) args.push('-d', device);
  return args;
}

export function buildInspectorArgs({ appId, device, serviceId }) {
  const args = [appId];
  if (device)    args.push('-d', device);
  if (serviceId) args.push('-s', serviceId);
  return args;
}
