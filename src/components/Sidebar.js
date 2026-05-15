import React from 'react';
import { Box, Text } from 'ink';
import { NAV_ITEMS, PLATFORM_META } from '../theme.js';

export default function Sidebar({ menuIndex, currentScreen, focused, platform }) {
  const items = platform ? NAV_ITEMS[platform] : [];
  const meta  = platform ? PLATFORM_META[platform] : null;
  const color = meta?.color ?? 'gray';

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={focused ? color : 'gray'}
      width={24}
      paddingX={1}
    >
      <Text bold color={focused ? color : 'gray'}>Navigation</Text>
      <Box flexDirection="column" marginTop={1}>
        {items.map((item, i) => {
          const isCursor  = focused && i === menuIndex;
          const isCurrent = !focused && item.id === currentScreen;
          const isActive  = isCursor || isCurrent;

          return (
            <Box key={item.id}>
              <Text
                bold={isActive}
                color={isCursor ? color : isCurrent ? 'white' : 'gray'}
              >
                {isCursor ? '▶ ' : '  '}
                {item.icon} {item.label}
              </Text>
            </Box>
          );
        })}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>─────────────</Text>
      </Box>
      <Text dimColor color="gray">↑↓ navigate</Text>
      <Text dimColor color="gray">⏎  select</Text>
    </Box>
  );
}
