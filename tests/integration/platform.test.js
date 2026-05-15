import { describe, it, expect, vi } from 'vitest';

describe('platform utils interface', () => {
  it('all platforms export checkAvailable', async () => {
    const { checkAvailable: webosCheck }   = await import('../../src/utils/webos.js');
    const { checkAvailable: tizenCheck }   = await import('../../src/utils/tizen.js');
    const { checkAvailable: amazonCheck }  = await import('../../src/utils/amazon.js');
    const { checkAvailable: androidCheck } = await import('../../src/utils/android.js');

    expect(typeof webosCheck).toBe('function');
    expect(typeof tizenCheck).toBe('function');
    expect(typeof amazonCheck).toBe('function');
    expect(typeof androidCheck).toBe('function');
  });

  it('all platforms export listDevices', async () => {
    const { listDevices: a } = await import('../../src/utils/webos.js');
    const { listDevices: b } = await import('../../src/utils/tizen.js');
    const { listDevices: c } = await import('../../src/utils/amazon.js');
    const { listDevices: d } = await import('../../src/utils/android.js');
    [a, b, c, d].forEach(fn => expect(typeof fn).toBe('function'));
  });

  it('all platforms export spawnLogStream', async () => {
    const { spawnLogStream: a } = await import('../../src/utils/webos.js');
    const { spawnLogStream: b } = await import('../../src/utils/tizen.js');
    const { spawnLogStream: c } = await import('../../src/utils/amazon.js');
    const { spawnLogStream: d } = await import('../../src/utils/android.js');
    [a, b, c, d].forEach(fn => expect(typeof fn).toBe('function'));
  });

  it('all platforms export INSTALL_HINT', async () => {
    const { INSTALL_HINT: a } = await import('../../src/utils/webos.js');
    const { INSTALL_HINT: b } = await import('../../src/utils/tizen.js');
    const { INSTALL_HINT: c } = await import('../../src/utils/amazon.js');
    const { INSTALL_HINT: d } = await import('../../src/utils/android.js');
    [a, b, c, d].forEach(h => expect(typeof h).toBe('string'));
  });
});

describe('theme NAV_ITEMS', () => {
  it('all platforms have nav items', async () => {
    const { NAV_ITEMS, PLATFORM_IDS } = await import('../../src/theme.js');
    for (const p of PLATFORM_IDS) {
      expect(Array.isArray(NAV_ITEMS[p])).toBe(true);
      expect(NAV_ITEMS[p].length).toBeGreaterThan(0);
    }
  });

  it('all nav items have id, label, icon', async () => {
    const { NAV_ITEMS } = await import('../../src/theme.js');
    for (const items of Object.values(NAV_ITEMS)) {
      for (const item of items) {
        expect(typeof item.id).toBe('string');
        expect(typeof item.label).toBe('string');
        expect(typeof item.icon).toBe('string');
      }
    }
  });
});

describe('platform switch — source verification', () => {
  it('StatusBar sidebar hints include platform switch key', async () => {
    const { readFileSync } = await import('fs');
    const { resolve } = await import('path');
    const src = readFileSync(resolve('src/components/StatusBar.js'), 'utf8');
    expect(src).toMatch(/p\s+Platform/i);
  });

  it('App handles p key to reset platform (setPlatform null)', async () => {
    const { readFileSync } = await import('fs');
    const { resolve } = await import('path');
    const src = readFileSync(resolve('src/App.js'), 'utf8');
    expect(src).toMatch(/input === ['"]p['"]/);
    expect(src).toMatch(/setPlatform\(null\)/);
  });

  it('Header shows [p] switch platform hint', async () => {
    const { readFileSync } = await import('fs');
    const { resolve } = await import('path');
    const src = readFileSync(resolve('src/components/Header.js'), 'utf8');
    expect(src).toMatch(/\[p\] switch platform/i);
  });

  it('App p key also resets device and menu index', async () => {
    const { readFileSync } = await import('fs');
    const { resolve } = await import('path');
    const src = readFileSync(resolve('src/App.js'), 'utf8');
    expect(src).toMatch(/setCurrentDevice\(null\)/);
    expect(src).toMatch(/setMenuIndex\(0\)/);
  });
});
