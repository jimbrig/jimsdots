# Powershell



## Installation

See [Microsoft's Docs on Installing PowerShell on Windows](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7.1) for detailed information.

Install [PowerShell Core v7](https://github.com/PowerShell/PowerShell) via downloaded installer, `WindowsPowerShell` as Admin, or your preferred package manager.

### Download the installer package

To install PowerShell on Windows, download the [latest](https://aka.ms/powershell-release?tag=stable) install package from GitHub. You can also find the latest [preview](https://aka.ms/powershell-release?tag=preview) version. Scroll down to the **Assets** section of the Release page. The **Assets** section may be collapsed, so you may need to click to expand it.

The MSI file looks like `PowerShell-<version>-win-<os-arch>.msi`. For example:

- `PowerShell-7.1.3-win-x64.msi`
- `PowerShell-7.1.3-win-x86.msi`

Once downloaded, double-click the installer and follow the prompts.

The installer creates a shortcut in the Windows Start Menu.

- By default the package is installed to `$env:ProgramFiles\PowerShell\<version>`
- You can launch PowerShell via the Start Menu or `$env:ProgramFiles\PowerShell\<version>\pwsh.exe`

### Administrative install from the command line

MSI packages can be installed from the command line allowing administrators to deploy packages without user interaction. The MSI package includes the following properties to control the installation options:

- **ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL** - This property controls the option for adding the **Open PowerShell** item to the context menu in Windows Explorer.
- **ADD_FILE_CONTEXT_MENU_RUNPOWERSHELL** - This property controls the option for adding the **Run with PowerShell** item to the context menu in Windows Explorer.
- **ENABLE_PSREMOTING** - This property controls the option for enabling PowerShell remoting during installation.
- **REGISTER_MANIFEST** - This property controls the option for registering the Windows Event Logging manifest.

The following example shows how to silently install PowerShell with all the install options enabled.

PowerShell

```powershell
msiexec.exe /package PowerShell-7.1.3-win-x64.msi /quiet ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL=1 ENABLE_PSREMOTING=1 REGISTER_MANIFEST=1
```

For a full list of command-line options for `Msiexec.exe`, see [Command line options](https://docs.microsoft.com/en-us/windows/desktop/Msi/command-line-options).

### Install via Package Manger

- winget
- chocolatey
- scoop

```powershell
# winget
winget install --name PowerShell --exact
winget install --name PowerShell-Preview --exact

# chocolatey
choco install powershell

# scoop
scoop install powershell
```

### Install from Microsoft Store

PowerShell 7.1 has been published to the Microsoft Store. You can find the PowerShell release on the [Microsoft Store](https://www.microsoft.com/store/apps/9MZ1SNWT0N5D) website or in the Store application in Windows.

Benefits of the Microsoft Store package:

- Automatic updates built right into Windows 10
- Integrates with other software distribution mechanisms like Intune and SCCM

Limitations:

MSIX packages run in an application sandbox that virtualizes access to some filesystem and registry locations.

- All registry changes under HKEY_CURRENT_USER are copied on write to a private, per-user, per-app location. Therefore, those values are not available to other applications.
- Any system-level configuration settings stored in `$PSHOME` cannot be modified. This includes the WSMAN configuration. This prevents remote sessions from connecting to Store-based installs of PowerShell. User-level configurations and SSH remoting are supported.

For more information, see [Understanding how packaged desktop apps run on Windows](https://docs.microsoft.com/en-us/windows/msix/desktop/desktop-to-uwp-behind-the-scenes).

## Setup and Configuration

I setup my own personal [functions](./functions.ps1), [aliases](./aliases.ps1), and scripts for Powershell:

### Functions

- `functions.ps1`:

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

# Start Docker:
${function:startdocker} = { start "C:\Program Files\Docker\Docker\Docker Desktop.exe" }

# R
${function:search_gh} = { Rscript -e "search_gh('$args')" }
${function:search_ghr} = { Rscript -e "search_ghr('$args')" }

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

# store and appx packages
${function:saveappxpkgs} = { & powerhshell Get-AppXPackage | Out-File -FilePath appx-package-list.txt }
${function:resetstore} = { & wsreset.exe }
${function:resetstorepkgs} = {
  & powershell Get-AppXPackage | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
}

# Cleanup System
${function:cleanup} = {
  Remove-Item c:\Windows\Temp\* -Recurse -Force -ErrorAction SilentlyContinue
  Remove-Item "C:\Users\*\Appdata\Local\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
  cleanmgr /sagerun:1 | out-Null
}

# Powershell Utilities
${function:updatepowerhell} = { iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI" }
${function:psversion} = { $PSVersionTable }
${function:propath} = { Get-Variable $PROFILE }
${function:prodir} = { Split-Path -Path $PROFILE -Parent }
${function:listaliases} = { Get-Alias }
${function:getpublicip} = {
  $ip = Invoke-RestMethod -Uri 'https://api.ipify.org?format=json'
  "My public IP address is: $($ip.ip)"
} #getpublicip

# Chocolatey
${function:chocopkgs} = { & choco list --local-only }
${function:chococlean} = { & choco-cleaner }
${function:chocoupgrade} = { & choco upgrade all -y }
${function:backupchoco} = { & choco-package-list-backup }
${function:chocosearch} = { & choco search $args }

# Git and Github
${function:gitstatus} = { & git status $args }
${function:ghclone} = { & gh repo clone $args }
${function:ghcloneandopenr} = { & gh repo clone $args }
${function:ghissues} = { & gh issue list -R $PWD }

# Python and PIP
${function:pipupgradeall} = { { & pip freeze | ForEach-Object { $_.split('==')[0] } | ForEach-Object { pip install --upgrade $_ } } }
${function:upgradepip} = { & pip install --upgrade pip }
${function:upgradepip3} = { & pip3 install --upgrade pip3 }

# R Utilities
${function:rvanilla} = { R.exe --vanilla }
${function:openradian} = { & "C:\Users\Admin\AppData\Local\Programs\Python\Python39\Scripts\radian.exe" }
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

### Aliases

- `aliases.ps1`

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
Set-Alias -Name csearch -Value chocosearch
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
Set-Alias -Name check -Value checkdisk
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
Set-Alias -Name codee -Value code-insiders
Set-Alias -Name rundocker -Value startdocker

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
```

### Autocompletion Scripts

- github-cli
- winget
- scoop

### Profile

- `Microsoft.PowerShell_profile.ps1`:

```powershell
# Current User, All Hosts Powershell 7 Profile

# trust PSGallery
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# import modules
# Shouldn't need to import if already located in $Env:PSModulePath 
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

```

## Modules

![image-20210429130236848](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20210429130236848.png)

#### Paths

