# Microsoft Windows Terminal 💻

![](screenshot.png)



## Shells (Profiles)

- PowerShell 7: `pwsh`
- PowerShell Preview: `pwsh-preview`
- Windows PowerShell: `powershell`
- Command Prompt: `cmd`
- WSL - Ubuntu: `wsl -d Ubuntu`
- WSL - Ubuntu Community Preview: `wsl -d Ubuntu-CommPrev` or `ubuntupreview.exe`
- Git Bash: `git`
- R Terminal: `R`
- Radian: `radian.exe`

Possible Other Shells (Disabled/Hidden):

- Google Cloud SDK: `gcloud`
- PostgreSQL: `psql`
- Node.js: `node`
- Azure Cloud Shell: `Azure`
- mingw: `mingw64.exe`
- msys2: `msys2.exe`
- cygwin, etc.



## Settings

Location: `%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState\settings.json`

*Note path above is for Preview Version of Terminal*

Current `settings.json`:

```json
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions": [
        {
            "command": {
                "action": "copy",
                "singleLine": true
            },
            "keys": "ctrl+c"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command": "duplicateTab",
            "keys": "ctrl+shift+d"
        },
        {
            "command": {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "ctrl+alt+z"
        },
        {
            "command": {
                "action": "adjustFontSize",
                "delta": 1
            },
            "keys": "ctrl+-"
        },
        {
            "command": {
                "action": "nextTab"
            },
            "keys": "ctrl+pgdn"
        },
        {
            "command": "resetFontSize",
            "keys": "ctrl+0"
        },
        {
            "command": {
                "action": "prevTab"
            },
            "keys": "ctrl+pgup"
        },
        {
            "command": {
                "action": "commandPalette"
            },
            "keys": "ctrl+p"
        },
        {
            "command": "unbound",
            "keys": "ctrl+shift+p"
        }
    ],
    "copyFormatting": "none",
    "copyOnSelect": false,
    "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "profiles": {
        "defaults": {
            "acrylicOpacity": 0.0,
            "backgroundImage": "desktopWallpaper",
            "backgroundImageOpacity": 0.20000000000000001,
            "closeOnExit": "always",
            "colorScheme": "Campbell",
            "fontFace": "Cascadia Code",
            "padding": "4",
            "suppressApplicationTitle": true,
            "useAcrylic": true
        },
        "list": [
            {
                "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
                "hidden": false,
                "name": "PowerShell",
                "source": "Windows.Terminal.PowershellCore",
                "tabTitle": "PowerShell"
            },
            {
                "guid": "{a3a2e83a-884a-5379-baa8-16f193a13b21}",
                "hidden": false,
                "name": "PowerShell Preview",
                "source": "Windows.Terminal.PowershellCore"
            },
            {
                "commandline": "powershell.exe",
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "name": "Windows PowerShell"
            },
            {
                "commandline": "cmd.exe",
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "Command Prompt"
            },
            {
                "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
                "hidden": false,
                "name": "Ubuntu",
                "source": "Windows.Terminal.Wsl",
                "startingDirectory": "\\\\wsl.localhost\\Ubuntu\\home\\jimbrig"
            },
            {
                "guid": "{d1569d34-e3dc-506e-b3ef-3ca18387f714}",
                "hidden": false,
                "icon": "%USERPROFILE%\\OneDrive\\Pictures\\Terminal\\Terminal-Icons\\ubuntu.ico",
                "name": "Ubuntu-CommPrev",
                "source": "Windows.Terminal.Wsl",
                "startingDirectory": "\\\\wsl.localhost\\Ubuntu-CommPrev\\home\\jimbrig"
            },
            {
                "commandline": "C:/Program Files/Git/bin/bash.exe",
                "guid": "{a95f8da2-960a-48cf-9d1a-7e5e586df567}",
                "hidden": false,
                "icon": "%USERPROFILE%\\OneDrive\\Pictures\\Terminal\\Terminal-Icons\\git.ico",
                "name": "Git Bash",
                "tabTitle": "Git Bash"
            },
            {
                "commandline": "C:/Program Files/R/4.1.0/bin/R.exe",
                "hidden": false,
                "icon": "%USERPROFILE%\\OneDrive\\Pictures\\Terminal\\Terminal-Icons\\R.ico",
                "name": "R Terminal",
                "tabTitle": "R Terminal"
            },
            {
                "commandline": "C:\\Python39\\Scripts\\radian.exe",
                "hidden": false,
                "icon": "%USERPROFILE%\\OneDrive\\Pictures\\Terminal\\Terminal-Icons\\R.ico",
                "name": "Radian",
                "tabTitle": "Radian"
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": true,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            },
            {
                "guid": "{620e65d5-5d9b-55bf-873b-4a1dfa317ba4}",
                "hidden": true,
                "name": "Ubuntu on Windows Community Preview",
                "source": "CanonicalGroupLimited.UbuntuonWindowsCommunityPrev_79rhkp1fndgsc"
            }
        ]
    },
    "schemes": [
        {
            "background": "#0C0C0C",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#CCCCCC",
            "green": "#13A10E",
            "name": "Campbell",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#012456",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#CCCCCC",
            "green": "#13A10E",
            "name": "Campbell Powershell",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#000000",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#FFFFFF",
            "green": "#13A10E",
            "name": "Color Scheme 13",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#000000",
            "black": "#0C0C0C",
            "blue": "#0037DA",
            "brightBlack": "#767676",
            "brightBlue": "#3B78FF",
            "brightCyan": "#61D6D6",
            "brightGreen": "#16C60C",
            "brightPurple": "#B4009E",
            "brightRed": "#E74856",
            "brightWhite": "#F2F2F2",
            "brightYellow": "#F9F1A5",
            "cursorColor": "#FFFFFF",
            "cyan": "#3A96DD",
            "foreground": "#FFFFFF",
            "green": "#13A10E",
            "name": "Custom",
            "purple": "#881798",
            "red": "#C50F1F",
            "selectionBackground": "#FFFFFF",
            "white": "#CCCCCC",
            "yellow": "#C19C00"
        },
        {
            "background": "#1E1F29",
            "black": "#000000",
            "blue": "#BD93F9",
            "brightBlack": "#555555",
            "brightBlue": "#BD93F9",
            "brightCyan": "#8BE9FD",
            "brightGreen": "#50FA7B",
            "brightPurple": "#FF79C6",
            "brightRed": "#FF5555",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#F1FA8C",
            "cursorColor": "#FFFFFF",
            "cyan": "#8BE9FD",
            "foreground": "#F8F8F2",
            "green": "#50FA7B",
            "name": "Dracula",
            "purple": "#FF79C6",
            "red": "#FF5555",
            "selectionBackground": "#FFFFFF",
            "white": "#BBBBBB",
            "yellow": "#F1FA8C"
        },
        {
            "background": "#282C34",
            "black": "#282C34",
            "blue": "#61AFEF",
            "brightBlack": "#5A6374",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B6C2",
            "brightGreen": "#98C379",
            "brightPurple": "#C678DD",
            "brightRed": "#E06C75",
            "brightWhite": "#DCDFE4",
            "brightYellow": "#E5C07B",
            "cursorColor": "#FFFFFF",
            "cyan": "#56B6C2",
            "foreground": "#DCDFE4",
            "green": "#98C379",
            "name": "One Half Dark",
            "purple": "#C678DD",
            "red": "#E06C75",
            "selectionBackground": "#FFFFFF",
            "white": "#DCDFE4",
            "yellow": "#E5C07B"
        },
        {
            "background": "#FAFAFA",
            "black": "#383A42",
            "blue": "#0184BC",
            "brightBlack": "#4F525D",
            "brightBlue": "#61AFEF",
            "brightCyan": "#56B5C1",
            "brightGreen": "#98C379",
            "brightPurple": "#C577DD",
            "brightRed": "#DF6C75",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#E4C07A",
            "cursorColor": "#4F525D",
            "cyan": "#0997B3",
            "foreground": "#383A42",
            "green": "#50A14F",
            "name": "One Half Light",
            "purple": "#A626A4",
            "red": "#E45649",
            "selectionBackground": "#FFFFFF",
            "white": "#FAFAFA",
            "yellow": "#C18301"
        },
        {
            "background": "#000000",
            "black": "#002B36",
            "blue": "#268BD2",
            "brightBlack": "#073642",
            "brightBlue": "#839496",
            "brightCyan": "#93A1A1",
            "brightGreen": "#586E75",
            "brightPurple": "#6C71C4",
            "brightRed": "#CB4B16",
            "brightWhite": "#FDF6E3",
            "brightYellow": "#657B83",
            "cursorColor": "#FFFFFF",
            "cyan": "#2AA198",
            "foreground": "#839496",
            "green": "#859900",
            "name": "Solarized Dark",
            "purple": "#D33682",
            "red": "#DC322F",
            "selectionBackground": "#FFFFFF",
            "white": "#EEE8D5",
            "yellow": "#B58900"
        },
        {
            "background": "#FDF6E3",
            "black": "#002B36",
            "blue": "#268BD2",
            "brightBlack": "#073642",
            "brightBlue": "#839496",
            "brightCyan": "#93A1A1",
            "brightGreen": "#586E75",
            "brightPurple": "#6C71C4",
            "brightRed": "#CB4B16",
            "brightWhite": "#FDF6E3",
            "brightYellow": "#657B83",
            "cursorColor": "#002B36",
            "cyan": "#2AA198",
            "foreground": "#657B83",
            "green": "#859900",
            "name": "Solarized Light",
            "purple": "#D33682",
            "red": "#DC322F",
            "selectionBackground": "#FFFFFF",
            "white": "#EEE8D5",
            "yellow": "#B58900"
        },
        {
            "background": "#000000",
            "black": "#000000",
            "blue": "#3465A4",
            "brightBlack": "#555753",
            "brightBlue": "#729FCF",
            "brightCyan": "#34E2E2",
            "brightGreen": "#8AE234",
            "brightPurple": "#AD7FA8",
            "brightRed": "#EF2929",
            "brightWhite": "#EEEEEC",
            "brightYellow": "#FCE94F",
            "cursorColor": "#FFFFFF",
            "cyan": "#06989A",
            "foreground": "#D3D7CF",
            "green": "#4E9A06",
            "name": "Tango Dark",
            "purple": "#75507B",
            "red": "#CC0000",
            "selectionBackground": "#FFFFFF",
            "white": "#D3D7CF",
            "yellow": "#C4A000"
        },
        {
            "background": "#FFFFFF",
            "black": "#000000",
            "blue": "#3465A4",
            "brightBlack": "#555753",
            "brightBlue": "#729FCF",
            "brightCyan": "#34E2E2",
            "brightGreen": "#8AE234",
            "brightPurple": "#AD7FA8",
            "brightRed": "#EF2929",
            "brightWhite": "#EEEEEC",
            "brightYellow": "#FCE94F",
            "cursorColor": "#000000",
            "cyan": "#06989A",
            "foreground": "#555753",
            "green": "#4E9A06",
            "name": "Tango Light",
            "purple": "#75507B",
            "red": "#CC0000",
            "selectionBackground": "#FFFFFF",
            "white": "#D3D7CF",
            "yellow": "#C4A000"
        },
        {
            "background": "#300A24",
            "black": "#2E3436",
            "blue": "#3465A4",
            "brightBlack": "#555753",
            "brightBlue": "#729FCF",
            "brightCyan": "#34E2E2",
            "brightGreen": "#8AE234",
            "brightPurple": "#AD7FA8",
            "brightRed": "#EF2929",
            "brightWhite": "#EEEEEC",
            "brightYellow": "#FCE94F",
            "cursorColor": "#BBBBBB",
            "cyan": "#06989A",
            "foreground": "#EEEEEC",
            "green": "#4E9A06",
            "name": "Ubuntu Default",
            "purple": "#75507B",
            "red": "#CC0000",
            "selectionBackground": "#B5D5FF",
            "white": "#D3D7CF",
            "yellow": "#C4A000"
        },
        {
            "background": "#000000",
            "black": "#000000",
            "blue": "#000080",
            "brightBlack": "#808080",
            "brightBlue": "#0000FF",
            "brightCyan": "#00FFFF",
            "brightGreen": "#00FF00",
            "brightPurple": "#FF00FF",
            "brightRed": "#FF0000",
            "brightWhite": "#FFFFFF",
            "brightYellow": "#FFFF00",
            "cursorColor": "#FFFFFF",
            "cyan": "#008080",
            "foreground": "#CFCFCF",
            "green": "#008000",
            "name": "Vintage",
            "purple": "#800080",
            "red": "#800000",
            "selectionBackground": "#FFFFFF",
            "white": "#C0C0C0",
            "yellow": "#808000"
        }
    ],
    "startOnUserLogin": true,
    "theme": "dark",
    "trimBlockSelection": true
}
```

