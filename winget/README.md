# WinGet - Windows Package Manager

- <https://docs.microsoft.com/en-us/windows/package-manager/winget/>
- <https://github.com/microsoft/winget-cli>

## Settings

You can configure WinGet by editing the `settings.json` file. Running `winget settings` will open the file in the default json editor; if no editor is configured, Windows will prompt for you to select an editor, and Notepad is sensible option if you have no other preference.

### File Location

Settings file is located in %LOCALAPPDATA%\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\settings.json

If you are using the non-packaged WinGet version by building it from source code, the file will be located under %LOCALAPPDATA%\Microsoft\WinGet\Settings\settings.json

### My Settings:

```powershell
{
    "$schema": "https://aka.ms/winget-settings.schema.json",
    // For documentation on these settings, see: https://aka.ms/winget-settings
    "source": {
        "autoUpdateIntervalInMinutes": 3
    },
    "visual": {
        "progressBar": "rainbow"
    },
    "installBehavior": {
        "preferences": {
            "scope": "machine",
            "locale": [
                "en-US"
            ]
        }
    },
    "telemetry": {
        "disable": true
    },
    "network": {
        "downloader": "do",
        "doProgressTimeoutInSeconds": 60
    },
    "experimentalFeatures": {
        "experimentalCmd": true,
        "experimentalArg": true,
        "experimentalMSStore": true,
        "packagedAPI": true,
        "dependencies": true,
        "list": true,
        "upgrade": true,
        "uninstall": true
    }
}

```

## Installations

After installing a fresh new Windows OS, utilize winget for the initial installations of software because it should be built into the new OS out of the box:

- `winget-installs.ps1` Script:

```powershell

```
