import { describe, it, expect } from 'vitest';

// webOS
import {
  buildAddDeviceArgs, buildGenerateArgs, buildPackageArgs,
  buildInstallArgs, buildLaunchArgs, buildShellArgs, buildLogArgs,
} from '../../src/backend/commands/webos.js';

// Tizen
import {
  buildSdbConnectArgs, buildTizenCreateArgs, buildTizenPackageArgs,
  buildTizenInstallArgs, buildTizenRunArgs,
} from '../../src/backend/commands/tizen.js';

// Amazon
import {
  buildAdbConnectArgs, buildAdbInstallArgs, buildInputdArgs,
} from '../../src/backend/commands/amazon.js';

// Android
import {
  buildAdbConnectArgs as buildAndroidConnectArgs,
  buildGradleArgs, buildEmulatorArgs,
} from '../../src/backend/commands/android.js';

// ── webOS ──────────────────────────────────────────────────────────────────
describe('webOS commands', () => {
  it('buildAddDeviceArgs minimal', () => {
    const args = buildAddDeviceArgs({ name: 'tv', host: '192.168.1.100' });
    expect(args).toContain('--add');
    expect(args).toContain('tv');
    expect(args).toContain('host=192.168.1.100');
  });

  it('buildAddDeviceArgs with password', () => {
    const args = buildAddDeviceArgs({ name: 'tv', host: '192.168.1.100', password: 'secret' });
    expect(args).toContain('password=secret');
  });

  it('buildGenerateArgs', () => {
    const args = buildGenerateArgs({ template: 'webapp', outDir: './myapp', appId: 'com.test.app' });
    expect(args).toContain('-t');
    expect(args).toContain('webapp');
    expect(args).toContain('id=com.test.app');
  });

  it('buildPackageArgs with excludes', () => {
    const args = buildPackageArgs({ appDir: './app', outDir: './dist', excludes: ['node_modules'] });
    expect(args).toContain('./app');
    expect(args).toContain('-e');
    expect(args).toContain('node_modules');
  });

  it('buildInstallArgs with device', () => {
    const args = buildInstallArgs({ ipkPath: 'app.ipk', device: 'myTV' });
    expect(args).toContain('app.ipk');
    expect(args).toContain('-d');
    expect(args).toContain('myTV');
  });

  it('buildShellArgs', () => {
    const args = buildShellArgs({ command: 'ls -la', device: 'tv' });
    expect(args).toContain('--cmd');
    expect(args).toContain('ls -la');
  });

  it('buildLogArgs follow', () => {
    const args = buildLogArgs({ device: 'tv', follow: true, lines: 50 });
    expect(args).toContain('-f');
    expect(args).toContain('50');
  });
});

// ── Tizen ──────────────────────────────────────────────────────────────────
describe('Tizen commands', () => {
  it('buildSdbConnectArgs default port', () => {
    const args = buildSdbConnectArgs({ host: '192.168.1.50' });
    expect(args).toContain('connect');
    expect(args[1]).toContain('192.168.1.50:26101');
  });

  it('buildSdbConnectArgs custom port', () => {
    const args = buildSdbConnectArgs({ host: '192.168.1.50', port: 8080 });
    expect(args[1]).toContain('8080');
  });

  it('buildTizenCreateArgs', () => {
    const args = buildTizenCreateArgs({ template: 'WebBasicapp', name: 'MyApp' });
    expect(args).toContain('create');
    expect(args).toContain('web-project');
    expect(args).toContain('MyApp');
  });

  it('buildTizenPackageArgs', () => {
    const args = buildTizenPackageArgs({ projectDir: './myapp', type: 'wgt' });
    expect(args).toContain('package');
    expect(args).toContain('-t');
    expect(args).toContain('wgt');
  });

  it('buildTizenInstallArgs with serial', () => {
    const args = buildTizenInstallArgs({ wgtPath: 'app.wgt', serial: 'TV01' });
    expect(args).toContain('install');
    expect(args).toContain('-t');
    expect(args).toContain('TV01');
  });

  it('buildTizenRunArgs', () => {
    const args = buildTizenRunArgs({ appId: 'com.example.app', serial: 'TV01' });
    expect(args).toContain('run');
    expect(args).toContain('com.example.app');
  });
});

// ── Amazon ─────────────────────────────────────────────────────────────────
describe('Amazon commands', () => {
  it('buildAdbConnectArgs default port 5555', () => {
    const args = buildAdbConnectArgs({ host: '10.0.0.1' });
    expect(args).toContain('connect');
    expect(args[1]).toBe('10.0.0.1:5555');
  });

  it('buildAdbInstallArgs with replace flag', () => {
    const args = buildAdbInstallArgs({ apkPath: 'app.apk', serial: 'abc123', replace: true });
    expect(args).toContain('-r');
    expect(args).toContain('app.apk');
  });

  it('buildInputdArgs', () => {
    const args = buildInputdArgs({ key: 'KEY_HOME' });
    expect(args).toContain('send');
    expect(args).toContain('KEY_HOME');
  });
});

// ── Android ────────────────────────────────────────────────────────────────
describe('Android commands', () => {
  it('buildAndroidConnectArgs', () => {
    const args = buildAndroidConnectArgs({ host: '10.0.0.2', port: 5555 });
    expect(args[1]).toBe('10.0.0.2:5555');
  });

  it('buildGradleArgs debug', () => {
    const args = buildGradleArgs({ task: 'assembleDebug' });
    expect(args).toContain('assembleDebug');
  });

  it('buildGradleArgs release', () => {
    const args = buildGradleArgs({ task: 'assembleRelease' });
    expect(args).toContain('assembleRelease');
  });

  it('buildEmulatorArgs', () => {
    const args = buildEmulatorArgs({ avdName: 'TV_API33' });
    expect(args).toContain('-avd');
    expect(args).toContain('TV_API33');
  });
});
