# Keep

*See [OrkoHunter/keep (github.com)](https://github.com/OrkoHunter/keep)*

*Keep* is a personalized, *meta CLI toolkit* that stores and manages shell commands and snippets through GitHub gists. Keep is built with Python and therefore is installed with pip:

```powershell
pip install keep
```

To initialize keep run:

```powershell
keep init
```

which will setup the `~/.keep` directory and initialize your backup gist on GitHub.

## Commands

```powershell
~\.dotfiles :: git(main) 
➜ cat keep/.keep/commands.json | jq
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
  },
  "mdsched.exe": {
    "desc": "Windows Memory Diagnostic",
    "alias": "testmemory"
  },
  "reg export HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Applets\\Regedit\\Favorites registry-favorites.reg": {
    "desc": "Export Saved Registry Favorites",
    "alias": "exportregfavs"
  },
  "C:\\ProgramData\\chocolatey\\lib\\cloneapp\\tools\\CloneApp.exe /CB \"C:\\Users\\jimbr\\OneDrive\\2-Areas\\System\\Backup\\CloneApp\"": {
    "desc": "Backup all apps via CloneApp",
    "alias": "cloneapps"
  },
  "curl.exe -A \"MS\" https://webinstall.dev/webi | powershell": {
    "desc": "Install webi a script installer solution",
    "alias": "instwebi"
  },
  "Set-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' -Name 'LongPathsEnabled' -Value 1": {
    "desc": "Enable long path support in registry",
    "alias": "enablelongpaths"
  },
  "cat /mnt/c/users/admin/.docker/github_cr_pat | docker login ghcr.io -u jimbrig --password-stdin": {
    "desc": "Login to GHCR with Docker for WSL/Linux",
    "alias": "ghcrwsl"
  },
  "netsh wlan show wlanreport": {
    "desc": "Create a Network Performance Windows Report",
    "alias": "netreport"
  },
  "cmd.exe /c Cleanmgr /sageset:65535 & Cleanmgr /sagerun:65535": {
    "desc": "Extended Disk Cleanup",
    "alias": "deepclean"
  },
  "netsh wlan show profile name=fossbytes key=clear": {
    "desc": "Wifi Passwords",
    "alias": "wifi-details"
  },
  "Get-CimInstance Win32_WinSat": {
    "desc": "Run WinSAT Diagnostics Score",
    "alias": "winsat"
  },
  "msdt.exe -id DeviceDiagnostic": {
    "desc": "Hardware Diagnostic Troubleshooter",
    "alias": "devicediagnostic"
  },
  "Install-fromURL \"https://wureset.com/files/installers/wureset11009_setup_winx64.exe\" \"ResetWU\"": {
    "desc": "Install windows update reset tool",
    "alias": "install-wureset"
  },
  "start-mpscan -scantype fullscan": {
    "desc": "Start Defender Virus Scan (Full)",
    "alias": "virusscan"
  }
}

```



***

My Keep `commands.json` backup GitHub Gist is located at: <https://gist.github.com/jimbrig/da88cb0d6ad1ff9037ce4e209728adfa>

Note that the Gist's ID is: `da88cb0d6ad1ff9037ce4e209728adfa`.

Note: the [.keep](./.keep) folder is hard-linked to my actual `~/.keep` configuration folder and `.credentials` is encrypted via `git-crypt`.