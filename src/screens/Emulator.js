import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META } from '../theme.js';
import * as tizen   from '../utils/tizen.js';
import * as android from '../utils/android.js';

const UTILS = { tizen, android };

export default function Emulator({ focused, platform }) {
  const [avds,    setAvds]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursor,  setCursor]  = useState(0);
  const [working, setWorking] = useState(false);
  const [status,  setStatus]  = useState(null);

  const meta  = PLATFORM_META[platform];
  const utils = UTILS[platform];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const list = await utils.listAvds();
        setAvds(list);
      } catch {
        setAvds([]);
      }
      setLoading(false);
    }
    load();
  }, [platform]);

  useInput(async (input, key) => {
    if (!focused) return;

    if (key.upArrow)   setCursor(c => Math.max(0, c - 1));
    if (key.downArrow) setCursor(c => Math.min(avds.length - 1, c + 1));
    if (input === 'r') {
      setLoading(true);
      const list = await utils.listAvds().catch(() => []);
      setAvds(list);
      setLoading(false);
    }

    if (key.return && avds[cursor]) {
      setWorking(true);
      setStatus(null);
      try {
        await utils.launchEmulator({ name: avds[cursor].name });
        setStatus({ ok: true, msg: `Emulator ${avds[cursor].name} launching...` });
      } catch (e) {
        setStatus({ ok: false, msg: e.message });
      }
      setWorking(false);
    }
  }, { isActive: focused });

  if (loading) return <Box padding={2}><Loader label="Loading emulators..." color={meta.color} /></Box>;

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={meta.color}>{ICONS.emulator}  Emulator Manager  <Text color="gray">[{meta.label}]</Text></Text>

      {status && (
        <Box borderStyle="round" borderColor={status.ok ? 'green' : 'red'} paddingX={1}>
          <Text color={status.ok ? 'green' : 'red'}>
            {status.ok ? ICONS.check : ICONS.cross}  {status.msg}
          </Text>
        </Box>
      )}
      {working && <Loader label="Launching emulator..." color={meta.color} />}

      <Box flexDirection="column" borderStyle="round" borderColor={meta.color} paddingX={1} paddingY={1}>
        <Text bold marginBottom={1}>Available Emulators / AVDs</Text>
        {avds.length === 0 && (
          <Box flexDirection="column" gap={1}>
            <Text color="gray">  No emulators found.</Text>
            {platform === 'android' && (
              <Text color="gray">{'  Create one with: avdmanager create avd -n <name> -k "system-images;android-33;google_tv;x86_64"'}</Text>
            )}
            {platform === 'tizen' && (
              <Text color="gray">  Create one in Tizen Studio → Emulator Manager</Text>
            )}
          </Box>
        )}
        {avds.map((avd, i) => (
          <Box key={avd.name}>
            <Text
              bold={focused && i === cursor}
              color={focused && i === cursor ? meta.color : 'white'}
            >
              {focused && i === cursor ? '▶ ' : '  '}
              {avd.name.padEnd(30)}
              {avd.api  && <Text color="gray">  API {avd.api}</Text>}
              {avd.type && <Text dimColor>  {avd.type}</Text>}
            </Text>
          </Box>
        ))}
      </Box>

      <Text color="gray" dimColor>{'↑↓ select  ⏎ launch  [r] refresh'}</Text>
    </Box>
  );
}
