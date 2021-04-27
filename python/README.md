# Python

- Install via `chocolatey`
- Install `pip` (package manger) / check installed with Python
- Check `PATH` environment variables
- Install packages

## Installation

```powershell
cinst python -y
```

- Will install under `C:\Python39`
- User data stored under `%appdata%\python`

## Install `pip`

If installing Python did not add the `pip.exe` to python's `scripts` path, install `pip` using [get-pip/get-pip.py · pypa/get-pip (github.com)](https://github.com/pypa/get-pip/blob/main/get-pip.py):

```powershell
curl -sSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```

Upon execution, `get-pip.py` will install `pip`, `setuptools` and `wheel` in the current Python environment.

It is possible to provide additional arguments to the underlying script. These are passed through to the underlying `pip install` command, and can thus be used to constraint the versions of the packages, or to pass other pip options such as `--no-index`.

```powershell
python get-pip.py "pip < 21.0" "setuptools < 50.0" "wheel < 1.0"
python get-pip.py --no-index --find-links=/local/copies
```

### get-pip.py options

This script also has it's own options, which control which packages it will install.

- `--no-setuptools`: do not attempt to install `setuptools`.
- `--no-wheel`: do not attempt to install `wheel`.

## Packages

As of April 10, 21:

```powershell
PS C:\Users\jimbrig\Dev\jimsdots\python> pip list
Package        Version
-------------- ---------
appdirs        1.4.4
argcomplete    1.12.2
certifi        2020.12.5
chardet        4.0.0
click          7.1.2
colorama       0.4.4
Deprecated     1.2.12
distlib        0.3.1
filelock       3.0.12
future         0.18.2
idna           2.10
Jinja2         2.11.3
joblib         1.0.1
keep           2.10.1 **
livereload     2.6.3 **
lunr           0.5.8
Markdown       3.3.4 **
MarkupSafe     1.1.1
mkdocs         1.1.2 **
nltk           3.6.1
packaging      20.9
pip            21.0.1
pipx           0.16.1.0 **
PyGithub       1.54.1 **
PyJWT          1.7.1
pyparsing      2.4.7
PyYAML         5.4.1
regex          2021.4.4
requests       2.25.1
setuptools     56.0.0
six            1.15.0
terminaltables 3.1.0
tornado        6.1
tqdm           4.60.0
urllib3        1.26.4
userpath       1.4.2
virtualenv     20.4.3 **
wheel          0.36.2
wrapt          1.12.1
```

*Note: packages marked with asterisks ** are my most used packages* 

## Package Installation

Run this script or pick what to install and run in terminal:

```powershell
pip install pip pipx virtualenv PyGithub mkdocs keep livereload Markdown
```



## Configure Keep

Restore keep settings from this repo's [keep](../keep/) directory via:

```powershell
# Run keep --help to generate ~/.keep/
keep --help
# Detected fresh installation. Initializing environment in ~/.keep directory

Copy-Item -Path "keep/**" -Destination "~/.keep" -Recurse
```

Then run keep list to check it worked:

```powershell
keep list
```



### Keep Commands - `~/.keep/commands.json`:

