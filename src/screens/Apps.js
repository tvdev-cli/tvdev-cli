import React, { useState, useEffect, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META } from '../theme.js';
import * as webos   from '../utils/webos.js';
import * as tizen   from '../utils/tizen.js';
import * as amazon  from '../utils/amazon.js';
import * as android from '../utils/android.js';

const UTILS = { webos, tizen, amazon, android };
const MODES = { LIST: 'list', CONFIRM_REMOVE: 'confirm_remove', LAUNCH_OPTS: 'launch_opts' };

export default function Apps({ focused, currentDevice, platform }) {
  const [apps,    setApps]    = useState([]);
  const [running, setRunning] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursor,  setCursor]  = useState(0);
  const [mode,    setMode]    = useState(MODES.LIST);
  const [status,  setStatus]  = useState(null);
  const [working, setWorking] = useState(false);

  const meta   = PLATFORM_META[platform];
  const utils  = UTILS[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;

  const load = useCallback(async () => {
    if (!device) { setLoading(false); return; }
    setLoading(true);
    const ins = await utils.listInstalledApps(device).catch(() => []);
    setApps(ins);
    if (utils.listRunningApps) {
      const run = await utils.listRunningApps(device).catch(() => []);
      setRunning(run);
    }
    setCursor(0);
    setLoading(false);
  }, [device, platform]);

  useEffect(() => { load(); }, [device, platform]);

  const isRunning = (id) => running.includes(id);

  useInput(async (input, key) => {
    if (!focused) return;

    if (mode === MODES.LIST) {
      if (key.upArrow)   setCursor(c => Math.max(0, c - 1));
      if (key.downArrow) setCursor(c => Math.min(apps.length - 1, c + 1));
      if (input === 'r') { setStatus(null); load(); return; }

      const app = apps[cursor];
      if (!app) return;

      if (input === 'l' || key.return) {
        setWorking(true);
        try {
          if (platform === 'webos') {
            if (isRunning(app.id)) {
              await utils.closeApp({ appId: app.id, device });
              setStatus({ ok: true, msg: `Stopped ${app.id}` });
            } else {
              await utils.launchApp({ appId: app.id, device });
              setStatus({ ok: true, msg: `Launched ${app.id}` });
            }
          } else if (platform === 'tizen') {
            await utils.launchApp({ appId: app.id, serial: device });
            setStatus({ ok: true, msg: `Launched ${app.id}` });
          } else {
            if (isRunning(app.id)) {
              await utils.stopApp({ packageName: app.id, serial: device });
              setStatus({ ok: true, msg: `Stopped ${app.id}` });
            } else {
              await utils.launchApp({ packageName: app.id, activity: '.MainActivity', serial: device });
              setStatus({ ok: true, msg: `Launched ${app.id}` });
            }
          }
          await load();
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setWorking(false);
      }
      if (input === 'd') setMode(MODES.CONFIRM_REMOVE);
    }

    if (mode === MODES.CONFIRM_REMOVE) {
      if (input === 'y') {
        setWorking(true);
        try {
          const app = apps[cursor];
          if (platform === 'webos') {
            await utils.removeApp({ appId: app.id, device });
          } else if (platform === 'tizen') {
            await utils.removeApp({ appId: app.id, serial: device });
          } else {
            await utils.removeApp({ packageName: app.id, serial: device });
          }
          setStatus({ ok: true, msg: `Removed ${apps[cursor].id}` });
          await load();
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setMode(MODES.LIST);
        setWorking(false);
      }
      if (input === 'n' || key.escape) setMode(MODES.LIST);
    }
  }, { isActive: focused });

  if (!device) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="yellow">{ICONS.warn}  No device selected.</Text>
        <Text color="gray">Go to Devices screen and set an active device.</Text>
      </Box>
    );
  }

  if (loading) return <Box padding={2}><Loader label="Loading apps..." color={meta.color} /></Box>;

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={meta.color}>
        {ICONS.apps}  App Manager  <Text color="gray">[{device}]</Text>
      </Text>

      {status && (
        <Box borderStyle="round" borderColor={status.ok ? 'green' : 'red'} paddingX={1}>
          <Text color={status.ok ? 'green' : 'red'}>
            {status.ok ? ICONS.check : ICONS.cross}  {status.msg}
          </Text>
        </Box>
      )}

      {working && <Loader label="Working..." color={meta.color} />}

      <Box flexDirection="column" borderStyle="round" borderColor={meta.color} paddingX={1}>
        <Box marginBottom={1}>
          <Text bold color="gray">{'Status'.padEnd(10)}</Text>
          <Text bold color="gray">{'Package / App ID'.padEnd(40)}</Text>
          <Text bold color="gray">Version</Text>
        </Box>
        {apps.length === 0 && <Text color="gray">  No apps installed on {device}</Text>}
        {apps.map((app, i) => {
          const run = isRunning(app.id);
          return (
            <Box key={app.id}>
              <Text
                bold={focused && i === cursor}
                color={focused && i === cursor ? meta.color : 'white'}
              >
                {focused && i === cursor ? '▶ ' : '  '}
                <Text color={run ? 'green' : 'gray'}>
                  {run ? `${ICONS.running} RUN ` : `${ICONS.stopped} STOP`}
                </Text>
                {'  '}
                {app.id.padEnd(38)}
                <Text color="gray">  {app.version}</Text>
              </Text>
            </Box>
          );
        })}
      </Box>

      {mode === MODES.CONFIRM_REMOVE && apps[cursor] && (
        <Box borderStyle="round" borderColor="red" paddingX={2} paddingY={1}>
          <Text color="red">Remove </Text>
          <Text bold color="white">{apps[cursor].id}</Text>
          <Text color="red">? </Text>
          <Text color="yellow">[y] Yes  [n] No</Text>
        </Box>
      )}

      <Text dimColor>↑↓ navigate  ⏎/[l] Launch/Stop  [d] Remove  [r] Refresh</Text>
    </Box>
  );
}
