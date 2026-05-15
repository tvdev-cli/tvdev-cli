import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META } from '../theme.js';
import * as webos from '../utils/webos.js';

export default function Inspector({ focused, currentDevice, platform }) {
  const [apps,    setApps]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursor,  setCursor]  = useState(0);
  const [working, setWorking] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);

  const meta   = PLATFORM_META[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;

  const load = useCallback(async () => {
    if (!device || platform !== 'webos') { setLoading(false); return; }
    setLoading(true);
    const list = await webos.listInstalledApps(device).catch(() => []);
    setApps(list);
    setLoading(false);
  }, [device, platform]);

  useEffect(() => { load(); }, [device, platform]);

  useInput(async (input, key) => {
    if (!focused) return;

    if (platform === 'webos') {
      if (key.upArrow)   setCursor(c => Math.max(0, c - 1));
      if (key.downArrow) setCursor(c => Math.min(apps.length - 1, c + 1));
      if (input === 'r') { setResult(null); setError(null); load(); }

      if (key.return && apps[cursor]) {
        setWorking(true);
        setResult(null);
        setError(null);
        try {
          const out = await webos.launchInspector({ appId: apps[cursor].id, device });
          setResult(out || 'Web Inspector launched. Open the URL in your browser.');
        } catch (e) {
          setError(e.message);
        }
        setWorking(false);
      }
    }
  }, { isActive: focused });

  if (!device) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="yellow">{ICONS.warn}  No device selected.</Text>
      </Box>
    );
  }

  if (platform !== 'webos') {
    const debugInfo = {
      amazon: [
        'Enable ADB debugging in Fire TV Settings → My Fire TV → Developer Options',
        'Use Chrome DevTools via: adb forward tcp:9222 localabstract:chrome_devtools_remote',
        'Open chrome://inspect in Chrome to see connected targets',
        'LoggingCtl tool available for system log management',
      ],
      tizen: [
        'Enable Developer Mode in Tizen Settings → General → System Manager',
        'Use Remote Web Inspector via Tizen Studio Tools → Device Manager',
        'Connect via Chrome DevTools with sdb forward',
      ],
      android: [
        'Enable USB Debugging in Developer Options',
        'Use Android Studio Profiler or Chrome DevTools',
        'adb shell am start --enable-debugging for debug builds',
        'chrome://inspect works for WebView-based apps',
      ],
    };

    return (
      <Box flexDirection="column" padding={1} gap={1}>
        <Text bold color={meta.color}>{ICONS.debug}  Debug Info  <Text color="gray">[{meta.label}]</Text></Text>
        <Box flexDirection="column" borderStyle="round" borderColor={meta.color} paddingX={2} paddingY={1} gap={1}>
          <Text bold>Setup Steps</Text>
          {(debugInfo[platform] ?? []).map((line, i) => (
            <Box key={i}>
              <Text color={meta.color}>{ICONS.arrow} </Text>
              <Text color="white" wrap="wrap">{line}</Text>
            </Box>
          ))}
        </Box>
        <Box borderStyle="round" borderColor="gray" paddingX={2} paddingY={1}>
          <Text dimColor>
            {ICONS.info}  For {meta.label} debugging, use the platform's native tools alongside tvdev.
          </Text>
        </Box>
      </Box>
    );
  }

  if (loading) return <Box padding={2}><Loader label="Loading apps..." color={meta.color} /></Box>;

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={meta.color}>{ICONS.debug}  Web Inspector  <Text color="gray">[{device}]</Text></Text>
      <Text color="gray">Select an app to open the Web Inspector (ares-inspect).</Text>

      {result && (
        <Box borderStyle="round" borderColor="green" paddingX={2} paddingY={1}>
          <Text bold color="green">{ICONS.check}  Inspector launched!</Text>
          <Text color="gray">{'\n'}{result}</Text>
        </Box>
      )}
      {error && (
        <Box borderStyle="round" borderColor="red" paddingX={1}>
          <Text color="red">{ICONS.cross}  {error}</Text>
        </Box>
      )}
      {working && <Loader label="Launching Inspector..." color={meta.color} />}

      {!working && (
        <Box flexDirection="column" borderStyle="round" borderColor={meta.color} paddingX={1} paddingY={1}>
          <Text bold marginBottom={1}>Installed Apps</Text>
          {apps.length === 0 && <Text color="gray">  No apps found on device.</Text>}
          {apps.map((app, i) => (
            <Box key={app.id}>
              <Text
                bold={focused && i === cursor}
                color={focused && i === cursor ? meta.color : 'white'}
              >
                {focused && i === cursor ? '▶ ' : '  '}
                {app.id}
                {app.version && <Text dimColor>  v{app.version}</Text>}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      <Box flexDirection="column" borderStyle="round" borderColor="gray" paddingX={1}>
        <Text dimColor>
          {ICONS.info}  After launching, open the URL in your browser to debug the app.
        </Text>
      </Box>

      <Text dimColor>↑↓ select  ⏎ launch inspector  [r] refresh</Text>
    </Box>
  );
}