These are synced to my [github gist: Backup for keep](https://gist.githubusercontent.com/jimbrig/da88cb0d6ad1ff9037ce4e209728adfa/raw/0ba450e6b4baf9be77bf81faf02131ff8d8f098b/commands.json):

```json
{
  "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))": {
    "desc": "Installs chocolatey",
    "alias": "instchoco"
  },
  "choco feature enable -n allowGlobalConfirmation": {
    "desc": "Enable global confirmation in Chocolatey",
    "alias": ""
  },
  "cinst git -y --package-parameters=\"'/GitAndUnixToolsOnPath /WindowsTerminal'\"": {
    "desc": "Install git via chocolatey with parameters",
    "alias": "instgit"
  },
  "if (!(Verify-Elevated)) { $newProcess = new-object System.Diagnostics.ProcessStartInfo \"PowerShell\"; $newProcess.Arguments = $myInvocation.MyCommand.Definition; $newProcess.Verb = \"runas\"; [System.Diagnostics.Process]::Start($newProcess); exit }": {
    "desc": "Verify Elevated Shell",
    "alias": "isadmin"
  },
  "Get-AppxPackage -allusers | foreach {Add-AppxPackage -register \"$($_.InstallLocation)\\appxmanifest.xml\" -DisableDevelopmentMode}": {
    "desc": "Reset all store apps",
    "alias": "resetwsapps"
  },
  "iwr -useb 'https://raw.githubusercontent.com/scoopinstaller/install/master/install.ps1' | iex": {
    "desc": "install scoop",
    "alias": "instscoop"
  },
  "npm i npm@latest -g": {
    "desc": "update NPM",
    "alias": "updatenpm"
  },
  "iex \"& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI\"": {
    "desc": "update powershell to latest",
    "alias": "updatepwsh"
  },
  "dism /online /get-drivers /format:table > c:\\drivers.txt": {
    "desc": "Get list of all drivers and save to text file.",
    "alias": "getdrivers"
  },
  "sudo cleanmgr.exe": {
    "desc": "Admin disk cleanup",
    "alias": "cleandsk"
  },
  "gcloud components update": {
    "desc": "Update GCloud Componenets",
    "alias": "updategcloud"
  },
  "dir env:": {
    "desc": "Display all environment variables",
    "alias": "envvars"
  },
  "Get-WindowsCapability -Online | Where-Object { $_.State -eq 'Installed' }": {
    "desc": "Get All Installed Optional Features on Windows Machine.",
    "alias": "getfeatures"
  },
  "docker context create aci acr --location \"eastus\" --resource-group \"shinyapps\" --subscription-id \"14979b2f-bf56-4e0a-8a2e-1069ae5e79b9\"": {
    "desc": "Setup Docker Context for Azure Container Registry",
    "alias": "setupdockeracr"
  },
  "explorer.exe shell:AppsFolder": {
    "desc": "Open all apps shell folder in explorer.",
    "alias": "allapps"
  },
  "sfc /scannow": {
    "desc": "sfc scannow",
    "alias": "sfc"
  },
  "chkdsk C: /f /r /x": {
    "desc": "checkdisk",
    "alias": "checkdisk"
  },
  "wsreset.exe": {
    "desc": "Reset Windows Store",
    "alias": "resetstore"
  },
  "docker login docker.pkg.github.com": {
    "desc": "Login to GitHub Container Registry via Docker ",
    "alias": "dockergh"
  },
  "python -m pip install --upgrade pip": {
    "desc": "Update PIP",
    "alias": "updatepip"
  },
  "Get-AppxPackage -PackageTypeFilter Main | ? { $_.SignatureKind -eq \"System\" } | Sort Name | Format-Table Name, InstallLocation": {
    "desc": "System apps are integral to the operating system. You can list all system apps with this PowerShell command.",
    "alias": "getsysapps"
  },
  "Get-AppxProvisionedPackage -Online | Format-Table DisplayName, PackageName": {
    "desc": "Get all provisioned apps; Provisioned: Installed in user account the first time you sign in with a new user account.",
    "alias": "getappx-provisioned"
  },
  "cat \"GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}\"": {
    "desc": "print godmode",
    "alias": "godmode"
  },
  "Get-AppxPackage -AllUsers *paint* | Reset-AppxPackage": {
    "desc": "Reset MSPaint",
    "alias": "resetpaint"
  },
  "psql postgres://postgres:2G8qkzEFpPOqw06N@34.93.37.61:5432/powwater": {
    "desc": "Connect to POWWATER development localhost database.",
    "alias": "powdb"
  },
  "pip3 --no-cache-dir install -U keep==2.10.1": {
    "desc": "Update keep",
    "alias": "updatekeep"
  },
  "github-gists jimbrig -t e1ecc70eb6ce625a2ca4c3ddaa05e62bef394e9e >> \"2020-02-23-GH-Gists.md\"": {
    "desc": "Download github gists to markdown",
    "alias": "getgists"
  },
  "winSAT formal -restart": {
    "desc": "Run 'winSAT' diagnostics",
    "alias": "winsat"
  },
  "wmic useraccount get domain,name,sid": {
    "desc": "List User Account Profiles, Domains, and SIDs",
    "alias": "lsusers"
  },
  "\"%ProgramFiles%\\Windows Defender\\MpCmdRun.exe\" -Scan -ScanType 1": {
    "desc": "virusscan",
    "alias": "scan"
  },
  "cmd.exe \"%ProgramFiles%\\Windows Defender\\MpCmdRun.exe\" -Scan -ScanType 1": {
    "desc": "virusscan",
    "alias": "scan"
  },
  "winupdatereset": {
    "desc": "Reset Windows Update Components",
    "alias": "resetwinup"
  },
  "net stop bits": {
    "desc": "Stop BITS",
    "alias": "stopbits"
  },
  "net stop wuauserv": {
    "desc": "Stop windows update server",
    "alias": "stop wserv"
  },
  "net stop appidsvc": {
    "desc": "Stop the appidsvc service",
    "alias": "stop appid"
  },
  "net stop cryptsvc": {
    "desc": "Stop cryptographic service",
    "alias": "stopcrypto"
  },
  "Ipconfig /flushdns": {
    "desc": "Flush DNS with ipconfig",
    "alias": "flushdns"
  },
  "del /s /q /f \"%ALLUSERSPROFILE%\\Application Data\\Microsoft\\Network\\Downloader\\qmgr*.dat\" ": {
    "desc": "Delete network data",
    "alias": "delnetqm"
  },
  "del /s /q /f \"%SYSTEMROOT%\\Logs\\WindowsUpdate\\*\"": {
    "desc": "Delete windows update files",
    "alias": "delwinup"
  },
  "Repair-WindowsImage -Online -ScanHealth": {
    "desc": "Scan Windows Image with Powershell cmdlet",
    "alias": "scanwinimg"
  },
  "Dism /Online /Cleanup-Image /ScanHealth": {
    "desc": "Scan Windows Image with CMD DISM",
    "alias": "dismscan"
  },
  "Repair-WindowsImage -Online -RestoreHealth": {
    "desc": "Repair Windows Image with Powershell cmdlet",
    "alias": "repairwinimg"
  },
  "Dism /Online /Cleanup-Image /RestoreHealth": {
    "desc": "DISM online repair image",
    "alias": "dismrepair"
  },
  "Dism.exe /online /Cleanup-Image /StartComponentCleanup": {
    "desc": "DISM component cleanup",
    "alias": "dismcleanup"
  }
}
```

