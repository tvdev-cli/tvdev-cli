import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { ICONS } from '../theme.js';

export default function Loader({ label = 'Loading...', color = 'cyan' }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % ICONS.spinner.length), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <Box>
      <Text color={color}>{ICONS.spinner[frame]} </Text>
      <Text color="gray">{label}</Text>
    </Box>
  );
}
