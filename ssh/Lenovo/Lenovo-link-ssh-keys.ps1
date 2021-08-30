# ensure ssh files are unlocked via git-crypt before linking to ~/.ssh
Set-Location ~/.dotfiles/ssh
# git-crypt unlock

# link keys into ~/.ssh
if (-not (test-path "$HOME\.ssh")) mkdir "$HOME\.ssh"
New-Item -Path "$HOME\.ssh\config" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\Lenovo\config"
New-Item -Path "$HOME\.ssh\known_hosts" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\Lenovo\known_hosts"
New-Item -Path "$HOME\.ssh\id_rsa" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\Lenovo\Lenovo_id_rsa"
New-Item -Path "$HOME\.ssh\id_rsa.pub" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\Lenovo\Lenovo_id_rsa.pub"

explorer.exe "$HOME\.ssh"
