# specify paths to copy to
$wtpreviewpath = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe\LocalState"
$wtpath = "$env:LOCALAPPDATA\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState"

# current path
$curdir = $PSScriptRoot

# copy to appdata directories

if (Test-Path "$wtpreviewpath\settings.json") {
  Write-Host "'settings.json' already detected in windows-terminal-preview's local appdata path. Backing up and copying new file..." -ForegroundColor Magenta
  # create backup of existing file
  Copy-Item "$wtpreviewpath\settings.json" -Destination "$wtpreviewpath\settings.json.bak"
  Write-Host "Previous 'settings.json' backed up at path: $wtpreviewpath\settings.json.bak" -ForegroundColor Green
}

if (Test-Path "$wtpath\settings.json") {
  Write-Host "'settings.json' already detected in windows-terminal's local appdata path. Backing up and copying new file..." -ForegroundColor Magenta
  # create backup of existing file
  Copy-Item "$wtpath\settings.json" -Destination "$wtpath\settings.json.bak"
  Write-Host "Previous 'settings.json' backed up at path: '$wtpath\settings.json.bak'" -ForegroundColor Green
}

# copy in new settings from this repo - preview
Copy-Item $curdir\settings.json -Destination "$wtpreviewpath\settings.json"
Write-Host "Successfully copied 'settings.json' to path '$wtpreviewpath\settings.json'" -ForegroundColor Green

# copy in new settings from this repo - stable
Copy-Item $curdir\settings.json -Destination "$wtpath\settings.json"
Write-Host "Successfully copied 'settings.json' to path '$wtpath\settings.json'" -ForegroundColor Green

Write-Host "Restart Terminal to allow settings to take effect." -ForegroundColor Magenta
