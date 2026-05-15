import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META } from '../theme.js';
import { sendInput } from '../utils/amazon.js';
import { FIRE_TV_KEYS } from '../backend/commands/amazon.js';

const KEY_GROUPS = [
  { label: 'Navigation', keys: ['KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT', 'KEY_ENTER'] },
  { label: 'System',     keys: ['KEY_HOME', 'KEY_BACK', 'KEY_MENU'] },
  { label: 'Media',      keys: ['KEY_PLAY', 'KEY_PAUSE', 'KEY_PLAYPAUSE', 'KEY_REWIND', 'KEY_FASTFORWARD'] },
  { label: 'Volume',     keys: ['KEY_VOLUMEUP', 'KEY_VOLUMEDOWN', 'KEY_MUTE'] },
  { label: 'Numbers',    keys: ['KEY_0','KEY_1','KEY_2','KEY_3','KEY_4','KEY_5','KEY_6','KEY_7','KEY_8','KEY_9'] },
];

export default function InputSim({ focused, currentDevice, platform }) {
  const [groupIdx, setGroupIdx] = useState(0);
  const [keyIdx,   setKeyIdx]   = useState(0);
  const [working,  setWorking]  = useState(false);
  const [status,   setStatus]   = useState(null);
  const [inKey,    setInKey]    = useState(false);

  const meta   = PLATFORM_META[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;

  const currentGroup = KEY_GROUPS[groupIdx];
  const currentKeys  = currentGroup.keys;

  useInput(async (input, key) => {
    if (!focused) return;

    if (!inKey) {
      if (key.upArrow)    setGroupIdx(g => Math.max(0, g - 1));
      if (key.downArrow)  setGroupIdx(g => Math.min(KEY_GROUPS.length - 1, g + 1));
      if (key.rightArrow) setInKey(true);
      if (key.return)     setInKey(true);
    } else {
      if (key.leftArrow || key.escape) { setInKey(false); return; }
      if (key.upArrow)    setKeyIdx(k => Math.max(0, k - 1));
      if (key.downArrow)  setKeyIdx(k => Math.min(currentKeys.length - 1, k + 1));
      if (key.return) {
        const tvKey = currentKeys[keyIdx];
        setWorking(true);
        setStatus(null);
        try {
          await sendInput(tvKey);
          setStatus({ ok: true, msg: `Sent: ${tvKey}` });
        } catch (e) {
          setStatus({ ok: false, msg: e.message });
        }
        setWorking(false);
      }
    }
  }, { isActive: focused });

  if (!device) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="yellow">{ICONS.warn}  No device selected.</Text>
        <Text color="gray">Go to Devices screen and connect a Fire TV device.</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={meta.color}>{ICONS.input}  Input Simulator  <Text color="gray">[{device}]</Text></Text>
      <Text color="gray" dimColor>Sends remote control key events via inputd-cli</Text>

      {status && (
        <Box borderStyle="round" borderColor={status.ok ? 'green' : 'red'} paddingX={1}>
          <Text color={status.ok ? 'green' : 'red'}>
            {status.ok ? ICONS.check : ICONS.cross}  {status.msg}
          </Text>
        </Box>
      )}
      {working && <Loader label="Sending key..." color={meta.color} />}

      <Box gap={2}>
        {/* Group list */}
        <Box flexDirection="column" borderStyle="round" borderColor={!inKey ? meta.color : 'gray'} paddingX={1} paddingY={1} width={16}>
          <Text bold color={!inKey ? meta.color : 'gray'}>Groups</Text>
          {KEY_GROUPS.map((g, i) => (
            <Box key={g.label}>
              <Text
                bold={i === groupIdx}
                color={i === groupIdx ? meta.color : 'gray'}
              >
                {i === groupIdx ? '▶ ' : '  '}{g.label}
              </Text>
            </Box>
          ))}
        </Box>

        {/* Key list */}
        <Box flexDirection="column" borderStyle="round" borderColor={inKey ? meta.color : 'gray'} paddingX={1} paddingY={1} width={26}>
          <Text bold color={inKey ? meta.color : 'gray'}>{currentGroup.label}</Text>
          {currentKeys.map((k, i) => (
            <Box key={k}>
              <Text
                bold={inKey && i === keyIdx}
                color={inKey && i === keyIdx ? meta.color : 'white'}
              >
                {inKey && i === keyIdx ? '▶ ' : '  '}{k.replace('KEY_', '')}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Text dimColor>
        {!inKey
          ? '↑↓ group  → / ⏎ into keys'
          : '↑↓ key  ⏎ send  ← / Esc back'}
      </Text>
    </Box>
  );
}
