# Current User, All Hosts Powershell 7 Profile

# trust PSGallery
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# import modules
# Import-Module posh-git
# Import-Module oh-my-posh
# Import-Module Terminal-Icons
# Import-Module DockerCompletion
# Import-Module Microsoft.PowerShell.Utility
# Import-Module PSWindowsUpdate
# Import-Module ZLocation

try { $null = gcm pshazz -ea stop; pshazz init 'default' } catch { }

# load functions then aliases
$psdir = (Split-Path -parent $profile)
Get-ChildItem "${psdir}\functions.ps1" | ForEach-Object { .$_ }
Get-ChildItem "${psdir}\aliases.ps1" | ForEach-Object { .$_ }

# winget auto-completion
# Get-ChildItem "${psdir}\winget_autocompletion.ps1" | ForEach-Object { .$_ }

# Github CLI autocompletion
# see issue for reference: https://github.com/cli/cli/issues/695#issuecomment-619247050
# Invoke-Expression -Command $(gh completion -s powershell | Out-String)

# Scoop autocompletion
# Import-Module "$($(Get-Item $(Get-Command scoop).Path).Directory.Parent.FullName)\modules\scoop-completion"

# Chocolatey Completion
# $ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
# if (Test-Path($ChocolateyProfile)) {
	# Import-Module "$ChocolateyProfile"
# }

# Keep Completion -- UPDATE: BASH and ZSH ONLY :<
# Invoke-Expression -Command $(keep completion | Out-String)

# edit prompt
Write-Host “Custom PowerShell Environment Loaded”
Write-Host -Foreground Green "`n[ZLocation] knows about $((Get-ZLocation).Keys.Count) locations.`n"

### Deprecated ###
# Import-Module PSDirTag
# Import-Module Boxstarter.WinConfig
