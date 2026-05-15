import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import Loader from '../components/Loader.js';
import { ICONS, PLATFORM_META } from '../theme.js';
import * as webos   from '../utils/webos.js';
import * as tizen   from '../utils/tizen.js';
import * as amazon  from '../utils/amazon.js';
import * as android from '../utils/android.js';

const UTILS = { webos, tizen, amazon, android };
const MAX_LINES = 50;

export default function Logs({ focused, currentDevice, platform }) {
  const [lines,     setLines]     = useState([]);
  const [paused,    setPaused]    = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error,     setError]     = useState(null);
  const procRef = useRef(null);

  const meta   = PLATFORM_META[platform];
  const utils  = UTILS[platform];
  const device = currentDevice?.name ?? currentDevice?.serial;

  function startStream() {
    if (procRef.current) { procRef.current.kill(); procRef.current = null; }
    setLines([]);
    setError(null);
    setStreaming(true);

    try {
      const opts = platform === 'webos'
        ? { device, follow: true, lines: 50 }
        : { serial: device };

      const proc = utils.spawnLogStream(opts);
      procRef.current = proc;

      proc.stdout?.on('data', (chunk) => {
        if (paused) return;
        const newLines = chunk.toString().split('\n').filter(Boolean);
        setLines(prev => [...prev, ...newLines].slice(-MAX_LINES));
      });

      proc.stderr?.on('data', (chunk) => {
        setLines(prev => [...prev, `[stderr] ${chunk.toString().trim()}`].slice(-MAX_LINES));
      });

      proc.catch((e) => {
        if (e.signal !== 'SIGTERM') setError(e.message);
        setStreaming(false);
      });
    } catch (e) {
      setError(e.message);
      setStreaming(false);
    }
  }

  useEffect(() => {
    if (device && focused) startStream();
    return () => { procRef.current?.kill(); procRef.current = null; };
  }, [device, focused, platform]);

  useInput((input) => {
    if (!focused) return;
    if (input === 'p') setPaused(p => !p);
    if (input === 'c') setLines([]);
    if (input === 'r') startStream();
  }, { isActive: focused });

  if (!device) {
    return (
      <Box flexDirection="column" padding={2}>
        <Text color="yellow">{ICONS.warn}  No device selected.</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1} gap={1}>
      <Box justifyContent="space-between">
        <Text bold color={meta.color}>{ICONS.logs}  Log Viewer  <Text color="gray">[{device}]</Text></Text>
        <Text color={paused ? 'yellow' : 'green'}>
          {paused ? `${ICONS.stopped} PAUSED` : streaming ? `${ICONS.running} LIVE` : `${ICONS.disconnected} STOPPED`}
        </Text>
      </Box>

      {error && (
        <Box borderStyle="round" borderColor="red" paddingX={1}>
          <Text color="red">{ICONS.cross}  {error}</Text>
        </Box>
      )}

      {!streaming && !error && <Loader label="Starting log stream..." color={meta.color} />}

      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        height={Math.max(10, (process.stdout.rows || 30) - 12)}
      >
        {lines.length === 0 && <Text color="gray">  Waiting for log output...</Text>}
        {lines.map((line, i) => {
          const isError   = /error|fatal|critical|\sE\//i.test(line);
          const isWarning = /warn|\sW\//i.test(line);
          return (
            <Text
              key={i}
              color={isError ? 'red' : isWarning ? 'yellow' : 'white'}
              wrap="truncate"
            >
              {line}
            </Text>
          );
        })}
      </Box>

      <Text dimColor>[p] Pause/Resume  [c] Clear  [r] Restart  {lines.length}/{MAX_LINES} lines</Text>
    </Box>
  );
}
