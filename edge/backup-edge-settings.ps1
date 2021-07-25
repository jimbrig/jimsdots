$dotdir = "$env:USERPROFILE\Dev\Github\jimsdots"
$edge_backup_dir = "$dotdir\edge\backups\edge"
$edge_dev_backup_dir = "$dotdir\edge\backups\edge_dev"

$edge_appdata_dir = "$env:LocalAppData\Microsoft\Edge"
$edge_dev_appdata_dir = "$env:LocalAppData\Microsoft\Edge Dev"

Copy-Item $edge_appdata_dir -Destination $env:TEMP\edge -Force -Recurse
Copy-Item $edge_dev_appdata_dir -Destination $env:TEMP\edge_dev -Force -Recurse

Compress-Archive -Path "$env:TEMP\edge\User Data" -DestinationPath "$edge_backup_dir\UserData.zip" -Update
Compress-Archive -Path "$env:TEMP\edge_dev\User Data" -DestinationPath "$edge_dev_backup_dir\UserData.zip" -Update

Invoke-Command { reg export 'HKCU\Software\Microsoft\Edge\PreferenceMACs' $dotdir\edge\backups\edge\edge_registry_settings.reg }
Invoke-Command { reg export 'HKCU\Software\Microsoft\Edge Dev\PreferenceMACs' $dotdir\edge\backups\edge_dev\edge_dev_registry_settings.reg }
