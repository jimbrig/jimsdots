# admin
$isadmin = (new-object System.Security.Principal.WindowsPrincipal([System.Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole("Administrators")
if (-not ($isadmin)) { throw "Need Admin Priveledges.." }

# executionpolicy
$policy = Get-ExecutionPolicy
if ($policy -eq "Restricted") { Set-ExecutionPolicy Unrestricted; Set-ExecutionPolicy Unrestricted -Scope CurrentUser }

# setup winget
Rename-Item  "$env:LOCALAPPDATA\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\settings.json"  "$env:LOCALAPPDATA\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\settings.json.bak"
Copy-Item "~/.dotfiles/winget/settings.json" "$env:LOCALAPPDATA\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState"

# re-launch powershell
powershell.exe

cd $env:programfiles\python39
python.exe -m pip install --upgrade pip
cd ~
pip install pipx virtualenv radian mkdocs keep

# PowerSoftware.PowerISO
# PowerSoftware.AnyBurn
# ventoy


# check features
winget features

winget --version
winget install Microsoft.WindowsTerminalPreview --source msstore
winget install Microsoft.PowerShell --exact --scope machine
winget install Microsoft.PowerShell.Preview --exact --scope machine

winget install Microsoft.PowerToys

winget install Microsoft.dotnetPreview
winget install Microsoft.dotNetFramework
winget install Microsoft.dotnetRuntime.3-x64
winget install Microsoft.dotnetRuntime.5-x64

winget install Microsoft.EdgeDev
winget install Microsoft.MicrosoftEdgeDevToolsPreview --source msstore
winget install Microsoft.EdgeWebView2Runtime

winget install Git.Git
winget install Github.GitLFS
winget install GitExtensionsTeam.GitExtensions
winget install gnupg.Gpg4win
winget install Axosoft.Gitkraken
winget install Github.cli

winget install Microsoft.VisualStudioCode.Insiders
winget install Microsoft.VisualStudioCode

winget install Typora.Typora
winget install Obsidian.Obsidian

winget install Docker.DockerDesktop

winget install RProject.R
winget install RProject.Rtools
winget install RStudio.RStudio.OpenSource

winget install Python.Python.3
cd $env:programfiles\python39
python.exe -m pip install --upgrade pip
cd ~
pip install pipx virtualenv radian mkdocs keep

winget install Google.CloudSDK
winget install Microsoft.AzureCLI
winget install Heroku.HerokuCLI

winget install PostgreSQL.PostgreSQL
winget isntall PostgreSQL.pgAdmin
winget install dbeaver.dbeaver
winget isntall DBBrowserForSQLite.DBBrowserForSQLite
winget install beekeeper-studio.beekeeper-studio
winget isntall Fabio286.Antares

winget install ArtifexSoftware.Ghostscript
winget install ImageMagick.ImageMagick
winget install Kitware.CMake
winget install JRSoftware.InnoSetup
winget install JohnMacFarlane.Pandoc
winget install egoist.devdocs-desktop
winget install JanDeDobbeleer.OhMyPosh

winget install Hashicorp.Vagrant

winget install 7zip.7zip
winget install CrystalIDEASoftware.UninstallTool
winget install AdrienAllard.FileConverter
winget install OlegDanilov.RapidEnvironmentEditor
winget install HandyOrg.HandyWinget-GUI
winget install JAMSoftware.TreeSizeFree
winget install voidtools.Everything
winget install DigitalVolcanoSoftware.DuplicateCleanerPro

winget install Google.Chrome.Dev
winget install Google.Drive
winget install klinker23.google-calendar-desktop
winget install timche.gmail-desktop

winget install Rufus.Rufus
winget install Ntlitesoft.NTLite
# winget install PowerSoftware.PowerISO
# winget install PowerSoftware.AnyBurn
# winget install ventoy

winget install Doist.Todoist
winget install evernote.evernote
winget install RustemMussabekov.Raindrop
# winget install grammarly.GrammarlyForWindows
# winget install grammarly.Grammarlyforoffice
# winget install Notion.Notion

winget install Intel.IntelDriverAndSupportAssistant

winget install Nvidia.GeForceExperience
winget install Nvidia.CUDA

winget install SteelSeries.GG
winget install SteelSeries.SteelSeriesEngine


$wingetinstalls = "0"

while ($wingetinstalls -ne "y" -and $wingetinstalls -ne "n") {
    $wingetinstalls = Read-Host "Install winget software? (y/n) "
    if ($wingetinstalls -eq "y") {
        foreach ($line in Get-Content $PSSCriptRoot\winget-installs.txt) {
            if ($line.contains("#")) {
                continue
            }
            winget install --id $line -e
        }
    }
}
