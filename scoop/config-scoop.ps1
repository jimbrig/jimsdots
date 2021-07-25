
# Update Scoop
Write-Host "Updating Scoop..." -ForegroundColor Magenta
scoop update
Write-Host "Successfully updated scoop." -ForegroundColor Green
RefreshEnv.cmd

# Install git
Write-Host "Installing git due to scoop's dependency on it..." -ForegroundColor Magenta
scoop install git
Write-Host "Successfully installed git." -ForegroundColor Green
RefreshEnv.cmd

# Aliases
Write-Host "Creating scoop aliases..." -ForegroundColor Magenta
# Install app
scoop alias add i 'scoop install $args[0]' 'Install app'
scoop alias add add 'scoop install $args[0]' 'Install app'
# Uninstall app
scoop alias add rm 'scoop uninstall $args[0]' 'Uninstall an app'
scoop alias add remove 'scoop uninstall $args[0]' 'Uninstall an app'
# List apps
scoop alias add ls 'scoop list' 'List installed apps'
# Update
scoop alias add u 'scoop update $args[0]' 'Update apps, or Scoop itself'
scoop alias add upgrade 'scoop update $args[0]' 'Update apps, or Scoop itself'
scoop alias add upgradeall 'scoop update *' 'Updates all apps, just like brew or apt'
scoop alias add ua 'scoop update *' 'Update all installed apps'
# Cleanup
scoop alias add ca 'scoop cleanup *' 'Delete all old installed versions; better exit running programs first'
scoop alias add cc 'scoop cache rm *' 'Empty download cache'
scoop alias add s 'scoop status' 'Show status and check for new app versions'
# Backup
scoop alias add backup 'scoop-backup' 'Backs up scoop apps to backup directory.'

Write-Host "Successfully added scoop aliases." -ForegroundColor Green
RefreshEnv.cmd

# Checkup
Write-Host "Checking Scoop..." -ForegroundColor Magenta
scoop checkup
Write-Host "Successfully ran scoop checkup." -ForegroundColor Green

# Install sudo
Write-Host "Installing sudo for admin commands..." -ForegroundColor Magenta
scoop install sudo
Write-Host "Successfully installed sudo" -ForegroundColor Green
RefreshEnv.cmd

# Defender Exclusion PATHs
Write-Host "Configuring Defender Exclusion Paths..." -ForegroundColor Magenta
sudo Add-MpPreference -ExclusionPath '$env:USERPROFILE\scoop'
sudo Add-MpPreference -ExclusionPath '$env:PROGRAMDATA\scoop'
Write-Host "Successfully added ~/scoop and %programdata%\scoop to defender's exclusion paths" -ForegroundColor Green
RefreshEnv.cmd

# Support Long Paths
Write-Host "Configuring Windows to support long paths..." -ForegroundColor Magenta
sudo Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name 'LongPathsEnabled' -Value 1
Write-Host "Successfully edited registry to enable long-path support." -ForegroundColor Green
RefreshEnv.cmd

# Add Buckets
Write-Host "Adding scoop buckets..." -ForegroundColor Magenta
scoop bucket add main
scoop bucket add extras
scoop bucket add scoop-completion https://github.com/Moeologist/scoop-completion
scoop bucket add nerd-fonts
scoop bucket add nirsoft
scoop bucket add r-bucket https://github.com/cderv/r-bucket.git
scoop bucket add Sysinternals 'https://github.com/Ash258/Scoop-Sysinternals.git'
scoop bucket add wsl https://git.irs.sh/KNOXDEV/wsl
scoop bucket add rasa https://github.com/rasa/scoops.git
scoop bucket add retools https://github.com/TheCjw/scoop-retools.git
scoop bucket add dorado https://github.com/chawyehsu/dorado
scoop bucket add sushi https://github.com/kidonng/sushi
scoop bucket add alias-additions https://github.com/snaphat/alias-additions.git
Write-Host "Successfully added buckets for scoop." -ForegroundColor Green
RefreshEnv.cmd
Write-Host "Current scoop buckets:" -ForegroundColor Yellow
scoop bucket list

# Scoop completion
Write-Host "Installing scoop-completion for powershell profile..." -ForegroundColor Magenta
scoop install scoop-completion
Write-Host "Successfully installed scoop-completion." -ForegroundColor Green
Write-Host "Adding scoop-completion to powershell profile..." -ForegroundColor Magenta
Add-Content -Path $Profile -Value "`nImport-Module $env:USERPROFILE\scoop\modules\scoop-completion"
Write-Host "Successfully added completion code to powershell profile." -ForegroundColor Green
RefreshEnv.cmd

# User Installs
Write-Host "Installing user apps using scoop..." -ForegroundColor Magenta
scoop install aria2 runat 7zip curl coreutils scoop-completion scoop-backup dark grep sed less touch which dark mklnk fastcopy s lessmsi microsof-edge-canary drivecleanup pshazz pswinutil sysinternals topgrade isobuster concfg openssh keypirinha innounp git-crypt DockerCompletion psgithub busybox alias-additions
Write-Host "Successfully installed user programs using scoop." -ForegroundColor Green

# Global Installs
Write-Host "Installing global system wide apps using scoop..." -ForegroundColor Magenta
sudo scoop install git-crypt topgrade Sysinternals RapidEE --global
Write-Host "Successfully install system apps using scoop" -ForegroundColor Green
RefreshEnv.cmd
Write-Host "Current installed user apps via scoop:" -ForegroundColor Yellow
scoop list

