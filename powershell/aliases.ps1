# my custom aliases
Set-Alias -Name ver -Value Get-MrPSVersion
Set-Alias -Name propath -Value Get-ProPath
Set-Alias -Name pro -Value openprofile
Set-Alias -Name proex -Value profilefolder
Set-Alias -Name aliases -Value listaliases
Set-Alias -Name lsalias -Value listaliases
Set-Alias -Name rvan -Value rvanilla
Set-Alias -Name rstudio -Value launchrstudio
Set-Alias -Name gstatus -Value gitstatus
Set-Alias -Name cpkgs -Value chocopkgs
Set-Alias -Name cclean -Value chococlean
Set-Alias -Name cup -Value chocoupgrade
Set-Alias -Name cbackup -Value backupchoco
Set-Alias -Name cs -Value csearch
Set-Alias -Name clone -Value ghclone
Set-Alias -Name pipup -Value pipupgradeall
Set-Alias -Name sysclean -Value cleanup
Set-Alias -Name wifitest -Value speed-test
Set-Alias -Name refresh -Value refreshenv
Set-Alias -Name touch -Value newfile
Set-Alias -Name rproj -Value openrproj
Set-Alias -Name sysupdate -Value System-Update
Set-Alias -Name checkdisk -Value Check-Disk
Set-Alias -Name mkd -Value CreateAndSet-Directory
Set-Alias -Name diskusage -Value Get-DiskUsage
Set-Alias -Name emptytrash -Value Empty-RecycleBin
Set-Alias -Name cleandisks -Value Clean-Disks
Set-Alias -Name reload -Value Reload-Powershell
Set-Alias -Name mute -Value Set-SoundMute
Set-Alias -Name unmute -Value Set-SoundUnmute
Set-Alias -Name update -Value System-Update
Set-Alias -Name o -Value open
Set-Alias -Name rad -Value Open-Radian


if (Get-Command R.exe -ErrorAction SilentlyContinue | Test-Path) {
  Remove-Item Alias:r -ErrorAction SilentlyContinue
  ${function:r} = { R.exe @args }
}

### DEPRECATED ###

# Set-Alias -Name ver -Value Get-MrPSVersion
# Set-Alias -Name propath -Value Get-ProPath
# Set-Alias -Name pro -Value openprofile
# Set-Alias -Name proex -Value profilefolder
# Set-Alias -Name aliases -Value listaliases
# Set-Alias -Name lsalias -Value listaliases
# Set-Alias -Name rvan -Value rvanilla
# Set-Alias -Name rstudio -Value launchrstudio
# Set-Alias -Name gstatus -Value gitstatus
# Set-Alias -Name cpkgs -Value chocopkgs
# Set-Alias -Name cclean -Value chococlean
# Set-Alias -Name cup -Value chocoupgrade
# Set-Alias -Name cbackup -Value backupchoco
# Set-Alias -Name cs -Value csearch
# Set-Alias -Name clone -Value ghclone
# Set-Alias -Name pipup -Value pipupgradeall
# Set-Alias -Name sysclean -Value cleanup
# Set-Alias -Name wifitest -Value speed-test
# Set-Alias -Name refresh -Value refreshenv

# # Missing Bash aliases
# Set-Alias time Measure-Command

# # Correct PowerShell Aliases if tools are available (aliases win if set)

# # WGet: Use `wget.exe` if available
# if (Get-Command wget.exe -ErrorAction SilentlyContinue | Test-Path) {
#   rm alias:wget -ErrorAction SilentlyContinue
# }

# # Directory Listing: Use `ls.exe` if available
# if (Get-Command ls.exe -ErrorAction SilentlyContinue | Test-Path) {
#   rm alias:ls -ErrorAction SilentlyContinue
#   # Set `ls` to call `ls.exe` and always use --color
#   ${function:ls} = { ls.exe --color @args }
#   # List all files in long format
#   ${function:l} = { ls -lF @args }
#   # List all files in long format, including hidden files
#   ${function:la} = { ls -laF @args }
#   # List only directories
#   ${function:lsd} = { Get-ChildItem -Directory -Force @args }
# }
# else {
#   # List all files, including hidden files
#   ${function:la} = { ls -Force @args }
#   # List only directories
#   ${function:lsd} = { Get-ChildItem -Directory -Force @args }
# }

# # curl: Use `curl.exe` if available
# if (Get-Command curl.exe -ErrorAction SilentlyContinue | Test-Path) {
#   rm alias:curl -ErrorAction SilentlyContinue
#   # Set `curl` to call `curl.exe`
#   ${function:curl} = { curl.exe @args }
#   # Gzip-enabled `curl`
#   ${function:gurl} = { curl --compressed @args }
# }
# else {
#   # Gzip-enabled `curl`
#   ${function:gurl} = { curl -TransferEncoding GZip }
# }

# # remove R alias to enable R.exe from PATH
# # 'R' taken by PS Invoke-History
# if (Get-Command R.exe -ErrorAction SilentlyContinue | Test-Path) {
#   Remove-Item Alias:r -ErrorAction SilentlyContinue
#   ${function:r} = { R.exe @args }
# }

# # Create a new directory and enter it
# Set-Alias mkd CreateAndSet-Directory
# # Determine size of a file or total size of a directory
# Set-Alias fs Get-DiskUsage
# # Empty the Recycle Bin on all drives
# Set-Alias emptytrash Empty-RecycleBin
# # Cleanup old files all drives
# Set-Alias cleandisks Clean-Disks
# # Reload the shell
# Set-Alias reload Reload-Powershell
# # http://xkcd.com/530/
# Set-Alias mute Set-SoundMute
# Set-Alias unmute Set-SoundUnmute
# # Update installed Ruby Gems, NPM, and their installed packages.
# Set-Alias update System-Update
