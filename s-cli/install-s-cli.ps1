# install from github
# example: Install-Github "user/repo" "*.exe" "program-name"
# function Install-Github($repo, $pattern, $name) {
#   Save-fromGH $repo $pattern $name
#   $extension = Get-
#   $extension = $pattern.Replace("*", "")
#   $installfile = $name + $extension
#   $installpath = "$env:USERPROFILE\Downloads\" + $installfile
#   Start-Process $installpath
# }

# Install-Github -repo "zquestz/s" -pattern "*windows_amd64.zip" -name "s-cli"

lastversion zquestz/s --format assets --filter "windows_amd64" -d "Downloads/s-cli.zip"

Import-Module Microsoft.PowerShell.Archive
mkdir c:\tools\s-cli
Expand-Archive "$HOME\Downloads\s-cli.zip" -DestinationPath "C:\tools"

if (-not (test-path "C:\bin")) mkdir c:\bin

$subdir = Get-ChildItem "C:\tools"
$exepath = "C:\tools\s-cli\" + $subdir.Name + "\s.exe"
Copy-Item $exepath "c:\bin\"
