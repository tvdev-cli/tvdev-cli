## Install

```bash
curl -fsSL https://raw.githubusercontent.com/FernandoHaeser/unified-tvdevelopment-cli/main/install.sh | bash
```

or via npm:

```bash
npm install -g unified-tvdevelopment-cli
```

Then run: `tvdev`

## Supported Platforms

| Platform | CLI Tools Required |
|---|---|
| LG webOS | `@webosose/ares-cli` |
| Samsung Tizen | Tizen Studio (`tizen` + `sdb`) |
| Amazon Fire TV | `adb` + `inputd-cli` + `LoggingCtl` |
| Android TV | Android SDK (`adb`, `gradle`, `avdmanager`) |
