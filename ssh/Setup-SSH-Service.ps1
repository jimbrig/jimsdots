function Test-IsAdmin {
  $UserIdentity = [Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()
  $UserIdentity.IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')
}

# Reference: https://code.visualstudio.com/docs/remote/containers#_sharing-git-credentials-with-your-container

# Make sure you're running as an Administrator
$admin = Test-IsAdmin
if (-not ($admin)) { throw "This script must be run as an Admin. Please restart your shell and try again." }

Write-Host "Setting StartupType to Automatic for ssh-agent service..." -ForegroundColor Yellow
Set-Service ssh-agent -StartupType Automatic
Write-Host "Done." -ForegroundColor Green

Write-Host "Starting ssh-agent service..." -ForegroundColor Yellow
Start-Service ssh-agent
Write-Host "Done." -ForegroundColor Green

Write-Host "Information on ssh-agent service." -ForegroundColor Cyan
Get-Service ssh-agent
Write-Host "Done." -ForegroundColor Green

Write-Host "Adding SSH Key to SSH Agent..." -ForegroundColor Yellow
ssh-add "$HOME\.dotfiles\ssh\MSI\MSI_id_rsa"
Write-Host "Done." -ForegroundColor Green
