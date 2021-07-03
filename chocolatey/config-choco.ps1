refreshenv

# configure chocolatey
Write-Host "Installing internal chocolatey packages"  -ForegroundColor Yellow
choco upgrade chocolatey choco-cleaner choco-package-list-backup -y

if (!(Test-Path -Path $PROFILE)) {
  Write-Host "Creating Powershell Profile" -ForegroundColor Green
  New-Item -ItemType File -Path $PROFILE -Force

  Add-Content -Path $profile -Value '# chocolatey profile
  $ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
  if (Test-Path($ChocolateyProfile)) {
    Import-Module "$ChocolateyProfile"
  }'
  Write-Host "Added Chocolatey to PowerShell Profile" -ForegroundColor Green
}

# features
Write-Host "Configuring Chocolatey's Settings and Features..." -ForegroundColor Yellow

choco feature enable -n allowGlobalConfirmation
choco config set cacheLocation $env:TEMP
choco feature enable -n logEnvironmentValues
choco feature enable -n virusCheck
choco config set virusScannerType VirusTotal
choco feature enable -n useRememberedArgumentsForUpgrades
choco feature enable -n removePackageInformationOnUninstall
choco feature enable -n allowEmptyChecksums


Write-Host "Done. Current feature set is: " -ForegroundColor Green
choco feature list

refreshenv
. $profile
refreshenv

