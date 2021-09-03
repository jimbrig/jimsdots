# Chocolatey

Chocolatey is the best all-around, all-purpose package manager for Windows. It is build off PowerShell and NuGet and has a vast community full or resources and submitted packages for software installations.

## Notes

- Additional setup necessary for BoxStarter and Choco-Package-List-Backup. (*see [setup-choco-package-list-backup.ps1](./tools/setup-choco-package-list-backup.ps1)*)

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

### Installation

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
        $arrPath = $env:Path -split ';' | Where-Object {$_ -notMatch 
"^$regexAddPath\\?"}
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

# Initial Installations:
Write-Host "Installing chocolatey helpers.." -ForegroundColor Yellow
choco upgrade boxstarter choco-cleaner choco-package-list-backup instchoco chocolateygui 7zip -y
refreshenv

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

# Add Defender Exclusion:
Write-Host "Adding Chocolatey to Defender Exclusion List..." -ForegroundColor Yellow
App-MpPreference -ExclusionPath $env:chocolateyinstall

# Finish:
refreshenv
. $profile
refreshenv
Write-Host "Finished Configuring Chocolatey." -ForegroundColor Green

### DEPRECATED: ###

# choco feature enable -n allowEmptyChecksums

# if (!(Test-Path -Path $PROFILE)) {
#   Write-Host "Creating Powershell Profile" -ForegroundColor Green
#   New-Item -ItemType File -Path $PROFILE -Force
#
#   Add-Content -Path $profile -Value '# chocolatey profile
#   $ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
#   if (Test-Path($ChocolateyProfile)) {
#     Import-Module "$ChocolateyProfile"
#   }'
#   Write-Host "Added Chocolatey to PowerShell Profile" -ForegroundColor Green
#}
```

### Bootstrap

The `bootstrap-choco.ps1` script re-installs all chocolatey packages for a system.

```powershell
$compinfo = Get-ComputerInfo
$compname = $compinfo.CsDNSHostName

if ($compname -eq "DESKTOP-MSI") { choco install -y "$HOME\.dotfiles\chocolatey\backup\MSI\packages.config" }
if ($compname -eq "DESKTOP-LENOVO") { choco install -y "$HOME\.dotfiles\chocolatey\backup\Lenovo\packages.config" }
```
