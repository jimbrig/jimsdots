# R Setup Script

# ensure R, RStudio, and RTools installed
function Test-Installed( $programName ) {
  $x86_check = ((Get-ChildItem "HKLM:Software\Microsoft\Windows\CurrentVersion\Uninstall") |
    Where-Object { $_."Name" -like "*$programName*" } ).Length -gt 0;

  if (Test-Path 'HKLM:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall') {
    $x64_check = ((Get-ChildItem "HKLM:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall") |
      Where-Object { $_."Name" -like "*$programName*" } ).Length -gt 0;
  }
  return $x86_check -or $x64_check;
}

if (!(Test-Installed("R"))) {
  cinst R.Project
}

if (!(Test-Installed("RStudio"))) {
  cinst R.Studio
}

if (!(Test-Installed("RTools"))) {
  cinst rtools
}

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
$rlibspath = "$rconfigdir\win-library\4.1"

[System.Environment]::SetEnvironmentVariable("R_HOME", $userhome, "User")
[System.Environment]::SetEnvironmentVariable("R_ENVIRON_USER", $renvironpath, "User")
[System.Environment]::SetEnvironmentVariable("R_PROFILE_USER", $rprofilepath, "User")
[System.Environment]::SetEnvironmentVariable("R_LIBS_USER", $rlibspath, "User")

Copy-Item "$env:USERPROFILE\OneDrive\Documents\R\win-library\4.1\*" -Destination "$rlibspath" -Recurse

if (!(Test-Path($rconfigdir))) {
  mkdir $rconfigdir
}

if (!(Test-Path($rlibspath))) {
  mkdir $rlibspath
}

Copy-Item "~/Dev/Github/jimsdots/R/.Renviron" $renvironpath
Copy-Item "~/Dev/Github/jimsdots/R/.Rprofile" $rprofilepath

Copy-Item "~/Dev/Github/jimsdots/R/lib/installation.R" "$rconfigdir\win-library\installation.R"
Copy-Item "~/Dev/Github/jimsdots/R/lib/pkgs.yml" "$rconfigdir\win-library\pkgs.yml"

Copy-Item "$env:APPDATA\RStudio\rstudio-prefs.json" "$env:APPDATA\RStudio\rstudio-prefs-default.json"
Copy-Item "~/Dev/Github/jimsdots/RStudio/rstudio-prefs.json" "$env:APPDATA\RStudio\rstudio-prefs.json"

mkdir "$env:APPDATA\RStudio\themes"
Copy-Item "~/Dev/Github/jimsdots/RStudio/themes/*" -Destination "$env:APPDATA\RStudio\themes"

mkdir "$env:APPDATA\RStudio\keybindings"
Copy-Item "~/Dev/Github/jimsdots/RStudio/keybindings/*" -Destination "$env:APPDATA\RStudio\keybindings"

mkdir "$env:APPDATA\RStudio\snippets"
Copy-Item "~/Dev/Github/jimsdots/RStudio/snippets/*" -Destination "$env:APPDATA\RStudio\snippets"

Copy-Item "$env:LOCALAPPDATA\RStudio\rstudio-desktop.json" "$env:LOCALAPPDATA\RStudio\rstudio-desktop-default.json"
Copy-Item "$env:LOCALAPPDATA\RStudio\rstudio-desktop-default.json" "~/Dev/Github/jimsdots/RStudio/localappdata/rstudio-desktop-default.json"
Copy-Item "~/Dev/Github/jimsdots/RStudio/localappdata/rstudio-desktop.json" "$env:LOCALAPPDATA\RStudio\rstudio-desktop.json"






