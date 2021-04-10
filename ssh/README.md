# SSH Setup and Key Generation

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