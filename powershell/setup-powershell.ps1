Write-Host "Setting up PowerShell..." -ForegroundColor Blue

$isadmin = (new-object System.Security.Principal.WindowsPrincipal([System.Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole("Administrators")
if (-not ($isadmin)) { throw "Must have Admininstrative Priveledges..." }

# execution policy
$exepolicy = Get-ExecutionPolicy
if ($exepolicy -ne 'Unrestricted') {
  Write-Host "Setting Execution Policy to Unrestricted" -ForegroundColor Blue
  Set-ExecutionPolicy Unrestricted -scope CurrentUser
  Set-ExecutionPolicy Unrestricted
}

# package provider
Install-PackageProvider -Name Nuget -Force

# trust PSrepository
Set-PSRepository -Name 'PSGallery' -InstallationPolicy Trusted

# create dirs
If (-not (test-path '~/Dev')) { mkdir '~/Dev' }
If (-not (test-path '~/Dev')) { mkdir '~/Documents/PowerShell' }
If (-not (test-path '~/Dev')) { mkdir '~/Documents/WindowsPowerShell' }

# create powershell profile
if (!(Test-Path -Path $PROFILE)) {
  Write-Host "Creating Powershell Profile" -ForegroundColor Blue
  New-Item -ItemType File -Path $PROFILE -Force
}

# other profiles
$otherprofiles = @(
  "~/Documents/PowerShell/profile.ps1"
  "~/Documents/PowerShell/Microsoft.VSCode_profile.ps1"
  "~/Documents/PowerShell/Microsoft.PowerShellISE_profile.ps1"
  "~/Documents/PowerShell/Microsoft.PowerShell_profile.ps1"
  "~/Documents/WindowsPowerShell/profile.ps1"
  "~/Documents/WindowsPowerShell/Microsoft.VSCode_profile.ps1"
  "~/Documents/WindowsPowerShell/Microsoft.PowerShellISE_profile.ps1"
  "~/Documents/WindowsPowerShell/Microsoft.PowerShell_profile.ps1"
)

foreach ($file in $otherprofiles) {
  if (-not (test-path $file)) { New-Item -ItemType File $file -Force }
}

# install nerd fonts
cinst cascadia-code-nerd-font

# Modules
$mods = Get-Content ~/.dotfiles/powershell/powershell/modules/modules.json | ConvertFrom-Json

foreach ($mod in $mods) {
  Write-Host "Installing PowerShell Module for Current User: $mod" -ForegroundColor Yellow
  Install-Module $mod -Scope CurrentUser -Force
}

Install-Module -Scope CurrentUser -Force oh-my-posh
Install-Module -Scope CurrentUser -Force powershell-yaml
Install-Module -Scope CurrentUser -Force PSScriptTools
Install-Module -Scope CurrentUser -Force PSWriteColor
Install-Module -Scope CurrentUser -Force Terminal-Icons
Install-Module -Scope CurrentUser -Force WSLInterop
Install-Module -Scope CurrentUser -Force WindowsCompatibility
Install-Module -Scope CurrentUser -Force ChocolateyGet
Install-Module -Scope CurrentUser -Force PSFzf
Install-Module -Scope CurrentUser -Force PSWindowsUpdate
Install-Module -Scope CurrentUser -Force posh-git


Import-Module posh-git
Add-PoshGitToProfile

# create modules.json
$mods = Get-ChildItem -Directory
Write-Color "Removing previous ", "modules.json", " file." -Color "green", "red", "green"
if (test-path modules.json) { remove-item -Path modules.json }
$mods.Name | ConvertTo-Json >> modules.json
Write-Color "✔️ Successfully updated ", "modules.json ", "." -Color "green", "red", "green"
$push = Read-Host -Prompt "Push to github? (y/n)"
if ($push) {
  Set-Location ..
  git add Modules/**
  git commit -m "Updated modules."
  git push
}
Write-Color "✔️ Successfully pushed to github."




# install chocolatey
if (-not (Test-Path "C:\ProgramData\Chocolatey\bin\choco.exe")) {
  Write-Host "Chocolatey missing, preparing for install" -ForegroundColor Magenta
  # This line is from: https://chocolatey.org/install
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
  . $PROFILE
  refreshenv
}
else {
  Write-Host "Chocolatey already installed." -ForegroundColor Green
}

# configure choco
Write-Host "Configuring Chocolatey" -ForegroundColor Blue
choco upgrade chocolatey choco-cleaner choco-package-list-backup -y
choco feature enable -n allowGlobalConfirmation
choco config set cacheLocation $env:TEMP
choco feature enable -n logEnvironmentValues
choco feature enable -n virusCheck
choco feature enable -n useRememberedArgumentsForUpgrades
choco feature enable -n removePackageInformationOnUninstall
refreshenv
copy-item $PROFILE ~/Documents/PowerShell

# install and configure NVM, NPM, and Node
cinst nvm
refreshenv
nvm install "latest"
nvm on
npm i -g npm@7.20.6
npm login
npm i -g tldr npm-windows-upgrade npm-check npm-user-cli doctoc npq nodemon save-local cross-env yarn prettier eslint create-react-app create-next-app dbdocs release-it
RefreshEnv.cmd
cinst boxstarter choco-cleaner choco-package-list-backup instchoco winaero-tweaker linkshellextension
RefreshEnv.cmd

# scoop
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

refreshenv
scoop install 7-Zip innounp dark sudo aria2
refreshenv

sudo App-MpPreference -ExclusionPath 'C:\Users\jimmy\scoop'
sudo App-MpPreference -ExclusionPath 'C:\ProgramData\scoop'
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name 'LongPathsEnabled' -Value 1
refreshenv
scoop checkup
scoop bucket add extras
scoop bucket add scoop-completion
scoop install topgrade git-crypt
refreshenv

winget --version
winget install Microsoft.WindowsTerminalPreview --source msstore
winget install Microsoft.PowerShell --exact --scope machine
winget install Microsoft.PowerShell.Preview --exact --scope machine

# python
winget install Python.Python.3
Set-Location $env:programfiles\python39
python.exe -m pip install --upgrade pip
Set-Location ~
pip install pipx virtualenv radian mkdocs keep

winget install Microsoft.PowerToys

winget install Microsoft.dotnetPreview
winget install Microsoft.dotNetFramework
winget install Microsoft.dotnetRuntime.3-x64
winget install Microsoft.dotnetRuntime.5-x64

winget install Microsoft.EdgeDev
winget install Microsoft.MicrosoftEdgeDevToolsPreview --source msstore
winget install Microsoft.EdgeWebView2Runtime

winget install Git.Git
winget install Github.GitLFS
winget install GitExtensionsTeam.GitExtensions
winget install gnupg.Gpg4win
winget install Axosoft.Gitkraken
winget install Github.cli

winget install Microsoft.VisualStudioCode.Insiders
winget install Microsoft.VisualStudioCode

winget install Typora.Typora
winget install Obsidian.Obsidian

winget install Docker.DockerDesktop

winget install RProject.R
winget install RProject.Rtools
winget install RStudio.RStudio.OpenSource

winget install Google.CloudSDK
winget install Microsoft.AzureCLI
winget install Heroku.HerokuCLI

winget install PostgreSQL.PostgreSQL
winget isntall PostgreSQL.pgAdmin
winget install dbeaver.dbeaver
winget isntall DBBrowserForSQLite.DBBrowserForSQLite
winget install beekeeper-studio.beekeeper-studio
winget isntall Fabio286.Antares

winget install ArtifexSoftware.Ghostscript
winget install ImageMagick.ImageMagick
winget install Kitware.CMake
winget install JRSoftware.InnoSetup
winget install JohnMacFarlane.Pandoc
winget install egoist.devdocs-desktop
winget install JanDeDobbeleer.OhMyPosh

winget install Hashicorp.Vagrant

winget install 7zip.7zip
winget install CrystalIDEASoftware.UninstallTool
winget install AdrienAllard.FileConverter
winget install OlegDanilov.RapidEnvironmentEditor
winget install HandyOrg.HandyWinget-GUI
winget install JAMSoftware.TreeSizeFree
winget install voidtools.Everything
winget install DigitalVolcanoSoftware.DuplicateCleanerPro

winget install Google.Chrome.Dev
winget install Google.Drive
winget install klinker23.google-calendar-desktop
winget install timche.gmail-desktop

winget install Rufus.Rufus
winget install Ntlitesoft.NTLite
# winget install PowerSoftware.PowerISO
# winget install PowerSoftware.AnyBurn
# winget install ventoy

winget install Doist.Todoist
winget install evernote.evernote
winget install RustemMussabekov.Raindrop
# winget install grammarly.GrammarlyForWindows
# winget install grammarly.Grammarlyforoffice
# winget install Notion.Notion

winget install Intel.IntelDriverAndSupportAssistant

winget install Nvidia.GeForceExperience
winget install Nvidia.CUDA

winget install SteelSeries.GG
winget install SteelSeries.SteelSeriesEngine

winget install Yarn.Yarn


# Check if git is already installed
if (-not (Test-Path "C:\Program Files\Git\cmd\git.exe")) {
  Write-Host "Git missing, preparing for install using Chocolatey."
  Invoke-Expression "&C:\ProgramData\Chocolatey\bin\choco.exe install -y -r git --params `"/GitOnlyOnPath /NoAutoCrlf /WindowsTerminal /NoShellIntegration`""

  $sshPath = "C:\Program Files\Git\usr\bin\ssh.exe"
  if ((Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Client*').State -eq "Installed") {
    $sshPath = "C:\Windows\System32\OpenSSH\ssh.exe"
  }

  [environment]::SetEnvironmentVariable('GIT_SSH', $sshPath, 'USER')
  $env:GIT_SSH = $sshPath

  Write-Host "Git installed." -ForegroundColor "Green"
}
else {
  Write-Host "Git already installed." -ForegroundColor "Green"
}

# pull jimsdots repo
if (-not (Test-Path "$env:HOME\.dotfiles\README.md")) {
  Write-Host "~\.dotfiles missing, preparing to clone from jimbrig/jimsdots into ~\.dotfiles"
  Write-Host ""
  Invoke-Expression "&`"C:\Program Files\Git\cmd\git.exe`" clone --recurse-submodules https://github.com/jimbrig/jimsdots.git `"$env:HOME\.dotfiles`""
  Write-Host ""
  Write-Host "Finished cloning ~\.dotfiles." -ForegroundColor "Green"

  Write-Host "Unlocking dotfiles via git-crypt"


}
else {
  Write-Host "~\.dotfiles already set up." -ForegroundColor "Green"
}



# install powershell core

Write-Host "Installing powershell core preview" -ForegroundColor Magenta
Invoke-Expression "& { $(Invoke-RestMethod 'https://aka.ms/install-powershell.ps1') } -preview -UseMSI"





# install boxstarter
Write-Host "Installing boxstarter" -ForegroundColor Magenta
{ Invoke-WebRequest -useb https://boxstarter.org/bootstrapper.ps1 } | Invoke-Expression; Get-Boxstarter -Force

Write-Host "Installing git and adding to path" -ForegroundColor Magenta
choco install -y git --package-parameters="'/GitAndUnixToolsOnPath /WindowsTerminal'"

# boxstarter winconfig options:
Write-Host "Configuring Windows with BoxStarter's winconfig commands"
Set-WindowsExplorerOptions EnableShowHiddenFilesFoldersDrives -EnableShowProtectedOSFiles -EnableShowFileExtensions -EnableShowFullPathInTitleBar -EnableShowRibbon -DisableOpenFileExplorerToQuickAccess
Set-BoxstarterTaskbarOptions -Size Small -Dock Bottom -Combine Always -AlwaysShowIconsOn -MultiMonitorOn -MultiMonitorMode All -MultiMonitorCombine Always
Disable-UAC
Disable-BingSearch
Enable-RemoteDesktop
Enable-MicrosoftUpdate
Install-WindowsUpdate

RefreshEnv.cmd

# install scoop
if (-not (Test-Path "$env:HOME\scoop\shims\scoop")) {

  Write-Host "Installing Scoop" -ForegroundColor Magenta

  Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

  # configure scoop
  Write-Host "Installing git with scoop" -ForegroundColor Magenta
  scoop install git --global
  Refreshenv.cmd

  Write-Host "Configuring Scoop" -ForegroundColor Blue
  scoop update

  Write-Host "Adding scoop buckets: main, extras, scoop-completion" -ForegroundColor Magenta
  scoop bucket add main
  scoop bucket add extras
  scoop bucket add scoop-completion https://github.com/Moeologist/scoop-completion

  Write-Host "Installing scoop-completion and git-crypt" -ForegroundColor Magenta
  scoop install scoop-completion
  scoop install git-crypt

  # add to powershell profile:
  Import-Module "$($(Get-Item $(Get-Command scoop).Path).Directory.Parent.FullName)\modules\scoop-completion"

}
else {
  Write-Host "Scoop already installed." -ForegroundColor Green
}






# hibernation
powercfg -h off

#Disable Bing search
New-ItemProperty HKCU:\Software\Microsoft\Windows\CurrentVersion\Search -Name BingSearchEnabled -PropertyType DWORD -Value 0
Set-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Search" "CortanaConsent" 0

# Enabling Verbose mode in Windows 10
New-ItemProperty HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System -Name VerboseStatus -PropertyType DWORD -Value 1

# Stop Apps from opening at startup
Remove-ItemProperty "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" -Name "KeePassXC"
Remove-ItemProperty "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" -Name "OneDrive"

# Remove 3D objects folder, show file extensions
Remove-Item "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}"
Remove-Item "HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}"
Set-ItemProperty "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" "HideFileExt" 0

# Install Powershell Modules
Install-Module posh-git
Install-Module oh-my-posh

# Enable Windows Subsytem for Linux
Write-Host "Enabling Windows Subsytem for Linux" -ForegroundColor Magenta
Enable-WindowsOptionalFeature -Online -FeatureName $("VirtualMachinePlatform", "Microsoft-Windows-Subsystem-Linux")


Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
