# Download ZIP Archive:
lastversion zquestz/s --format assets --filter "windows_amd64" -d "Downloads/s-cli.zip"

# Unzip to C:\tools:
New-Item -ItemType Directory -Path "C:\tools\s-cli" -Force
Expand-Archive "$HOME\Downloads\s-cli.zip" -DestinationPath "C:\tools"

# Add s.exe to C:\bin
if (-not (test-path "C:\bin")) { New-Item -ItemType Directory "C:\bin" }
$subdir = Get-ChildItem "C:\tools"
$exepath = "C:\tools\s-cli\" + $subdir.Name + "\s.exe"
Copy-Item $exepath "c:\bin\"

# Copy config to ~/.config/s
New-Item -ItemType Directory "$HOME\.config\s" -Force
Copy-Item "$HOME\.dotfiles\s-cli\config" -Destination "$HOME\.config\s\"

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
