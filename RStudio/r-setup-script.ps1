# R Setup Script

# test-installed function
function Test-Installed( $programName ) {
  $x86_check = ((Get-ChildItem "HKLM:Software\Microsoft\Windows\CurrentVersion\Uninstall") |
    Where-Object { $_."Name" -like "*$programName*" } ).Length -gt 0;

  if (Test-Path 'HKLM:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall') {
    $x64_check = ((Get-ChildItem "HKLM:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall") |
      Where-Object { $_."Name" -like "*$programName*" } ).Length -gt 0;
  }
  return $x86_check -or $x64_check;
}

# ensure R, RStudio, and RTools installed
if (!(Test-Installed("R"))) {
  cinst R.Project
}

if (!(Test-Installed("RStudio"))) {
  cinst R.Studio
}

if (!(Test-Installed("RTools"))) {
  cinst rtools
}

# ensure R binaries in system %PATH%
$rpath = "$env:programfiles\R\R-*\bin\x64" | Convert-Path
$regexpath = [regex]::Escape($rpath)
$arrpath = $env:Path -split ';' | Where-Object {$_ -notMatch "^$regexpath\\?"}
$env:Path = ($arrpath + $rpath) -join ';'

$rscriptpath = which rscript
Write-Host "✔️ Found RScript Binary via which rscript: $rscriptpath" -ForegroundColor Green 

# configure R PATHS
Write-Host "Review System Environment Variables for R Session" -ForegroundColor Magenta
RScript -e "Sys.getenv()"

# Environment Variables
# Note on initial setup of R need to manually set location of .Renviron
$userhome = [System.Environment]::GetEnvironmentVariable("USERPROFILE")
$rconfigdir = "$userhome\.config\R"
$renvironpath = "$rconfigdir\.Renviron"
$rprofilepath = "$rconfigdir\.Rprofile"
$rhistpath = "$rconfigdir\.Rhistory"
$rlibspath = "$rconfigdir\lib\4.1"

[System.Environment]::SetEnvironmentVariable("R_HOME", $userhome, "User")
[System.Environment]::SetEnvironmentVariable("R_ENVIRON_USER", $renvironpath, "User")
[System.Environment]::SetEnvironmentVariable("R_PROFILE_USER", $rprofilepath, "User")
[System.Environment]::SetEnvironmentVariable("R_LIBS_USER", $rlibspath, "User")

if (!(Test-Path($rconfigdir))) {
  mkdir $rconfigdir
}

if (!(Test-Path($rlibspath))) {
  mkdir $rlibspath
}

Copy-Item "$env:USERPROFILE\OneDrive\Documents\R\win-library\4.1\*" -Destination "$rlibspath" -Recurse

Copy-Item "~/.dotfiles/R/.Renviron" $renvironpath
Copy-Item "~/.dotfiles/R/.Rprofile" $rprofilepath

Copy-Item "~/.dotfiles/R/lib/installation.R" "$rconfigdir\lib\installation.R"
Copy-Item "~/.dotfiles/R/lib/pkgs.yml" "$rconfigdir\lib\pkgs.yml"

Copy-Item "$env:APPDATA\RStudio\rstudio-prefs.json" "$env:APPDATA\RStudio\rstudio-prefs-default.json"
Copy-Item "~/.dotfiles/RStudio/rstudio-prefs.json" "$env:APPDATA\RStudio\rstudio-prefs.json"

mkdir "$env:APPDATA\RStudio\themes"
Copy-Item "~/.dotfiles/RStudio/themes/*" -Destination "$env:APPDATA\RStudio\themes"

mkdir "$env:APPDATA\RStudio\keybindings"
Copy-Item "~/.dotfiles/RStudio/keybindings/*" -Destination "$env:APPDATA\RStudio\keybindings"

mkdir "$env:APPDATA\RStudio\snippets"
Copy-Item "~/.dotfiles/RStudio/snippets/*" -Destination "$env:APPDATA\RStudio\snippets"

Copy-Item "$env:LOCALAPPDATA\RStudio\rstudio-desktop.json" "$env:LOCALAPPDATA\RStudio\rstudio-desktop-default.json"
Copy-Item "$env:LOCALAPPDATA\RStudio\rstudio-desktop-default.json" "~/.dotfiles/RStudio/localappdata/rstudio-desktop-default.json"
Copy-Item "~/.dotfiles/RStudio/localappdata/rstudio-desktop.json" "$env:LOCALAPPDATA\RStudio\rstudio-desktop.json"






