# Release Process

## Quick release

```bash
npm version patch   # or minor / major
git push origin main --follow-tags
```

The `npm version` command:
1. Updates `package.json` version
2. Creates a git commit (`chore(release): vX.Y.Z`)
3. Creates a git tag (`vX.Y.Z`)

Pushing the tag triggers the `release.yml` workflow which:
- Runs tests
- Validates tag matches `package.json`
- Publishes to npm
- Creates a GitHub Release

## Pre-releases (beta)

```bash
npm version prerelease --preid=beta   # e.g. 1.0.1-beta.0
git push origin main --follow-tags
```

Beta releases publish to npm with `--tag beta` and are marked as pre-release on GitHub.

## Platform CLI dependencies

| Platform | Required tools |
|---|---|
| LG webOS | `npm install -g @webosose/ares-cli` |
| Samsung Tizen | Tizen Studio (tizen + sdb) |
| Amazon Fire TV | `adb` (Android Platform Tools) + `inputd-cli` + `LoggingCtl` |
| Android TV | Android SDK (`adb`, `gradle`, `avdmanager`, `emulator`) |
