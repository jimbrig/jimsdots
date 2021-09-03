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