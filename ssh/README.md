# SSH

## Contents

## SSH Keys

Currently, I have the following SSH keys under version control:

- `MSI_id_rsa`/`MSI_id_rsa.pub` - MSI Laptop's Private/Public Key-Pair
- `Lenovo_id_rsa`/`Lenovo_id_rsa.pub` - Lenovo Laptop's Private/Public Key-Pair
- `WSL_Ubuntu-CommPrev_id_rsa`/`WSL_Ubuntu-CommPrev_id_rsa.pub` - WSL Ubuntu CommPrev Distro's Private/Public Key-Pair
- `WSL_Ubuntu_id_rsa`/`WSL_Ubuntu_id_rsa.pub` - WSL Ubuntu (20.04 LTS) Distro's Private/Public Key-Pair

Plus the `config` and `known_hosts` files for each host mentioned above.

## Scripts

The following scripts are used to generate, migrate, manage, and symlink the SSH keys:

- MSI:
  - [MSI-backup-ssh-keys.ps1](MSI/MSI-backup-ssh-keys.ps1)
  - [MSI-initial-setup-ssh-keys.ps1](MSI/MSI-initial-setup-ssh-keys.ps1)
  - [MSI-link-ssh-keys.ps1](MSI/MSI-link-ssh-keys.ps1)
- Lenovo:
  - [Lenovo-backup-ssh-keys.ps1](MSI/MSI-backup-ssh-keys.ps1)
  - [Lenovo-initial-setup-ssh-keys.ps1](MSI/MSI-initial-setup-ssh-keys.ps1)
  - [Lenovo-link-ssh-keys.ps1](Lenovo/Lenovo-link-ssh-keys.ps1)
- WSL - Ubuntu
  - [WSL-Ubuntu-backup-ssh-keys.sh](WSL-Ubuntu/WSL-Ubuntu-backup-ssh-keys.sh)
  - [WSL-Ubuntu-initial-setup-ssh-keys.sh](WSL-Ubuntu/WSL-Ubuntu-initial-setup-ssh-keys.sh)
  - [WSL-Ubuntu-link-ssh-keys.sh](WSL-Ubuntu/WSL-Ubuntu-link-ssh-keys.sh)
- WSL-Ubuntu-CommPrev
  - [WSL-Ubuntu-CommPrev-backup-ssh-keys.sh](WSL-Ubuntu-CommPrev/WSL-Ubuntu-CommPrev-backup-ssh-keys.sh)
  - [WSL-Ubuntu-CommPrev-initial-setup-ssh-keys.sh](WSL-Ubuntu-CommPrev/WSL-Ubuntu-CommPrev-initial-setup-ssh-keys.sh)
  - [WSL-Ubuntu-CommPrev-link-ssh-keys.sh](WSL-Ubuntu-CommPrev/WSL-Ubuntu-CommPrev-link-ssh-keys.sh)

## Notes

### SSH Setup and Key Generation

#### Windows

```powershell
# Enable OpenSSH Client (need ADMIN Priveledges)
Add-WindowsCapability -Online -Name OpenSSH.Client*
# or via sudo
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
cat ~/.ssh/config

# Test
ssh -T git@github.com
cd ~/Dev/sandbox
git clone git@github.com:jimbrig/jimbrig.git
```

### Backup Keys to Dotfiles and Symlink Back

#### Windows - MSI

```powershell
# copy ~/.ssh files to .dotfiles/ssh/
Move-Item -Path $HOME/.ssh/* -Destination $HOME/.dotfiles/ssh/MSI -include ** -Force

# SymLink back to ~/.ssh
New-Item -Path "$HOME\.ssh\config" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\config"
New-Item -Path "$HOME\.ssh\known_hosts" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\known_hosts"
New-Item -Path "$HOME\.ssh\id_rsa" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\MSI_id_rsa"
New-Item -Path "$HOME\.ssh\id_rsa.pub" -ItemType SymbolicLink -Value "$HOME\.dotfiles\ssh\MSI\MSI_id_rsa.pub"
```

#### WSL - Ubuntu-CommPrev

```bash
# generate key-pair
ssh-keygen -t rsa -b 4096 -C "jimmy.briggs@jimbrig.com"
# save to file /home/jimbrig/.ssh/WSL_Ubuntu-CommPrev_id_rsa
# no password

# create and edit config
echo "Host *\n    HostName github.com\n    User git\n    IdentityFile ~/.ssh/WSL_Ubuntu-CommPrev_id_rsa\n    IdentitiesOnly yes\n" > ~/.ssh/config
cat ~/.ssh/config
# or via VIM:
vim ~/.ssh/config

# copy to clipboard (NOTE: need alias for clip.exe here)
cat WSL_Ubuntu-CommPrev_id_rsa.pub | clip

# launch github ssh new page in browser:
cmd.exe /c start   https://github.com/settings/ssh/new

# Test
ssh -T git@github.com
cd ~/dev
git clone git@github.com:jimbrig/wsl-dotfiles.git
```
In order to use ssh-keygen on Windows, you need to have the **OpenSSH client enabled**.

### Enabling OpenSSH client on Windows 10

In order to enable the OpenSSH client, you essentially have two options : 
  - Using Powershell 
  - Using the graphical interface.

To enable the OpenSSH client via Powershell, use the `Add-WindowsCapability` option and specify the **OpenSSH Client**:

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client*

