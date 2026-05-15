import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';

describe('build output', () => {
  it('dist/cli.mjs exists after build', () => {
    const distPath = join(process.cwd(), 'dist', 'cli.mjs');
    expect(existsSync(distPath)).toBe(true);
  });

  it('dist/cli.mjs is executable (has shebang)', async () => {
    const { readFileSync } = await import('fs');
    const content = readFileSync(join(process.cwd(), 'dist', 'cli.mjs'), 'utf8');
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
  });
});
