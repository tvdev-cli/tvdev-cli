import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META, NAV_ITEMS } from '../theme.js';
import * as webos   from '../utils/webos.js';
import * as tizen   from '../utils/tizen.js';
import * as amazon  from '../utils/amazon.js';
import * as android from '../utils/android.js';

const UTILS = { webos, tizen, amazon, android };

export default function Dashboard({ focused, currentDevice, platform, onDeviceChange, onNavigate }) {
  const [devices,  setDevices]  = useState([]);
  const [apps,     setApps]     = useState([]);
  const [cliOk,    setCliOk]    = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [menuIdx,  setMenuIdx]  = useState(0);

  const meta      = PLATFORM_META[platform];
  const utils     = UTILS[platform];
  const navItems  = NAV_ITEMS[platform];

  const quickActions = navItems
    .filter(n => n.id !== 'dashboard')
    .slice(0, 6)
    .map((n, i) => ({
      key:    String(i + 1),
      label:  n.label,
      screen: n.id,
      icon:   n.icon,
    }));

  useEffect(() => {
    async function load() {
      setLoading(true);
      const ok = await utils.checkAvailable().catch(() => false);
      setCliOk(ok);
      if (ok) {
        const devs = await utils.listDevices().catch(() => []);
        setDevices(devs);
        const def = devs.find(d => d.default) || devs[0];
        if (def && !currentDevice) onDeviceChange(def);
        if (def && utils.listInstalledApps) {
          const a = await utils.listInstalledApps(def.name ?? def.serial).catch(() => []);
          setApps(a);
        }
      }
      setLoading(false);
    }
    load();
  }, [platform]);

  useInput((input, key) => {
    if (!focused) return;
    if (key.upArrow)   setMenuIdx(i => Math.max(0, i - 1));
    if (key.downArrow) setMenuIdx(i => Math.min(quickActions.length - 1, i + 1));
    if (key.return)    onNavigate(quickActions[menuIdx].screen);
    const action = quickActions.find(a => a.key === input);
    if (action) onNavigate(action.screen);
  }, { isActive: focused });

  if (loading) {
    return (
      <Box flexDirection="column" padding={2}>
        <Loader label={`Loading ${meta.label} info...`} color={meta.color} />
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      {!cliOk && (
        <Box borderStyle="round" borderColor="red" paddingX={2} paddingY={1}>
          <Text color="red" bold>{ICONS.warn} CLI tools not found.  </Text>
          <Text color="gray">{utils.INSTALL_HINT}</Text>
        </Box>
      )}

      <Box gap={2}>
        <Box flexDirection="column" borderStyle="round" borderColor={meta.color} paddingX={1} paddingY={0} width={34}>
          <Text bold color={meta.color}>{meta.icon}  Devices</Text>
          <Box flexDirection="column" marginTop={1}>
            {devices.length === 0 && <Text color="gray">  No devices found</Text>}
            {devices.map(d => (
              <Box key={d.name ?? d.serial}>
                <Text color={d.default ? 'green' : 'gray'}>
                  {d.default ? ICONS.connected : ICONS.disconnected}{' '}
                  <Text bold={d.default}>{d.name ?? d.serial}</Text>
                  <Text dimColor>  {d.host}:{d.port}</Text>
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        <Box flexDirection="column" borderStyle="round" borderColor="magenta" paddingX={1} paddingY={0} width={40}>
          <Text bold color="magenta">
            {ICONS.apps}  Installed Apps
            {currentDevice && <Text dimColor>  [{currentDevice.name ?? currentDevice.serial}]</Text>}
          </Text>
          <Box flexDirection="column" marginTop={1}>
            {apps.length === 0 && <Text color="gray">  No apps / select a device first</Text>}
            {apps.slice(0, 8).map(app => (
              <Box key={app.id}>
                <Text color="white">{ICONS.arrow} </Text>
                <Text>{app.id}</Text>
                {app.version && <Text dimColor>  v{app.version}</Text>}
              </Box>
            ))}
            {apps.length > 8 && <Text dimColor>  ... +{apps.length - 8} more</Text>}
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" borderStyle="round" borderColor={focused ? meta.color : 'gray'} paddingX={1} paddingY={0}>
        <Text bold color={focused ? meta.color : 'gray'}>Quick Actions</Text>
        <Box flexDirection="column" marginTop={1}>
          {quickActions.map((a, i) => (
            <Box key={a.screen}>
              <Text
                bold={focused && i === menuIdx}
                color={focused && i === menuIdx ? meta.color : 'white'}
              >
                {focused && i === menuIdx ? '▶ ' : '  '}
                <Text dimColor>[{a.key}]</Text>  {a.icon} {a.label}
              </Text>
            </Box>
          ))}
        </Box>
        {focused && <Text dimColor marginTop={1}>↑↓ navigate  ⏎ open  or press shortcut key</Text>}
      </Box>
    </Box>
  );
}
