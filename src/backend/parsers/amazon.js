export function parseAdbDevices(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('List of devices'))
    .map(line => {
      const parts = line.trim().split(/\s+/);
      const serial = parts[0] || '';
      const status = parts[1] || '';
      const hostMatch = serial.match(/^(.+):(\d+)$/);
      const modelMatch = line.match(/model:(\S+)/);
      return {
        name:    modelMatch ? modelMatch[1].replace(/_/g, ' ') : serial,
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
