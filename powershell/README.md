# Powershell Dotfiles

This directory holds my personalized Powershell profile, aliases, functions, modules, and scripts I use on a day-to-day basis on Windows 10.

## Profile

File: `Microsoft_PowerShell_profile.ps1` (can also just be `profile.ps1`): 

- Set trust for *PSRepository* for getting and installing PS modules
- Import-Modules (can usually be commented out)
- Load functions, aliases, and autocompletion files:
  - functions.ps1
  - aliases.ps1
  - winget_autocompletion.ps1
  - github_autocompletion (done inline - full output in the file)
- Edit prompt to display Z-Location number and customer environment loaded with time elapsed. 

```powerhshell
# Current User, All Hosts Powershell 7 Profile

# trust PSGallery
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# import modules
Import-Module posh-git
Import-Module oh-my-posh
Import-Module Microsoft.PowerShell.Utility
Import-Module PSWindowsUpdate
Import-Module ZLocation
Import-Module Boxstarter.WinConfig

# load functions then aliases
$psdir = (Split-Path -parent $profile)
Get-ChildItem "${psdir}\functions.ps1" | ForEach-Object { .$_ }
Get-ChildItem "${psdir}\aliases.ps1" | ForEach-Object { .$_ }
Get-ChildItem "${psdir}\winget_autocompletion.ps1" | ForEach-Object { .$_ }

# Github CLI autocompletion
# see issue for reference: https://github.com/cli/cli/issues/695#issuecomment-619247050
Invoke-Expression -Command $(gh completion -s powershell | Out-String)

# edit prompt
Write-Host “Custom PowerShell Environment Loaded”
Write-Host -Foreground Green "`n[ZLocation] knows about $((Get-ZLocation).Keys.Count) locations.`n"

### Deprecated ###
# Import-Module PSDirTag
```

## Custom Defined Fuctions - `functions.ps1`

- Navigational
- System Directories
- Extra Directories
- Custom Profile Directories
- Open Functions
- System Utilities and Maintanence
- Powershell Utilities
- Chocolatey Utilities
- R Utilities
- Git and Github Utilities
- Python/PIP Utilities
- Gitkraken open repo
- Other Customizations

```powershell
### Custom Functions ###

# Navigational Functions
${function:~} = { Set-Location ~ }
${function:Set-ParentLocation} = { Set-Location .. }; Set-Alias ".." Set-ParentLocation
${function:...} = { Set-Location ..\.. }
${function:....} = { Set-Location ..\..\.. }
${function:.....} = { Set-Location ..\..\..\.. }
${function:......} = { Set-Location ..\..\..\..\.. }

# System Directories
${function:programfiles} = { Set-Location 'C:\Program Files' }
${function:programfiles86} = { Set-Location 'C:\Program Files (x86)' }
${function:programdata} = { Set-Location C:\ProgramData }
${function:windows} = { Set-Location C:\Windows }

# Custom C: Directories
${function:tools} = { Set-Location C:\tools }
${function:env} = { Set-Location C:\env }
${function:setup} = { Set-Location C:\Setup }

# Specific to My User Profile Directories
${function:onedrive} = { Set-Location ~\OneDrive }
${function:desktop} = { Set-Location ~\Desktop }
${function:documents} = { Set-Location ~\Documents }
${function:downloads} = { Set-Location ~\Downloads }

# Important DotFiles and AppData Directories
${function:dotfiles} = { Set-Location ~\.dotfiles }
${function:rdotfiles} = { Set-Location ~\.R }
${function:config} = { Set-Location ~\config }
${function:appdata} = { Set-Location ~\AppData }
${function:localappdata} = { Set-Location ~\Appdata\Local }
${function:appdata} = { Set-Location ~\AppData\Roaming }

# Dev Directory
${function:dev} = { Set-Location ~\Dev }
${function:jimbrig} = { Set-Location ~\Dev\jimbrig }
${function:tychobra} = { Set-Location ~\Dev\tychobra }
${function:powwater} = { Set-Location ~\Dev\powwater }
${function:docs} = { Set-Location ~\Dev\docs }
${function:sandbox} = { Set-Location ~\Dev\sandbox }
${function:mycode} = { Set-Location ~\Dev\code } # do not use code here due to `vscode`

# "Open" Functions
${function:openprofile} = { code-insiders $PROFILE }
${function:openprofilefolder} = { & $path = Get-ProDir && Set-Location $path && explorer.exe . }
${function:openaliases} = { & $path = Get-ProDir && Set-Location $path && code-insiders aliases.ps1 }
${function:openfunctions} = { & $path = Get-ProDir && Set-Location $path && code-insiders functions.ps1 }
${function:opendev} = { Set-Location ~\Dev && explorer.exe . }
${function:openpow} = { Set-Location ~\Dev\powwater && explorer.exe . }

# Online Openers
${function:opengh} = { open https://github.com }
${function:openghjim} = { open https://github.com/jimbrig }
${function:openghtych} = { open https://github.com/tychobra }
${function:openghpow} = { open https://github.com/powwater }

# System Utilities and Maintanence
${function:checkdisk} = { & chkdsk C: /f /r /x }
${function:newfile} = { New-Item -Path @args }
${function:System-Update} = { & "C:\env\bin\topgrade.exe" } # NOTE must have topgrade installed and in %PATH%
${function:speedtest} = { & speed-test } # NOTE: must have speedtest installed

# Cleanup System
${function:cleanup} = {
  Remove-Item c:\Windows\Temp\* -Recurse -Force -ErrorAction SilentlyContinue
  Remove-Item "C:\Users\*\Appdata\Local\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
  cleanmgr /sagerun:1 | out-Null
}

# Powershell Utilities
${function:psversion} = { $PSVersionTable }
${function:propath} = { Get-Variable $PROFILE }
${function:prodir} = { Split-Path -Path $PROFILE -Parent }
${function:listaliases} = { Get-Alias }

# Chocolatey
${function:chocopkgs} = { & choco list --local-only }
${function:chococlean} = { & choco-cleaner }
${function:chocoupgrade} = { & choco upgrade all -y }
${function:backupchoco} = { & choco-package-list-backup }
${function:chocosearch} = { & choco search $args }

# Git and Github
${function:gitstatus} = { & git status $args }
${function:ghclone} = { & gh repo clone $args }
${function:ghissues} = { & gh issue list -R $PWD }

# Python and PIP
${function:pipupgradeall} = { { & pip freeze | ForEach-Object { $_.split('==')[0] } | ForEach-Object { pip install --upgrade $_ } } }

# R Utilities
${function:rvanilla} = { R.exe --vanilla }
${function:openradian} = { & "C:\Users\Jimmy Briggs\AppData\Local\Programs\Python\Python39\Scripts\radian.exe" }
${function:openrproj} = { & C:\env\bat\openrproject.bat }
${function:launchrstudio} = { & "C:\Program Files\RStudio\bin\Rstudio.exe" }

# Open GitKraken in Current Repo
${function:krak} = {
  $curpath = (get-location).ProviderPath
  $lapd = $env:localappdata
  $logf = "$env:temp\krakstart.log"
  $newestExe = Get-Item "$lapd\gitkraken\app-*\gitkraken.exe"
  Select-Object -Last 1
  start-process -filepath $newestExe -ArgumentList "--path $curpath" -redirectstandardoutput $logf
}

### DEPRECATED ###
# ${function:projects} = { Set-Location ~\Projects }
# function bukuu { & buku --suggest }
```

## Aliases - `aliases.ps1`

```powershell
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

# Deprecated aliases #
```
