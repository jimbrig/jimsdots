
# Windows Sub-System for Linux (WSL)

## Contents

- [Windows Sub-System for Linux (WSL)](#windows-sub-system-for-linux-wsl)
  - [Contents](#contents)
  - [About](#about)
    - [Specifications](#specifications)
  - [Installation](#installation)
    - [Legacy Installation](#legacy-installation)
    - [Ubuntu Community Preview Distro](#ubuntu-community-preview-distro)
  - [Setup](#setup)
    - [Install Common Dependencies](#install-common-dependencies)
    - [Setup GPG Key](#setup-gpg-key)
      - [Export from Windows](#export-from-windows)
      - [Create a New Key](#create-a-new-key)
    - [Setup Git](#setup-git)
      - [My .gitconfig](#my-gitconfig)
      - [Link Git Config Files back to Dotfiles](#link-git-config-files-back-to-dotfiles)
    - [Setup Shell with `zsh`](#setup-shell-with-zsh)
    - [Docker](#docker)
      - [Install Docker Desktop](#install-docker-desktop)
      - [Setup Docker CLI](#setup-docker-cli)
    - [Node.js, NPM, and NVM](#nodejs-npm-and-nvm)
    - [Github CLI](#github-cli)
    - [Setup Windows Terminal](#setup-windows-terminal)
    - [WSL Bridge](#wsl-bridge)
    - [Limit WSL 2 RAM consumption](#limit-wsl-2-ram-consumption)
  - [WSL Scratch Notes](#wsl-scratch-notes)
    - [Remove](#remove)
    - [Link](#link)
    - [Tar and Unzip](#tar-and-unzip)
    - [DOS vs. UNIX Line  Ending Issues](#dos-vs-unix-line--ending-issues)
      - [Symptoms](#symptoms)
      - [Solution: `dos2unix`](#solution-dos2unix)
    - [Permissions](#permissions)
    - [%PATH%](#%25path%25)
  - [Reference](#reference)

## About

- Working on Windows 10 with WSL
- Having a visually nice terminal through Windows Terminal (Preview)
- `zsh` as my main shell with `oh-my-zsh` as well
- Using Docker and Docker Compose directly from zsh
- Using VSCode (Insiders) directly from WSL 2

### Specifications

- Host: Windows 11 Pro x64
  - Ubuntu via WSL 2 (Windows Subsystem for Linux)
  - Docker Desktop
- Terminal: Windows Terminal Preview
- Shell: zsh
  - git
  - docker (works with Docker Desktop)
  - docker-compose (works with Docker Desktop)
- Node.js (using `nvm`)
  - node
  - npm
  - yarn
- IDE: VSCode Insiders and the Remote WSL Extension
- WSL Bridge: allow exposing WSL 2 ports on the network

## Installation

> See [Install WSL on Windows 10 | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

- From Windows:
  - Enable WSL Optional Feature via `wsl --install` (only works for Insider releases)
    - In order to use the `wsl --install` simplified install command, you must:
      - Join the [Windows Insiders Program](https://insider.windows.com/getting-started)
      - Install a preview build of Windows 10 (OS build 20262 or higher).
      - Open a command line window with Administrator privileges
    - The `--install` command performs the following actions:
      - Enables the optional *WSL* and *Virtual Machine Platform* components
      - Downloads and installs the latest Linux kernel
      - Sets *WSL 2* as the default
      - Downloads and installs a Linux distribution *(reboot may be required)*
    - By default, the installed Linux distribution will be Ubuntu. This can be changed using `wsl --install -d <Distribution Name>`. *(Replacing `<Distribution Name>` with the name of your desired distribution.)* Additional Linux distributions may be added to your machine after the initial install using the `wsl --install -d <Distribution Name>` command.
    - To see a list of available Linux distributions, enter `wsl --list --online`.

```powershell
# install Ubuntu
wsl --install -d Ubuntu

# set WSL2 as default
wsl --set-default-version 2

# check status
wsl --status

# check for updates
wsl --update

# other commands:
# wsl --export
# wsl --import
# wsl --exec <command>
```

### Legacy Installation

```powershell
# ADMIN

# enable WSL feature via DISM
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# enable virtualmachine platform for WSL2
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# restart
Restart-Computer

# upgrade to WSL2 kernel:
wsl --update

# set default version
wsl --set-default-version 2
```

For direct download of Ubuntu from the Microsoft Store visit: [Get Ubuntu - Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab).

***

- Enable WSL 2 and update the linux kernel ([Source](https://docs.microsoft.com/en-us/windows/wsl/install-win10))

```powershell
# In PowerShell as Administrator

# Enable WSL and VirtualMachinePlatform features
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Download and install the Linux kernel update package
$wslUpdateInstallerUrl = "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi"
$downloadFolderPath = (New-Object -ComObject Shell.Application).NameSpace('shell:Downloads').Self.Path
$wslUpdateInstallerFilePath = "$downloadFolderPath/wsl_update_x64.msi"
$wc = New-Object System.Net.WebClient
$wc.DownloadFile($wslUpdateInstallerUrl, $wslUpdateInstallerFilePath)
Start-Process -Filepath "$wslUpdateInstallerFilePath"

# Set WSL default version to 2
wsl --set-default-version 2
```

- [Install Ubuntu from Microsoft Store](https://www.microsoft.com/fr-fr/p/ubuntu/9nblggh4msv6)

### Ubuntu Community Preview Distro

To install the latest Community Preview Version of Ubuntu you can simply visit Microsoft Store Link here: [Get Ubuntu on Windows Community Preview - Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu-on-windows-community-preview/9p9q5zh1hrr0?rtc=1)

Alternatively, you can download the `appxbundle` directly via `Invoke-RestMethod` and install directly from the terminal (note however that you must have the *Developer Mode* features enabled to allow side-loading apps from `appxbundle` files)

- Tool used to get URI: [Microsoft Store - Generation Project](https://store.rg-adguard.net/).
- [Scripts/Download-AppxFromStore.ps1 at a1163b97875ed075927438505808622614a9961f · MattiasC85/Scripts (github.com)](https://github.com/MattiasC85/Scripts/blob/a1163b97875ed075927438505808622614a9961f/OSD/Download-AppxFromStore.ps1)

Run the following:

```powershell
# specify uri (retrieved via https://store.rg-adguard.net/)
$uri = "http://tlu.dl.delivery.mp.microsoft.com/filestreamingservice/files/97622db3-5fac-4245-86a5-e3c72c8242dc?P1=1630030809&P2=404&P3=2&P4=OkKbA8SXGdWWTnIMWGAoO9Z8cdKhk1JrDUvxVehBAXdFRl8GIrVXlUltUZHYbHMMfazBl1X3%2fg3XtperasA7AQ%3d%3d"

# may take a minute
Invoke-RestMethod $uri -OutFile "~/Downloads/Ubuntu-CommPrev.appxbundle"

# run the downloaded file
cd ~/Downloads
.\Ubuntu-CommPrev.appxbundle

```

## Setup

- From Linux/WSL Shell:
  - See Also: [AptGet/Howto - Community Help Wiki (ubuntu.com)](https://help.ubuntu.com/community/AptGet/Howto#Maintenance_commands)

```bash
# update, upgrade, autoremove
sudo apt -y update && sudo apt -y upgrade && sudo apt -y autoremove

# initial installations 
sudo apt install 
```

### Install Common Dependencies

```bash
#!/bin/bash

sudo apt update && sudo apt install -y \
    build-essential \
    git \ 
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common \
    git \
    make \
    tig \
    zsh
```

### Setup GPG Key

> Note: exporting already created GPG keys from windows first and then importing to WSL distro's user directory.

If you already have a GPG key, restore it. If you did not have one, you can create one.

#### Export from Windows

- On windows, create a backup of a GPG key
  - `gpg --list-secret-keys`
  - `gpg --export-secret-keys {{KEY_ID}} > private.key`
- Import the key to WSL:
  - `gpg --import /mnt/c/users/<username>/private.key`
- Delete the `private.key`

#### Create a New Key

- `gpg --full-generate-key`

[Read GitHub documentation about generating a new GPG key for more details](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-gpg-key).

### Setup Git

```bash
#!/bin/bash

# Set username and email for next commands
email="<email>"
username="<name>"
gpgkeyid="<gpg key>"

# Configure Git
git config --global user.email "${email}"
git config --global user.name "${username}"
git config --global user.signingkey "${gpgkeyid}"
git config --global commit.gpgsign true
git config --global core.pager /usr/bin/less
git config --global core.excludesfile ~/.gitignore_global
git config --global core.attributesfile ~/.gitattributes_global
git config --global color.ui "auto"
git config --global default.protocol "ssh"
git config --global init.defaultBranch "main"

# Generate a new SSH key
ssh-keygen -t rsa -b 4096 -C "${email}"

# Start ssh-agent and add the key to it
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa

# copy key to clipboard (need xclip)
sudo apt install xclip -y
cat ~/.ssh/id_rsa.pub | xclip -sel clip

# launch github to add ssh key to account
powershell.exe -Command 'start https://github.com/settings/ssh/new'
```

- [Add the generated key to GitHub](https://github.com/settings/ssh/new)

#### My .gitconfig

```bash
[user]
	email = jimmy.briggs@jimbrig.com
	name = Jimmy Briggs
	signingKey = <REDACTED>
	autocrlf = input
[github]
	user = jimbrig
[default]
	protocol = ssh
[gpg]
	program = /usr/bin/gpg
[init]
	defaultBranch = main
[commit]
	gpgSign = true
[tag]
	forceSignAnnotated = true
[core]
	editor = code-insiders --wait --new-window
	excludesfile = ~/.gitignore_global
  	attributesfile = ~/.gitattributes_global
[diff]
	tool = code-insiders
	renames = copies
[difftool "code-insiders"]
	cmd = code-insiders --wait --diff $LOCAL $REMOTE
[merge]
	tool = code-insiders
	log = true
[mergetool "code-insiders"]
	cmd = code-insders --wait $MERGED
	trustexitcode = true
[color]
	ui = auto
[color "branch"]
    	current = yellow reverse
    	local = yellow
    	remote = green
[color "diff"]
    	meta = yellow bold
    	frag = magenta bold
    	old = red bold
    	new = green bold
[color "status"]
    	added = yellow
    	changed = green
    	untracked = cyan
    	branch = magenta
[help]
	autocorrect = 1
[apply]
	whitespace = fix
[rerere]
	enabled = true
[submodule]
	recurse = true
```

#### Link Git Config Files back to Dotfiles

```bash
#!/bin/zsh

# move from home to dotdir (since configured above)
mv ~/.gitconfig ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.gitconfig

# link back
ln -sf ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.gitconfig ~/.gitconfig

# add links for gitignore and gitattributes (global)
ln -sf ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.gitignore_global ~/.gitignore_global
ln -sf ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.gitattributes_global ~/.gitattributes_global

# push
cd ~/dev/wsl-dotfiles
git add ubuntu-commprev/home/jimbrig/**
git commit -m "add updated gitconfig"
git push --set-upstream origin main
```

### Setup Shell with `zsh`

```bash
#!/bin/zsh

# Clone the dotfiles repository
mkdir -p ~/dev/wsl-dotfiles
git clone git@github.com:jimbrig/wsl-dotfiles.git ~/dev/dotfiles

# install zsh
sudo apt -y install zsh

# clone oh-my-zsh
git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

# Install some external plugins:
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting

# Set Zsh as your default shell:
chsh -s /bin/zsh

# (optional) Install Antibody Plugin Manager
curl -sfL git.io/antibody | sudo sh -s - -b /usr/local/bin

# Add plugins to ~/.zsh_plugins.zsh using antibody
antibody bundle < ~/dev/wsl-dotfiles/zsh_plugins > ~/.zsh_plugins.zsh

# Link custom dotfiles
ln -sf ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.aliases.zsh ~/.aliases.zsh
ln -sf ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.p10k.zsh ~/.p10k.zsh
ln -sf ~/dev/wsl-dotfiles/ubuntu-commprev/home/jimbrig/.zshrc ~/.zshrc

# Create .screen folder used by .zshrc
mkdir ~/.screen && chmod 700 ~/.screen

# Change default shell to zsh
chsh -s $(which zsh)
```

### Docker

#### Install Docker Desktop

- [Install Docker Desktop](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
- Make sure that the "Use the WSL 2 based engine" option is checked in Docker Desktop settings

```powershell
sudo cinst -y docker-desktop
```

#### Setup Docker CLI

```zsh
#!/bin/zsh

# Add Docker to sources.list
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
versionCodename=$(cat /etc/os-release | grep VERSION_CODENAME | cut -d= -f2)
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(versionCodename) stable"

# Install tools
sudo apt update && sudo apt install -y \
    docker-ce

# Add user to docker group
sudo usermod -aG docker $USER
```

### Node.js, NPM, and NVM

```zsh
#!/bin/zsh

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | zsh

# install node and npm
nvm install --lts
node --version && npm --version

# Update NPM
npm install -g npm

# Login
npm login

# View stars for reference
npm stars

# install some globals
npm install -g bower create-next-app create-react-app cross-env dbdocs doctoc eslint gulp jshiny npm-check-updates npm-check vercel yarn

# doctor
npm doctor
```

### Github CLI

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key C99B11DEB97541F0
sudo apt-add-repository https://cli.github.com/packages
sudo apt update
sudo apt install gh
```

### Setup Windows Terminal

- [Download and install JetBrains Mono](https://www.jetbrains.com/mono/)
- [Install Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)

```zsh
#!/bin/zsh

windowsUserProfile=/mnt/c/Users/$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')

# Copy Windows Terminal settings
cp ~/dev/dotfiles/terminal-settings.json ${windowsUserProfile}/AppData/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/LocalState/settings.json
```

### WSL Bridge

When a port is listening from WSL 2, it cannot be reached.
You need to create port proxies for each port you want to use.
To avoid doing than manually each time I start my computer, I've made the `wslb` alias that will run the `wsl2bridge.ps1` script in an admin Powershell.

```zsh
#!/bin/zsh

windowsUserProfile=/mnt/c/Users/$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')

# Get the hacky network bridge script
cp ~/dev/dotfiles/wsl2-bridge.ps1 ${windowsUserProfile}/wsl2-bridge.ps1
```

In order to allow `wsl2-bridge.ps1` script to run, you need to update your PowerShell execution policy.

```powershell
# In PowerShell as Administrator

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
PowerShell -File $env:USERPROFILE\\wsl2-bridge.ps1
```

Then, when port forwarding does not work between WSL 2 and Windows, run `wslb` from zsh:

```zsh
#!/bin/zsh

wslb
```

Note: This is a custom alias. See [`.aliases.zsh`](.aliases.zsh) for more details


### Limit WSL 2 RAM consumption

```zsh
#!/bin/zsh

windowsUserProfile=/mnt/c/Users/$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')

# Avoid too much RAM consumption
cp ~/dev/dotfiles/.wslconfig ${windowsUserProfile}/.wslconfig
```

Note: You can adjust the RAM amount in `.wslconfig` file. Personally, I set it to 8 GB.

## WSL Scratch Notes

### Remove

Use `rm -r` to remove directories:

```bash
# remove directory 'dir'
rm -r dir

# remove file 'test'
rm test

# remove empty directories in dir
rm -d dir
```

### Link

Use `ln` to make hardlinks and symlinks:

```bash
# create symlink from windows ~/Dev dir to WSL ~/dev/windev dir
ln -s /mnt/c/users/jimmy/dev ~/dev/windev

# need sudo for default hard links
sudo ln /etc/wsl.conf ~/.dotfiles/etc/wsl.conf
```

### Tar and Unzip

```bash
# unzip via tar
tar xvf <path/to/file.tar.gz>

# install unzip
sudo apt install unzip
```

### DOS vs. UNIX Line  Ending Issues

Unfortunately, the programmers of different operating systems have represented line endings using different sequences:

- All versions of Microsoft Windows represent line endings as CR followed by LF.
- UNIX and UNIX-like operating systems (including Mac OS X) represent line endings as LF alone.

Therefore, a text file prepared in a Windows environment will, when copied to a UNIX-like environment such as WSL, have an unnecessary carriage return character at the end of each line. To make matters worse, this character will normally be invisible, though in some text editors it will show up as ^M or similar.

#### Symptoms

If you run a script initially created on windows with `` line ending support, you will see errors like this in WSL:

- *from `install-homebrew.sh`:*

```bash
ERROR:
./install-homebrew-ubuntu.sh: line 4: $'\r':

ERROR:
./install-homebrew-ubuntu.sh: line 7: $'\r': command not found
./install-homebrew-ubuntu.sh: line 15: $'\r': command not found
./install-homebrew-ubuntu.sh: line 10: $'\r': command not found
./install-homebrew-ubuntu.sh: line 12: $'\r': command not found
./install-homebrew-ubuntu.sh: line 15: $'\r': command not found
./install-homebrew-ubuntu.sh: line 20: $'\r': command not found
/bin/bash: -c: line 856: syntax error: unexpected end of file

./install-homebrew-ubuntu.sh: line 17: $'\r': command not found. Did you mean gcc, gcc@9, gcc@8, gcc@7, gcc@6 or gcc@5?
````

- *from `install-gh-cli.sh`*:

```bash
./install-github-cli.sh: line 2: $'\r': command not found
1.14.0
./install-github-cli.sh: line 4: $'\r': command not found
curl: (3) URL using bad/illegal format or missing URL
./install-github-cli.sh: line 6: $'\r': command not found
tar: gh_1.14.0\r_linux_amd64.tar.gz\r: Cannot open: No such file or directory
tar: Error is not recoverable: exiting now
./install-github-cli.sh: line 8: $'\r': command not found
cp: cannot stat 'gh_1.14.0'$'\r''_linux_amd64/bin/gh': No such file or directory
./install-github-cli.sh: line 10: $'\r': command not found
./install-github-cli.sh: line 11: gh: command not found
./install-github-cli.sh: line 12: $'\r': command not found
cp: cannot stat 'gh_1.14.0'$'\r''_linux_amd64/share/man/man1/*': No such file or directory
./install-github-cli.sh: line 14: $'\r': command not found
```

#### Solution: `dos2unix`

>  Source: [How do I fix "$'\r': command not found" errors running Bash scripts in WSL? - Ask Ubuntu](https://askubuntu.com/questions/966488/how-do-i-fix-r-command-not-found-errors-running-bash-scripts-in-wsl#:~:text=steeldriver is correct that the problem is that,is absent in traditional Unix-style line endings (LF).)

`$'\r': command not found` strongly suggests the issue is that you have used a Windows text editor that has saved your files with DOS-style CRLF line endings - see for example [DOS vs. Unix Line Endings](http://www.cs.toronto.edu/~krueger/csc209h/tut/line-endings.html)

Inside WSL:

```bash
sudo apt-get install dos2unix
```

Then,

```bash
dos2unix [file]
```

Full documentation:

```bash
man dos2unix
```

Here you can see it in action:

![image-20210819020049489](C:\Users\jimmy\AppData\Roaming\Typora\typora-user-images\image-20210819020049489.png)

now try to re-run scripts.

### Permissions

After linking my ssh keys between windows and WSL via: `ln /mnt/c/users/jimmy/.ssh ~/.ssh` I received the error:

```bash
Warning: Permanently added the RSA host key for IP address '140.82.113.3' to the list of known hosts.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0777 for '/home/jimbrig/.ssh/id_ed25519' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "/home/jimbrig/.ssh/id_ed25519": bad permissions
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

Need to change from a symlink to hardlink and/or jsut copy via `cp`:

```bash
rm -r ~/.ssh
cp -r /mnt/c/users/jimmy/.ssh ~/.ssh
```

Then fix permissions via:

```bash
chmod 600 ~/.ssh/id_rsa
```

> What this does is set Read/Write access for the owner, and no access for anyone else. That means that nobody but you can see this key. The way god intended.
>
> *Source  [Sharing SSH keys between Windows and WSL 2 | Windows Command Line (microsoft.com)](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/)*

Now it works: ✔️

![image-20210819023041641](C:\Users\jimmy\AppData\Roaming\Typora\typora-user-images\image-20210819023041641.png)

Fix GPG keys also:

### %PATH%

Warning: /home/linuxbrew/.linuxbrew/bin is not in your PATH.

```bash
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/jimbrig/.profileeval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

## Reference

- [What is Windows Subsystem for Linux | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/about)
- [WSL Command Line Reference | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/reference)
- [sirredbeard/Awesome-WSL: Awesome list dedicated to Windows Subsystem for Linux (github.com)](https://github.com/sirredbeard/Awesome-WSL)
- [AptGet/Howto - Community Help Wiki (ubuntu.com)](https://help.ubuntu.com/community/AptGet/Howto#Maintenance_commands)
- [Get Ubuntu - Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab)
- [Announcing Ubuntu on Windows Community Preview – WSL 2 | Ubuntu](https://ubuntu.com/blog/announcing-ubuntu-on-windows-community-preview-wsl-2)
  - [Get Ubuntu on Windows Community Preview - Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu-on-windows-community-preview/9p9q5zh1hrr0?rtc=1)
