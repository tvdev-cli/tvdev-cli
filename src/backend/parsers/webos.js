export function parseDeviceTable(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('----') && !l.startsWith('name'))
    .map(line => {
      const parts = line.trim().split(/\s+/);
      return {
        name:     parts[0] || '',
        host:     parts[1] || '',
        port:     parts[2] || '22',
        username: parts[3] || 'root',
        default:  line.includes('(default)'),
      };
    })
    .filter(d => d.name);
}

export function parseInstalledApps(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.toLowerCase().startsWith('list'))
    .map(line => {
      const parts = line.trim().split(/\s+/);
      return { id: parts[0], version: parts[1] || '', title: parts.slice(2).join(' ') };
    })
    .filter(a => a.id);
}

export function parseRunningApps(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.toLowerCase().startsWith('running'))
    .map(l => l.trim())
    .filter(Boolean);
}

export function parseTemplates(output) {
  return output
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('Available'))
    .map(l => {
      const parts = l.trim().split(/\s{2,}/);
      return { name: parts[0], description: parts[1] || '' };
    })
    .filter(t => t.name);
}

export function parseIpkFilename(output, outDir) {
  const match = output.match(/[\w.-]+\.ipk/);
  return match ? `${outDir}/${match[0]}` : null;
}
