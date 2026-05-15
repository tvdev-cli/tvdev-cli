import React from 'react';
import { Box, Text } from 'ink';
import { PLATFORM_META, ICONS } from '../theme.js';

export default function Header({ currentDevice, platform, onChangePlatform }) {
  const meta = platform ? PLATFORM_META[platform] : null;
  const width = process.stdout.columns || 80;

  const deviceText = currentDevice
    ? `${ICONS.connected} ${currentDevice.name} (${currentDevice.host})`
    : `${ICONS.disconnected} No device`;

  return (
    <Box
      borderStyle="round"
      borderColor={meta?.color ?? 'gray'}
      paddingX={1}
      width={width}
      justifyContent="space-between"
    >
      <Box gap={1}>
        <Text bold color={meta?.color ?? 'white'}>
          {meta?.icon ?? '◉'}  TV Dev Manager
        </Text>
        {meta && (
          <Text color={meta.color} dimColor>
            [{meta.label}]
          </Text>
        )}
      </Box>
      <Box gap={2}>
        <Text color={currentDevice ? 'green' : 'gray'}>{deviceText}</Text>
        {platform && <Text color="#818CF8" dimColor>[p] switch platform</Text>}
      </Box>
    </Box>
  );
}
