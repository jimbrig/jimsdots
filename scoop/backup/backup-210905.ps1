try{if(Get-Command scoop){}} catch {iex (new-object net.webclient).downloadstring('https://get.scoop.sh')}
scoop install git
scoop bucket add extras
scoop bucket add knox-scoop https://git.irs.sh/KNOXDEV/knox-scoop
scoop bucket add main
scoop bucket add nerd-fonts
scoop bucket add scoop-completion https://github.com/Moeologist/scoop-completion
scoop install 7zip
scoop install aria2
scoop install dark
scoop install DockerCompletion
scoop install git-crypt
scoop install innounp
scoop install scoop-backup
scoop install scoop-completion
scoop install sudo
scoop install wttop
scoop install sudo
sudo powershell -Command "scoop install --global CascadiaCode-NF;scoop install --global FiraCode-NF;scoop install --global Meslo-NF;scoop install --global Mononoki-NF;scoop install --global Regular-NF;scoop install --global sudo;scoop install --global Ubuntu-NF"

