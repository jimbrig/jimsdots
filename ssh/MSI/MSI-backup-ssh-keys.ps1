# copy ~/.ssh files to .dotfiles/ssh/
Move-Item -Path $HOME/.ssh/* -Destination $HOME/.dotfiles/ssh/MSI -include ** -Force

# SymLink back to ~/.ssh
New-Item -Path "$HOME\.ssh\config" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\config"
New-Item -Path "$HOME\.ssh\known_hosts" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\known_hosts"
New-Item -Path "$HOME\.ssh\id_rsa" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\MSI_id_rsa"
New-Item -Path "$HOME\.ssh\id_rsa.pub" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\MSI_id_rsa.pub"
