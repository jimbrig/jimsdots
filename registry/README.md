# Windows Registry

> This directory houses various customized registration `.reg` files to manipulate the Windows Registry.

## Contents

- [Custom Explorer Options](#custom-explorer-options)
- [Custom Context Menu](#custom-context-menu)
- [Default Extension Associations](#default-extension-associations)
- [Power Options](#power-options)
- [Remove Shortcut Arrows](#remove-shortcut-arrows)
- [Backup Registry](#backup-registry)
- [Restore Registry](#restore-registry)

## Custom Explorer Options

- Disable or Enable the following Folders:

  - 3D Objects
  - Desktop
  - Documents
  - Downloads
  - Pictures
  - Videos
  - Music

- Disable/Enable the following Navigation Panel Folders:

  - Libraries
  - Network
  - OneDrive
  - Quick Access
  - Removable Drives

## Custom Context Menu

- Add/Remove *Copy Path*
- Add/Remove a customized *Tools* and *System Tools* expandable list
- Add/Remove *Edit with Notepad*
- Add/Remove a *Hide Selected* option
- Add/Remove a *Toggle Hidden Files and Folders* Option
- Add/Remove PowerShell 7 Context Menu Options
- Add/Remove Windows Terminal Context Menu Options
- Add/Remove Shutdown to Desktop Context Menu
- Shell News:
  - Remove Defaults:
    - `.accdb` - Microsoft Access
    - `.pub` - Microsoft Publisher
    - `.mdb`
    - `.bmp`
    - `.rtf` - Rich Text Format
    - `.zip` - Zip Archive
  - Add Custom:
    - `.bat` - Batch File/Script
    - `.cmd` - Command Line File/Script
    - `.ps1` - PowerShell Script
    - `.reg` - Registration Entry
    - `.txt` - Text File
    - `.vbs` - Visual Basic Script
    - `.ahk` - AutoHotKey Script
    - `.css` - CSS Style Sheet
    - `.html` - HTML File
    - `.csv` - Comma Separated Values Spread Sheet
    - `.json` - JSON File
    - `.yaml` - YAML File
    - `.R` - R script
    - `.md` - Markdown Document

- Script to Remove Unnecessary Default Shell New Items and Add Customized Ones:

```powershell
Windows Registry Editor Version 5.00

;-----------------------------------
; REMOVE DEFAULT NEW CONTEXT MENU ITEMS
;-----------------------------------

[-HKEY_CLASSES_ROOT\.accdb\Access.Application.16\ShellNew]
[-HKEY_CLASSES_ROOT\.mdb\ShellNew]
[-HKEY_CLASSES_ROOT\.bmp\ShellNew]
[-HKEY_CLASSES_ROOT\.rtf\ShellNew]
[-HKEY_CLASSES_ROOT\.zip\CompressedFolder\ShellNew]
[-HKEY_CLASSES_ROOT\.pub\Publisher.Document.16\ShellNew]

; ---------------------------------------
; ADD CUSTOM SHELL NEW FILES BY EXTENSION
; ---------------------------------------

; BAT

[HKEY_CLASSES_ROOT\.bat]
@="bat"

[HKEY_CLASSES_ROOT\.bat\ShellNew]
"FileName"="Template.bat"

[HKEY_CLASSES_ROOT\bat]
@="Batch Script"

; CMD

[HKEY_CLASSES_ROOT\.cmd]
@="cmd"

[HKEY_CLASSES_ROOT\.cmd\ShellNew]
"FileName"="Template.cmd"

[HKEY_CLASSES_ROOT\cmd]
@="Command Line Executable"

; CSS

[HKEY_CLASSES_ROOT\.css]
@="css"

[HKEY_CLASSES_ROOT\.css\ShellNew]
"NullFile"=""

[HKEY_CLASSES_ROOT\css]
@="CSS Stylesheet"


; CSV

[HKEY_CLASSES_ROOT\.csv]
@="csv"

[HKEY_CLASSES_ROOT\.csv\ShellNew]
"NullFile"=""

[HKEY_CLASSES_ROOT\csv]
@="Comma Separated CSV File"


; JSON

[HKEY_CLASSES_ROOT\.json]
@="json"

[HKEY_CLASSES_ROOT\.json\ShellNew]
"NullFile"=""

[HKEY_CLASSES_ROOT\json]
@="JSON File"

; MARKDOWN

[HKEY_CLASSES_ROOT\.md]
@="markdown"

[HKEY_CLASSES_ROOT\.md\ShellNew]
"NullFile"=""

[HKEY_CLASSES_ROOT\markdown]
@="Markdown Document"

; PS1

[HKEY_CLASSES_ROOT\.ps1]
@="ps1"

[HKEY_CLASSES_ROOT\.ps1\ShellNew]
"FileName"="Script.ps1"

[HKEY_CLASSES_ROOT\ps1]
@="PowerShell Script"

; REG

[HKEY_CLASSES_ROOT\.reg]
@="reg"

[HKEY_CLASSES_ROOT\.reg\ShellNew]
"FileName"="RegEdit.reg"

[HKEY_CLASSES_ROOT\reg]
@="Registration Entry"

; R

[HKEY_CLASSES_ROOT\.r]
@="r"

[HKEY_CLASSES_ROOT\.r\ShellNew]
"FileName"="Template.R"

[HKEY_CLASSES_ROOT\r]
@="R Script"

; TXT

[HKEY_CLASSES_ROOT\.txt]
@="txt"

[HKEY_CLASSES_ROOT\.txt\ShellNew]
"FileName"="Template.txt"

[HKEY_CLASSES_ROOT\txt]
@="Text Document"

; VBS

[HKEY_CLASSES_ROOT\.vbs]
@="vbs"

[HKEY_CLASSES_ROOT\.vbs\ShellNew]
"FileName"="Template.vbs"

[HKEY_CLASSES_ROOT\vbs]
@="Visual Basic Script"

; YML

[HKEY_CLASSES_ROOT\.yml]
@="yml"

[HKEY_CLASSES_ROOT\.yml\ShellNew]
"FileName"="comfig.yml"

[HKEY_CLASSES_ROOT\yml]
@="YAML Config"

```

## Default Extension Associations

Utilize these registry edits to restore default file extension associations.

## Power Options

- Add Console Lock Display Timeout to Power Options
- Clean Pagefile on Shutdown

## Remove Shortcut Arrows

- Removes the arrow on icons for links/shortcuts

## Backup Registry

*Before running any registry hacks, be sure to backup the registry first!*

```powershell
# backup registry
mkdir C:\RegBack
reg export HKCR C:\RegBack\HKCR.Reg /y
reg export HKCU C:\RegBack\HKCU.Reg /y
reg export HKLM C:\RegBack\HKLM.Reg /y
reg export HKU C:\RegBack\HKU.Reg /y
reg export HKCC C:\RegBack\HKCC.Reg /y
```

Note: The Registry Hives are backed up to `C:\RegBack` in the example above.

## Restore Registry

*Note these commands should be run from the Advanced Startup > Command Prompt option before the OS is booted and loaded into!*

```powershell
# restore registry
cd /d C:\windows\System32\config
xcopy *.* C:\RegBack\
cd RegBack
dir

copy /y software ..
copy /y system ..
copy /y sam ..

```

*Note: Generally the OS is installed on `C:\`, but the system drive letter may change to `D:\` in most cases when you boot your computer into recovery mode. To verify the system drive letter, you can type `dir` command after you type the drive letter like `D:\`, and hit Enter to list all files, folders and directories in this drive. You can check if there is a Windows folder in the list, if so, then it’s the system drive.*

