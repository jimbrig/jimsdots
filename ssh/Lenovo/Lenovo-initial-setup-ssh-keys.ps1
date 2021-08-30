# Enable OpenSSH Client (need ADMIN Priveledges)
sudo Add-WindowsCapability -Online -Name OpenSSH.Client*

# Generate SSH keypair for MSI Laptop
ssh-keygen -t rsa -b 4096 -C "jimmy.briggs@jimbrig.com"
# save to file C:\Users\jimmy\.ssh\MSI_id_rsa
# No Password

# Copy public key to clipboard
Get-Content -Path $HOME\.ssh\MSI_id_rsa.pub | Set-Clipboard

# Add to GitHub
Start-Process "https://github.com/settings/ssh/new"

# Create config
New-Item -Path '$HOME/.ssh/config' -ItemType File
"Host *`r`n    HostName github.com`r`n    User git`r`n    IdentityFile ~/.ssh/MSI_id_rsa`r`n    IdentitiesOnly yes`r`n" >> $HOME\.ssh\config
Get-Content ~/.ssh/config

# Test
ssh -T git@github.com
Set-Location ~/Dev/sandbox
git clone git@github.com:jimbrig/jimbrig.git
