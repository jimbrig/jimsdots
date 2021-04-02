# Current User, All Hosts Powershell 7 Profile

# trust PSGallery
# Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# import modules
# Import-Module posh-git
# Import-Module oh-my-posh
# Import-Module Microsoft.PowerShell.Utility
# Import-Module PSWindowsUpdate
# Import-Module ZLocation
# Import-Module Boxstarter.WinConfig

# load functions then aliases
$psdir = (Split-Path -parent $profile)
Get-ChildItem "${psdir}\functions.ps1" | ForEach-Object { .$_ }
Get-ChildItem "${psdir}\aliases.ps1" | ForEach-Object { .$_ }

# winget auto-completion
Get-ChildItem "${psdir}\winget_autocompletion.ps1" | ForEach-Object { .$_ }

# Github CLI autocompletion
# see issue for reference: https://github.com/cli/cli/issues/695#issuecomment-619247050
# Invoke-Expression -Command $(gh completion -s powershell | Out-String)

# edit prompt
Write-Host “Custom PowerShell Environment Loaded”
Write-Host -Foreground Green "`n[ZLocation] knows about $((Get-ZLocation).Keys.Count) locations.`n"

### Deprecated ###
# Import-Module PSDirTag
