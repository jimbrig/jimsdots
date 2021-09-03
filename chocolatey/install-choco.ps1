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
