$settingspath = "$env:LOCALAPPDATA\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\settings.json"
$settingsprops = Get-ChildItem $settingspath | Sort {$_.LastWriteTime} | select -last 1
$settingslastmodified = [DateTime]$settingsprops.LastWriteTime

If (-not (Test-Path "last-synced")) { 
	New-Item -ItemType File "last-synced" 
	$settingslastmodified >> last-synced
} 

$lastsyncedtext = cat last-synced | Out-String
$lastsynced = [DateTime]$lastsyncedtext

if ($settingslastmodified -gt $lastsynced) { 
	Write-Host "Detected changes to winget settings.json. Copying to dotfiles and pushing to github repo..." -ForegroundColor Red
	Remove-Item "settings.json.bak"
	Rename-Item "settings.json" "settings.json.bak" -Force
	Copy-Item $settingspath "settings.json"
	Remove-Item last-synced
	Get-Date >> last-synced
	git add ../winget/*
	git commit -m "Updated winget settings"
	git push
}

# Copy-Item "settings.json" "$env:LOCALAPPDATA\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState"
# Write-Host "✔️ Successfully copied file settings.json to local app data folder." -ForegroundColor Green