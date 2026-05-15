export function parseAdbDevices(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('List of devices'))
    .map(line => {
      const parts = line.trim().split(/\s+/);
      const serial = parts[0] || '';
      const status = parts[1] || '';
      const hostMatch  = serial.match(/^(.+):(\d+)$/);
      const modelMatch = line.match(/model:(\S+)/);
      const prodMatch  = line.match(/product:(\S+)/);
      return {
        name:    modelMatch ? modelMatch[1].replace(/_/g, ' ') : prodMatch?.[1] ?? serial,
        serial,
        host:    hostMatch ? hostMatch[1] : serial,
        port:    hostMatch ? hostMatch[2] : '5555',
        status,
        default: false,
      };
    })
    .filter(d => d.serial && d.status === 'device');
}

export function parseAdbPackages(output) {
  return output
    .split('\n')
    .filter(l => l.startsWith('package:'))
    .map(l => ({
      id:      l.replace('package:', '').trim(),
      version: '',
    }));
}

export function parseAvdList(output) {
  const avds = [];
  let current = null;
  for (const line of output.split('\n')) {
    const nameMatch = line.match(/Name:\s+(.+)/);
    const typeMatch = line.match(/Type:\s+(.+)/);
    const apiMatch  = line.match(/API level:\s+(\d+)/);
    if (nameMatch) { current = { name: nameMatch[1].trim(), type: '', api: '' }; avds.push(current); }
    if (current && typeMatch) current.type = typeMatch[1].trim();
    if (current && apiMatch)  current.api  = apiMatch[1];
  }
  return avds;
}

export function parseGradleOutput(output) {
  const successMatch = output.match(/BUILD SUCCESSFUL/);
  const failMatch    = output.match(/BUILD FAILED/);
  const apkMatch     = output.match(/[\w\/.-]+\.apk/);
  return {
    success: !!successMatch,
    failed:  !!failMatch,
    apkPath: apkMatch ? apkMatch[0] : null,
  };
}

export function parseLogcat(line) {
  const match = line.match(/^(\d{2}-\d{2}\s+[\d:\.]+)\s+\d+\s+\d+\s+([VDIWEF])\s+([^:]+):\s+(.*)/);
  if (!match) return { line, level: 'info', tag: '', msg: line };
  const levelMap = { V: 'verbose', D: 'debug', I: 'info', W: 'warning', E: 'error', F: 'fatal' };
  return {
    line,
    ts:    match[1],
    level: levelMap[match[2]] ?? 'info',
    tag:   match[3].trim(),
    msg:   match[4],
  };
}
