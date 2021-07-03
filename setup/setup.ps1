Write-Host "Setting up powershell" -ForegroundColor Blue

$isadmin = (new-object System.Security.Principal.WindowsPrincipal([System.Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole("Administrators")

if ($isadmin) {

  # execution policy
  $exepolicy = Get-ExecutionPolicy
  if ($exepolicy -ne 'Unrestricted') {
    Write-Host "Setting Execution Policy to Unrestricted" -ForegroundColor Blue
    Set-ExecutionPolicy Unrestricted
    Set-ExecutionPolicy Unrestricted -scope CurrentUser
  }

  # create powershell profile
  if (!(Test-Path -Path $PROFILE)) {
    Write-Host "Creating Powershell Profile" -ForegroundColor Blue
    New-Item -ItemType File -Path $PROFILE -Force
  }

  # install chocolatey
  if (-not (Test-Path "C:\ProgramData\Chocolatey\bin\choco.exe")) {
    Write-Host "Chocolatey missing, preparing for install" -ForegroundColor Magenta

    # This line is from: https://chocolatey.org/install
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

  }
  else {
    Write-Host "Chocolatey already installed." -ForegroundColor Green
  }

  # Need to refresh before running choco commands
  RefreshEnv.cmd

  # configure choco
  Write-Host "Configuring Chocolatey" -ForegroundColor Blue
  choco upgrade chocolatey choco-cleaner choco-package-list-backup -y
  choco feature enable -n allowGlobalConfirmation
  choco config set cacheLocation $env:TEMP
  choco feature enable -n logEnvironmentValues
  choco feature enable -n virusCheck
  choco feature enable -n useRememberedArgumentsForUpgrades
  choco feature enable -n removePackageInformationOnUninstall

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

}
else {
  Write-Host "Please run this script as an administrator" -ForegroundColor Red
}
