import { describe, it, expect } from 'vitest';
import { parseDeviceTable, parseInstalledApps, parseTemplates, parseIpkFilename } from '../../src/backend/parsers/webos.js';
import { parseSdbDevices, parseTizenApps } from '../../src/backend/parsers/tizen.js';
import { parseAdbDevices as parseAmazonDevices, parseAdbPackages as parseAmazonPkgs } from '../../src/backend/parsers/amazon.js';
import { parseAdbDevices, parseAdbPackages, parseGradleOutput, parseAvdList } from '../../src/backend/parsers/android.js';

// ── webOS ──────────────────────────────────────────────────────────────────
describe('webOS parsers', () => {
  it('parseDeviceTable', () => {
    const out = `name         host           port  username
emulator     127.0.0.1      6622  developer  (default)
mytv         192.168.1.10   22    root`;
    const result = parseDeviceTable(out);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('emulator');
    expect(result[0].default).toBe(true);
    expect(result[1].name).toBe('mytv');
    expect(result[1].default).toBe(false);
  });

  it('parseInstalledApps', () => {
    const out = `List of apps
com.webos.app.home  1.0.0  Home App
com.example.myapp   2.1.0  My App`;
    const result = parseInstalledApps(out);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('com.webos.app.home');
    expect(result[0].version).toBe('1.0.0');
  });

  it('parseTemplates', () => {
    const out = `Available templates:
webapp        Basic web application
hosted_webapp Hosted web application`;
    const result = parseTemplates(out);
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].name).toBe('webapp');
  });

  it('parseIpkFilename', () => {
    const out = 'Packaging app... created myapp_1.0.0_all.ipk';
    expect(parseIpkFilename(out, './dist')).toBe('./dist/myapp_1.0.0_all.ipk');
  });

  it('parseIpkFilename returns null if none', () => {
    expect(parseIpkFilename('no file here', './dist')).toBeNull();
  });
});

// ── Tizen ──────────────────────────────────────────────────────────────────
describe('Tizen parsers', () => {
  it('parseSdbDevices', () => {
    const out = `List of devices attached
192.168.1.55:26101  device  SmartTV`;
    const result = parseSdbDevices(out);
    expect(result).toHaveLength(1);
    expect(result[0].host).toBe('192.168.1.55');
    expect(result[0].port).toBe('26101');
    expect(result[0].status).toBe('device');
  });

  it('parseSdbDevices filters offline', () => {
    const out = `List of devices attached
192.168.1.55:26101  offline  SmartTV`;
    expect(parseSdbDevices(out)).toHaveLength(0);
  });
});

// ── Amazon ─────────────────────────────────────────────────────────────────
describe('Amazon parsers', () => {
  it('parseAdbDevices', () => {
    const out = `List of devices attached
10.0.0.1:5555  device  model:AFTMM`;
    const result = parseAmazonDevices(out);
    expect(result).toHaveLength(1);
    expect(result[0].host).toBe('10.0.0.1');
    expect(result[0].name).toBe('AFTMM');
  });

  it('parseAdbPackages', () => {
    const out = `package:com.amazon.tv.launcher
package:com.example.app`;
    const result = parseAmazonPkgs(out);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('com.amazon.tv.launcher');
  });
});

// ── Android ────────────────────────────────────────────────────────────────
describe('Android parsers', () => {
  it('parseAdbDevices with model', () => {
    const out = `List of devices attached
emulator-5554  device  product:sdk_gphone model:sdk_gphone_x86 device:generic_x86`;
    const result = parseAdbDevices(out);
    expect(result).toHaveLength(1);
    expect(result[0].serial).toBe('emulator-5554');
  });

  it('parseAdbPackages', () => {
    const out = `package:com.android.tv\npackage:com.example.tvapp`;
    const result = parseAdbPackages(out);
    expect(result).toHaveLength(2);
  });

  it('parseGradleOutput success', () => {
    const out = 'BUILD SUCCESSFUL in 12s\napp/build/outputs/apk/debug/app-debug.apk';
    const result = parseGradleOutput(out);
    expect(result.success).toBe(true);
    expect(result.failed).toBe(false);
    expect(result.apkPath).toBeTruthy();
  });

  it('parseGradleOutput failure', () => {
    const out = 'BUILD FAILED\nSee report at build/reports/problems';
    const result = parseGradleOutput(out);
    expect(result.success).toBe(false);
    expect(result.failed).toBe(true);
  });

  it('parseAvdList', () => {
    const out = `---------
    Name: Pixel_3a_API_33_x86_64
    Device: pixel_3a (Google)
    Path: /Users/user/.android/avd/Pixel_3a_API_33_x86_64.avd
    Target: Google APIs (Google Inc.)
    API level: 33`;
    const result = parseAvdList(out);
    expect(result).toHaveLength(1);
    expect(result[0].api).toBe('33');
  });
});
