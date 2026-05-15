import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META } from '../theme.js';
import * as webos   from '../utils/webos.js';
import * as tizen   from '../utils/tizen.js';
import * as amazon  from '../utils/amazon.js';
import * as android from '../utils/android.js';

const UTILS = { webos, tizen, amazon, android };
const MAX_HISTORY = 100;

export default function Shell({ focused, currentDevice, platform }) {
  const [input,   setInput]   = useState('');
  const [history, setHistory] = useState([]);
  const [cmdHist, setCmdHist] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [working, setWorking] = useState(false);

  const meta   = PLATFORM_META[platform];
  const utils  = UTILS[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;

  async function execute(cmd) {
    if (!cmd.trim()) return;
    const entry = { cmd, output: null, error: null, ts: new Date().toLocaleTimeString() };
    setHistory(h => [...h, entry].slice(-MAX_HISTORY));
    setCmdHist(h => [cmd, ...h.filter(c => c !== cmd)].slice(-50));
    setHistIdx(-1);
    setInput('');
    setWorking(true);

    try {
      const opts = platform === 'webos'
        ? { command: cmd, device }
        : { command: cmd, serial: device };
      const out = await utils.runShellCommand(opts);
      setHistory(h => {
        const copy = [...h];
        copy[copy.length - 1] = { ...copy[copy.length - 1], output: out };
        return copy;
      });
    } catch (e) {
      setHistory(h => {
        const copy = [...h];
        copy[copy.length - 1] = { ...copy[copy.length - 1], error: e.message };
        return copy;
      });
    }
    setWorking(false);
  }

  useInput((inp, key) => {
    if (!focused) return;
    if (key.upArrow && cmdHist.length > 0) {
      const next = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(next);
      setInput(cmdHist[next]);
    }
    if (key.downArrow) {
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(''); }
      else          { setHistIdx(next); setInput(cmdHist[next]); }
    }
    if (inp === 'c' && key.ctrl) setHistory([]);
  }, { isActive: focused });

  if (!device) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="yellow">{ICONS.warn}  No device selected.</Text>
      </Box>
    );
  }

  const visible = history.slice(-(process.stdout.rows - 12 || 10));

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Text bold color={meta.color}>{ICONS.shell}  Shell  <Text color="gray">[{device}]</Text></Text>

      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        height={Math.max(8, (process.stdout.rows || 30) - 12)}
      >
        {history.length === 0 && (
          <Text color="gray">  Type a command below and press Enter to run it on the device.</Text>
        )}
        {visible.map((entry, i) => (
          <Box key={i} flexDirection="column">
            <Text color={meta.color}>
              <Text dimColor>[{entry.ts}] </Text>$ {entry.cmd}
            </Text>
            {entry.output != null && <Text color="white" wrap="wrap">{entry.output}</Text>}
            {entry.error  != null && <Text color="red">{ICONS.cross}  {entry.error}</Text>}
          </Box>
        ))}
        {working && <Loader label="Running..." color={meta.color} />}
      </Box>

      <Box borderStyle="round" borderColor={focused ? meta.color : 'gray'} paddingX={1}>
        <Text color={meta.color}>$ </Text>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={execute}
          placeholder="Enter command... (↑↓ history, Ctrl+C clear)"
          focus={focused && !working}
        />
      </Box>

      <Text dimColor>↑↓ command history  Ctrl+C clear output</Text>
    </Box>
  );
}
