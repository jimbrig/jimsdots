# Specify some variables:
$wingetsettingsdir = "$env:LOCALAPPDATA\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState"
$wingetsettingspath = "$wingetsettingsdir\settings.json"
$backuppath = "$wingetsettingsdir\settings.json.bak"
$dotfilespath = "~/.dotfiles/winget/settings.json"

# Rename current settings as a backup (if they exist):
if (Test-Path $wingetsettingspath) { Rename-Item $wingetsettingspath $backuppath }

# Copy settings.json to winget settings directory:
Copy-Item $dotfilespath $wingetsettingsdir

# Refresh and test
refreshenv

# should see new experimental msstore and newstore here:
winget source list
