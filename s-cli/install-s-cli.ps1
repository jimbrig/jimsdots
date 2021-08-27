# install from github
# example: Install-Github "user/repo" "*.exe" "program-name"
function Install-Github($repo, $pattern, $name) {
  Save-fromGH $repo $pattern $name
  $extension = Get-
  $extension = $pattern.Replace("*", "")
  $installfile = $name + $extension
  $installpath = "$env:USERPROFILE\Downloads\" + $installfile
  Start-Process $installpath
}

Install-Github -repo "zquestz/s" -pattern "*windows_amd64.zip" -name "s-cli"

Import-Module Microsoft.PowerShell.Archive
mkdir c:\tools\s-cli
Expand-Archive "$HOME\Downloads\s-cliwindows_amd64.zip" -DestinationPath "C:\tools\s-cli"

mkdir c:\bin
Copy-Item "C:\tools\s-cli\s.exe" "c:\bin\*"
