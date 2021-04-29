### Custom Functions ###

# Navigational Functions
${function:~} = { Set-Location ~ }
${function:Set-ParentLocation} = { Set-Location .. }; Set-Alias ".." Set-ParentLocation
${function:...} = { Set-Location ..\.. }
${function:....} = { Set-Location ..\..\.. }
${function:.....} = { Set-Location ..\..\..\.. }
${function:......} = { Set-Location ..\..\..\..\.. }

# System Directories
${function:programfiles} = { Set-Location 'C:\Program Files' }
${function:programfiles86} = { Set-Location 'C:\Program Files (x86)' }
${function:programdata} = { Set-Location C:\ProgramData }
${function:windows} = { Set-Location C:\Windows }

# Custom C: Directories
${function:tools} = { Set-Location C:\tools }
${function:env} = { Set-Location C:\env }
${function:setup} = { Set-Location C:\Setup }

# Specific to My User Profile Directories
${function:onedrive} = { Set-Location ~\OneDrive }
${function:desktop} = { Set-Location ~\Desktop }
${function:documents} = { Set-Location ~\Documents }
${function:downloads} = { Set-Location ~\Downloads }

# Important DotFiles and AppData Directories
${function:dotfiles} = { Set-Location ~\.dotfiles }
${function:rdotfiles} = { Set-Location ~\.R }
${function:config} = { Set-Location ~\config }
${function:appdata} = { Set-Location ~\AppData }
${function:localappdata} = { Set-Location ~\Appdata\Local }
${function:appdata} = { Set-Location ~\AppData\Roaming }

# Start Docker:
${function:startdocker} = { start "C:\Program Files\Docker\Docker\Docker Desktop.exe" }

# R
${function:search_gh} = { Rscript -e "search_gh('$args')" }
${function:search_ghr} = { Rscript -e "search_ghr('$args')" }

# Dev Directory
${function:dev} = { Set-Location ~\Dev }
${function:jimbrig} = { Set-Location ~\Dev\jimbrig }
${function:tychobra} = { Set-Location ~\Dev\tychobra }
${function:powwater} = { Set-Location ~\Dev\powwater }
${function:docs} = { Set-Location ~\Dev\docs }
${function:sandbox} = { Set-Location ~\Dev\sandbox }
${function:mycode} = { Set-Location ~\Dev\code } # do not use code here due to `vscode`

# "Open" Functions
${function:openprofile} = { code-insiders $PROFILE }
${function:openprofilefolder} = { & $path = Get-ProDir && Set-Location $path && explorer.exe . }
${function:openaliases} = { & $path = Get-ProDir && Set-Location $path && code-insiders aliases.ps1 }
${function:openfunctions} = { & $path = Get-ProDir && Set-Location $path && code-insiders functions.ps1 }
${function:opendev} = { Set-Location ~\Dev && explorer.exe . }
${function:openpow} = { Set-Location ~\Dev\powwater && explorer.exe . }

# Online Openers
${function:opengh} = { open https://github.com }
${function:openghjim} = { open https://github.com/jimbrig }
${function:openghtych} = { open https://github.com/tychobra }
${function:openghpow} = { open https://github.com/powwater }

# System Utilities and Maintanence
${function:checkdisk} = { & chkdsk C: /f /r /x }
${function:newfile} = { New-Item -Path @args }
${function:System-Update} = { & "C:\env\bin\topgrade.exe" } # NOTE must have topgrade installed and in %PATH%
${function:speedtest} = { & speed-test } # NOTE: must have speedtest installed

# store and appx packages
${function:saveappxpkgs} = { & powerhshell Get-AppXPackage | Out-File -FilePath appx-package-list.txt }
${function:resetstore} = { & wsreset.exe }
${function:resetstorepkgs} = {
  & powershell Get-AppXPackage | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
}

# Cleanup System
${function:cleanup} = {
  Remove-Item c:\Windows\Temp\* -Recurse -Force -ErrorAction SilentlyContinue
  Remove-Item "C:\Users\*\Appdata\Local\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue
  cleanmgr /sagerun:1 | out-Null
}

# Powershell Utilities
${function:updatepowerhell} = { iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI" }
${function:psversion} = { $PSVersionTable }
${function:propath} = { Get-Variable $PROFILE }
${function:prodir} = { Split-Path -Path $PROFILE -Parent }
${function:listaliases} = { Get-Alias }
${function:getpublicip} = {
  $ip = Invoke-RestMethod -Uri 'https://api.ipify.org?format=json'
  "My public IP address is: $($ip.ip)"
} #getpublicip

# Chocolatey
${function:chocopkgs} = { & choco list --local-only }
${function:chococlean} = { & choco-cleaner }
${function:chocoupgrade} = { & choco upgrade all -y }
${function:backupchoco} = { & choco-package-list-backup }
${function:chocosearch} = { & choco search $args }

# Git and Github
${function:gitstatus} = { & git status $args }
${function:ghclone} = { & gh repo clone $args }
${function:ghcloneandopenr} = { & gh repo clone $args }
${function:ghissues} = { & gh issue list -R $PWD }

# Python and PIP
${function:pipupgradeall} = { { & pip freeze | ForEach-Object { $_.split('==')[0] } | ForEach-Object { pip install --upgrade $_ } } }
${function:upgradepip} = { & pip install --upgrade pip }
${function:upgradepip3} = { & pip3 install --upgrade pip3 }

# R Utilities
${function:rvanilla} = { R.exe --vanilla }
${function:openradian} = { & "C:\Users\Admin\AppData\Local\Programs\Python\Python39\Scripts\radian.exe" }
${function:openrproj} = { & C:\env\bat\openrproject.bat }
${function:launchrstudio} = { & "C:\Program Files\RStudio\bin\Rstudio.exe" }
${function:openrsproj} = { .\*.Rproj }

# Open GitKraken in Current Repo
${function:krak} = {
  $curpath = (get-location).ProviderPath
  $lapd = $env:localappdata
  $logf = "$env:temp\krakstart.log"
  $newestExe = Get-Item "$lapd\gitkraken\app-*\gitkraken.exe"
  Select-Object -Last 1
  start-process -filepath $newestExe -ArgumentList "--path $curpath" -redirectstandardoutput $logf
}

### DEPRECATED ###
# ${function:projects} = { Set-Location ~\Projects }
# function bukuu { & buku --suggest }