Path          :
Online        : True
RestartNeeded : False
```

> **Note** : you need to be **administrator** in order to enable OpenSSH on your computer.

You can also enable the OpenSSH client via the graphical interface :

- Click on “**Start**” and search for “**Manage Optional Features**“
- Click on “**Add a Feature**“
- Search for OpenSSH and install the OpenSSH client

Installing the OpenSSH client on Windows 10 will allow you to perform multiple commands via the Powershell : **ssh-add, ssh-keygen (the one we are interested in), ssh-agent, ssh-keyscan and the ssh executable.**

On Windows, for version greater than Windows 7, you can use `ssh-keygen` in order to connect to your remote Git repositories.

Open Powershell and type the following commands:

```powershell
ssh-keygen
```

The following prompts should look like this:

```powershell
Enter file in which to save the key (C:\Users\schkn/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
	Your identification has been saved in id_rsa.
	Your public key has been saved in id_rsa.pub.
The key fingerprint is:
SHA256:62DCkEWFILzHG8PhBEeQ2gzaEQ01/Y7VJEABWkuXGHI jimmy@DESKTOP-MSI
The key's randomart image is:
+---[RSA 3072]----+
|ooXOEO*+         |
|.+oX++o . .      |
|o=B.+  . +       |
|o.+X    o .      |
|  + +  +S        |
|   +  . ..       |
|    o o .        |
|     o o         |
|        .        |
+----[SHA256]-----+
```

![image-20210830174436503](C:\Users\jimmy\AppData\Roaming\Typora\typora-user-images\image-20210830174436503.png)

In the first prompt, you can choose to save your public key in a separate file, but you will need to specify the entire path to the file.

If you chose to create your keys in a separate file, you will need to create a file named “config” into your .ssh directory

> Note : the “config” file needs to have no extension at all, it cannot be named “config.txt” for example.

#### Configure your SSH keys

In order to configure your SSH keys, run the “**New-Item**” command to create a new file using Powershell.

```powershell
New-Item -Path 'C:/Users/user/.ssh/config' -ItemType File
```

> **Note** : you have to replace “**user**” by the actual user using the account

In the configuration file, paste the following content in order to select the correct key when performing Git commands.

```
Host *
    Hostname github.com
    User git
    IdentityFile ~/.ssh/custom_id_rsa
```

Save your file, and you should be good to go.

### Add SSH key to your GitHub Account

```powershell
# test/setup .ssh directory:
if (-not (test-path "$HOME\.ssh")) mkdir "$HOME\.ssh"
cd $HOME\.ssh

# generate key-pair associated with email address:
ssh-keygen -t rsa -b 4096 -C "jimmy.briggs@jimbrig.com"

# copy public key to clipboard
Get-Content -Path $HOME\.ssh\id_rsa.pub | Set-Clipboard

# navigate browser to GitHub settings to add SSH key from clipboard
Start-Process "https://github.com/settings/ssh/new"

# configure SSH
touch $HOME\.ssh\config
echo "Host *`n	Hostname github.com`n	User git`n	IdentityFile ~/.ssh/id_rsa" >> $HOME\.ssh\config
```
### Create SSH Keypair

```powershell
if (-not (test-path "$HOME\.ssh")) mkdir "$HOME\.ssh"
cd $HOME\.ssh
ssh-keygen -t rsa -b 4096 -C "jimmy.briggs@jimbrig.com"
ssh-keygen -t rsa -b 4096
```

- [ ] Generate an SSH Keypair (private and public ssh keys): `ssh-keygen -t rsa -b 4096`
  - Public Key: Your **public** key is placed on remote servers so that they can check back with you to see that you are who you say you are.
  - Private Key: Your **private** key should **NEVER** leave your computer! This is the main file that authenticates you. It contains the special unique data that identifies you.

### Add Public Key to GitHub

- GitHub

```powershell
# copy public key to clipboard
Get-Content -Path $HOME\.ssh\id_rsa.pub | Set-Clipboard

# navigate browser to GitHub settings to add SSH key from clipboard
Start-Process "https://github.com/settings/ssh/new"
```

- Install the `OpenSSHUtils` module to the server. 
  - This will be valuable when deploying user keys.
- By default the `ssh-agent service` is disabled. Allow it to be manually started for the next step to work.
- Start the `ssh-agent service` to preserve the server keys
- Generate SSH Keys:
  - Navigate to ``~/.ssh`
  - Run `ssh-keygen`
- Setup keys for Github: see [This post on how to setup ssh keys for github](https://devconnected.com/how-to-setup-ssh-keys-on-github/#:~:text=Add%20SSH%20key%20to%20your%20GitHub%20Account%20In,to%20create%20a%20new%20SSH%20key%20for%20Github)
- Enable OpenSSH Client
- Create `~/.ssh` directory
- Generate keys for various email addresses and accounts:
  - jimbrig2011@outlook.com
  - jimmy.briggs@tychobra.com
  - jimbrig2011@gmail.com
- Write the main ssh `config` file
- Copy public key to clipboard
- Add public key to Github

```
Add-WindowsCapability -Online -Name OpenSSH.Client*

mkdir "~/.ssh"
cd "~/.ssh/" 

ssh-keygen -t rsa -b 4096 -C "jimbrig2011@outlook.com"

New-Item -Path '~/.ssh/config' -ItemType File
$lb = "`r`n"
$txt =  "Host *" + $lb + "    Hostname github.com" + $lb + "    User git" + $lb + "    IdentityFile ~/.ssh/id_rsa" + $lb
$txt >> ~/.ssh/config

notepad "~/.ssh/config"

cat ~/.ssh/id_rsa.pub | Write-Output | clip

start "https://github.com/settings/ssh/new"
```