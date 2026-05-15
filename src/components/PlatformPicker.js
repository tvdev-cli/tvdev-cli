import React, { useState } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { PLATFORM_IDS, PLATFORM_META, COLORS } from '../theme.js';

export default function PlatformPicker({ onSelect }) {
  const { exit } = useApp();
  const [cursor, setCursor] = useState(0);

  useInput((input, key) => {
    if (key.ctrl && input === 'c') { exit(); return; }
    if (input === 'q') { exit(); return; }
    if (key.upArrow)   setCursor(i => Math.max(0, i - 1));
    if (key.downArrow) setCursor(i => Math.min(PLATFORM_IDS.length - 1, i + 1));
    if (key.return)    onSelect(PLATFORM_IDS[cursor]);

    const num = parseInt(input);
    if (num >= 1 && num <= PLATFORM_IDS.length) {
      onSelect(PLATFORM_IDS[num - 1]);
    }
  });

  const cols = process.stdout.columns || 80;

  return (
    <Box flexDirection="column" width={cols} padding={2} gap={1}>
      <Box
        borderStyle="double"
        borderColor="#818CF8"
        paddingX={2}
        paddingY={1}
        flexDirection="column"
        alignItems="center"
      >
        <Text bold color="#818CF8">◉  TV Dev Manager</Text>
        <Text color="#64748B">Universal Smart TV Development CLI</Text>
      </Box>

      <Box flexDirection="column" borderStyle="round" borderColor="#475569" paddingX={2} paddingY={1} gap={1}>
        <Text bold color="#E2E8F0">Select Platform</Text>
        <Text color="#64748B" dimColor>↑↓ navigate  ⏎ select  1-4 quick pick  q quit</Text>

        <Box flexDirection="column" marginTop={1} gap={1}>
          {PLATFORM_IDS.map((id, i) => {
            const meta    = PLATFORM_META[id];
            const active  = i === cursor;

            return (
              <Box key={id} gap={2}>
                <Text bold color={active ? meta.color : '#475569'}>
                  {active ? '▶' : ' '} {i + 1}.
                </Text>
                <Box flexDirection="column">
                  <Text bold={active} color={active ? meta.color : '#94A3B8'}>
                    {meta.icon}  {meta.label}
                  </Text>
                  <Text color="#64748B" dimColor>
                    {'   '}{meta.hint}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
