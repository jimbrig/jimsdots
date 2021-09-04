# Chocolatey

Chocolatey is the best all-around, all-purpose package manager for Windows. It is build off PowerShell and NuGet and has a vast community full or resources and submitted packages for software installations.

## Notes

- Additional setup necessary for BoxStarter and Choco-Package-List-Backup. (*see [setup-choco-package-list-backup.ps1](./tools/setup-choco-package-list-backup.ps1)*)
- Automatic push-to-github is done using the [post-cplb-git-push.bat](./tools/post-cplb-git-push.bat) Batch File in *tools*.

## Directory Layout

### backup

This directory houses backup files provided from the `choco-package-list-backup` tool. In particular it contains the latest `packages.config` file, the `choco-package-list-backup.config` configuration used to generate it, and a gitignored `InstChoco.exe` executable.

### tools

These tools are located under `C:\tools\BCURRAN3`.

- choco-package-list-backup
- choco-cleaner

Additionally, I provide a custom batch file: `post-cplb-git-push.bat` to automatically push changes in the backups directory to Git/GitHub.

- custom `post-cplb-git-push.bat` batch file

### config

Chocolatey's core configuration file located at `C:ProgramData\chocolatey\config`. (XML Formatted `.config` file).

## Setup Scripts

Setup scripts are split into three parts:
- Installation
- Configuration
- Bootstrap

### Installation

The [install-choco.ps1](install-choco.ps1) script performs the following steps:

1. Ensures Admin Priveledges
2. Checks/Sets the PowerShell Execution Policy to *Unrestricted* (System and User Scope)
3. Creates the PowerShell `$PROFILE` if does not exist (allows chocolatey to incorporate its profile and tab-autocompletion on install)
4. Installs Chocolatey
5. Dot-Sources `$PROFILE`
6. Refreshes environment

```powershell
#Requires -RunAsAdministrator

# -------------------------------
# Chocolatey Installation Script
# -------------------------------

# Check Administrative Priveledges
$isadmin = (new-object System.Security.Principal.WindowsPrincipal([System.Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole("Administrators")
if (-not ($isadmin)) { throw "Must have Admininstrative Priveledges..." }

# Check/Set Execution Policy
$exepolicy = Get-ExecutionPolicy
if ($exepolicy -ne 'Unrestricted') {
  Write-Host "Setting Execution Policy to Unrestricted" -ForegroundColor Blue
  Set-ExecutionPolicy Unrestricted
  Set-ExecutionPolicy Unrestricted -scope CurrentUser
}

# Create $PROFILE if necessary before installing:
if (!(Test-Path -Path $PROFILE)) {
  Write-Host "Creating Powershell Profile" -ForegroundColor Blue
  New-Item -ItemType File -Path $PROFILE -Force
}

# Install
try { Get-Command -Name choco -ErrorAction Stop }
catch [System.Management.Automation.CommandNotFoundException] {
    Write-Host "Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force; 
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; 
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    . $PROFILE
    refreshenv
}

Write-Host "Finished Installing Chocolatey. Run Configuration script now." -ForegroundColor Green
```

### Configuration

The configuration script setups up various features, settings, and system properties to make chocolatey ready for use.

The [config-choco.ps1](config-choco.ps1) script performs the following steps:

1. Ensures Admin
2. Ensures Chocolatey is on System `%PATH%` (see helper function `Add-PathVariable`)
3. Enables Long-Path-Support on Windows through Registry Edit
4. Adds Microsoft Defender Exclusion for path: `$env:chocolateyinstall` (i.e. `C:\ProgramData\chocolatey`)
5. Configures Chocolatey Settings/Features:
   - enables `allowGlobalConfirmation`
   - sets `cacheLocation` to $env:TEMP
   - enables `logEnvironmentValues`
   - enables `virusCheck`
   - configures `virusScannerType` to `VirusTotal`
   - enables `useRememberedArgumentsForUpgrades`
   - enables `removePackageInformationOnUninstall`
6. Installs initial chocolatey tools:
   - Boxstarter
   - choco-cleaner
   - choco-package-list-backup
   - instchoco
   - chocolateygui
   - 7zip
7. Installs `git` to system with custom silent install parameters that add UNIX tools to PATH, add Git Bash Windows Terminal Profile, Configure AutoUpdate, etc. 
8. Dot-Sources `$PROFILE` and Refreshes environment

