# Install the OpenSSHUtils module to the server. This will be valuable when deploying user keys.
# Install-Module -Force OpenSSHUtils -Scope AllUsers

# By default the ssh-agent service is disabled. Allow it to be manually started for the next step to work.
# Get-Service -Name ssh-agent | Set-Service -StartupType Manual

# Start the ssh-agent service to preserve the server keys
# Start-Service ssh-agent

# generate key(s)
# cd ~\.ssh\
# ssh-keygen

######

# Ref: https://devconnected.com/how-to-setup-ssh-keys-on-github/#:~:text=Add%20SSH%20key%20to%20your%20GitHub%20Account%20In,to%20create%20a%20new%20SSH%20key%20for%20Github.

# Enable OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client*

# Create ssh directory
mkdir "~/.ssh"

# generate keys for outlook email address
cd "~/.ssh/" 
ssh-keygen -t rsa -b 4096 -C "jimbrig2011@outlook.com"

# write config file
New-Item -Path '~/.ssh/config' -ItemType File
$lb = "`r`n"
$txt =  "Host *" + $lb + "    Hostname github.com" + $lb + "    User git" + $lb + "    IdentityFile ~/.ssh/id_rsa" + $lb
$txt >> ~/.ssh/config

# open w notepad
notepad "~/.ssh/config"

# copy public key to clipboard
cat ~/.ssh/id_rsa.pub | Write-Output | clip

# open browser to GH SSH Settings and paste
start "https://github.com/settings/ssh/new"
