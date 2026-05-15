export function parseSdbDevices(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('List of devices'))
    .map(line => {
      const parts = line.trim().split(/\s+/);
      const serial = parts[0] || '';
      const status = parts[1] || '';
      const extra  = parts.slice(2).join(' ');
      const hostMatch = serial.match(/^(.+):(\d+)$/);
      return {
        name:    extra || serial,
        serial,
        host:    hostMatch ? hostMatch[1] : serial,
        port:    hostMatch ? hostMatch[2] : '26101',
        status,
        default: false,
      };
    })
    .filter(d => d.serial && d.status === 'device');
}

export function parseTizenTemplates(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && /^\d+\./.test(l.trim()))
    .map(l => {
      const match = l.trim().match(/^\d+\.\s+(\S+)\s*(.*)/);
      return match ? { name: match[1], description: match[2].trim() } : null;
    })
    .filter(Boolean);
}

export function parseTizenApps(output) {
  return output
    .split('\n')
    .filter(l => l.includes('pkgid'))
    .map(l => {
      const idMatch  = l.match(/pkgid\s*:\s*(\S+)/);
      const verMatch = l.match(/version\s*:\s*(\S+)/);
      return idMatch ? { id: idMatch[1], version: verMatch?.[1] || '' } : null;
    })
    .filter(Boolean);
}

export function parseWgtFilename(output, outDir) {
  const match = output.match(/[\w.-]+\.wgt/);
  return match ? `${outDir}/${match[0]}` : null;
}

export function parseSdbLog(line) {
  const isError   = /E\//.test(line);
  const isWarning = /W\//.test(line);
  const isDebug   = /D\//.test(line);
  return { line, level: isError ? 'error' : isWarning ? 'warning' : isDebug ? 'debug' : 'info' };
}
