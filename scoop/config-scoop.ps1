scoop update
refreshenv

scoop install aria2 runat 7zip curl sudo git openssh coreutils grep sed less innounp dark drivecleanup isobuster mklnk fastcopy
RefreshEnv.cmd

scoop checkup

# Disable Defender Blockage
sudo Add-MpPreference -ExclusionPath 'C:\Users\jimbr\scoop'
sudo Add-MpPreference -ExclusionPath 'C:\ProgramData\scoop'
RefreshEnv.cmd

# Support Long Paths
Set-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name 'LongPathsEnabled' -Value 1
RefreshEnv.cmd

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

scoop install scoop-completion
scoop install git-crypt
scoop install topgrade
sudo scoop install git-crypt --global
sudo scoop install topgrade --global
scoop install concfg pshazz
scoop install DockerCompletion
scoop install RapidEE Sysinternals --global


# add to powershell profile:
Import-Module "$($(Get-Item $(Get-Command scoop).Path).Directory.Parent.FullName)\modules\scoop-completion"