```powershell
#Requires -RunAsAdministrator

# -------------------------------
# Helper Functions
# -------------------------------
Function Add-PathVariable {
    param (
        [string]$addPath
    )
    if (Test-Path $addPath){
        $regexAddPath = [regex]::Escape($addPath)
        $arrPath = $env:Path -split ';' | Where-Object {$_ -notMatch "^$regexAddPath\\?"}
        $env:Path = ($arrPath + $addPath) -join ';'
    } else {
        Throw "'$addPath' is not a valid path."
    }
}

# --------------------------------
# Chocolatey Configuration Script
# --------------------------------

# Check Administrative Priveledges
$isadmin = (new-object System.Security.Principal.WindowsPrincipal([System.Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole("Administrators")
if (-not ($isadmin)) { throw "Must have Admininstrative Priveledges..." }

Write-Host "Configuring Chocolatey" -ForegroundColor Blue

# Enable Long Path Support:
Write-Host "Enabling Long Path Support through Registry..." -ForegroundColor Yellow
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name 'LongPathsEnabled' -Value 1

# Add to PATH:
Write-Host "Ensuring Chocolatey on System %PATH%..." -ForegroundColor Yellow
Add-PathVariable "$env:ALLUSERSPROFILE\chocolatey\bin"

# Add Defender Exclusion:
Write-Host "Adding Chocolatey to Defender Exclusion List..." -ForegroundColor Yellow
App-MpPreference -ExclusionPath $env:chocolateyinstall

# Configure Features and Settings:
Write-Host "Configuring Chocolatey's Settings and Features..." -ForegroundColor Yellow
choco feature enable -n allowGlobalConfirmation
choco config set cacheLocation $env:TEMP
choco feature enable -n logEnvironmentValues
choco feature enable -n virusCheck
choco config set virusScannerType VirusTotal
choco feature enable -n useRememberedArgumentsForUpgrades
choco feature enable -n removePackageInformationOnUninstall
Write-Host "Done. Current feature set is: " -ForegroundColor Green
choco feature list

# Initial Installations:
Write-Host "Installing chocolatey helpers.." -ForegroundColor Yellow
choco upgrade boxstarter choco-cleaner choco-package-list-backup instchoco chocolateygui 7zip -y
refreshenv

# Install Git w/ Custom Parameters
Write-Host "Installing Git with Custom Parameters..." -ForegroundColor Yellow
choco upgrade git.install --params "/GitAndUnixToolsOnPath /WindowsTerminal /NoShellIntegration /NoAutoCrlf" --install-arguments='/COMPONENTS="icons,assoc,assoc_sh,autoupdate,windowsterminal,scalar"'
refreshenv

# Finish:
refreshenv
. $profile
refreshenv
Write-Host "Finished Configuring Chocolatey." -ForegroundColor Green
```

### Bootstrap

The `bootstrap-choco.ps1` script re-installs all chocolatey packages for a system.

See [packages.config](backup/MSI/packages.config).

```powershell
$compinfo = Get-ComputerInfo
$compname = $compinfo.CsDNSHostName

if ($compname -eq "DESKTOP-MSI") { choco install -y "$HOME\.dotfiles\chocolatey\backup\MSI\packages.config" }
if ($compname -eq "DESKTOP-LENOVO") { choco install -y "$HOME\.dotfiles\chocolatey\backup\Lenovo\packages.config" }
```

### Custom Installs

*Note the following installations utilize custom parameters during install:*

#### Chocolatey

- Git: 
  - Git and UNIX Tools on %PATH%
  - No `autocrlf` configuration
  - Registry: File Extension Associations
  - No Shell Context Menu Entries
  - Auto-Update
  - New Features: 
    - *Window Terminal Profile/Integration* 
    - *Scalar*

- Python:
  - Append to %PATH%
  - Install for ALLUSERS (System) - should default to `C:\Python39` or `C:\Program Files\Python39`

- R:
  - Append to %PATH%

```powershell
# GIT.INSTALL
choco install -y git.install `
	--install-arguments='"/COMPONENTS=icons,assoc,assoc_sh,autoupdate,windowsterminal,scalar"' `
	--package-parameters='"/GitAndUnixToolsOnPath /WindowsTerminal /NoShellIntegration /NoAutoCrlf"'

# PYTHON3
choco install python3 --install-arguments="'/quiet InstallAllUsers=1 PrependPath=1'"

# R
choco install R.Project --params "'/AddToPath'"
```





