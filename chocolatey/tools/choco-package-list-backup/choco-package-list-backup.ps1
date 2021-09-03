$ErrorActionPreference = 'Stop'
# Choco-Package-List-Backup.ps1 Copyleft 2017-2021 by Bill Curran AKA BCURRAN3
# LICENSE: GNU GPL v3 - https://www.gnu.org/licenses/gpl.html
# Open a GitHub issue at https://github.com/bcurran3/ChocolateyPackages/issues if you have suggestions for improvement.

Write-Host "Choco-Package-List-Backup.ps1 v2021.05.10 - backup Chocolatey packages list locally and to the cloud" -Foreground White
Write-Host "Copyleft 2017-2021 Bill Curran (bcurran3@yahoo.com) - free for personal and commercial use`n" -Foreground White
Write-Host "Choco Package List Backup Summary:" -Foreground Magenta

# Verify ChocolateyToolsLocation was created by Get-ToolsLocation during install and is in the environment
if (!($env:ChocolateyToolsLocation)) {$env:ChocolateyToolsLocation = "$env:SystemDrive\tools"}
if (!(Test-Path "$env:ChocolateyToolsLocation\BCURRAN3")) {Write-Warning "Configuration not found. Please re-install.";throw}

$Date           = Get-Date -UFormat %Y-%m-%d
$ErrorArray     = @("this is try","error converted","access to path") #errors caused by Chocolatey not being multi-instance aware (Hopefully in v1.0!)
$ICinstalled    = Test-Path "$env:ChocolateyInstall\lib\instchoco\tools\InstChoco.exe"
$PinnedPackages = choco pin list -r
$PinnedPackagesFile = 'pins.bat'
$PPCinstalled   = Test-Path "$env:ChocolateyInstall\config\persistentpackages.config"
$scriptDir      = "$env:ChocolateyToolsLocation\BCURRAN3"
$ScriptConfig   = 'choco-package-list-backup.config'
$localPackageInfo = & choco list -lo -r -y

if (Test-Path $env:ChocolateyInstall\bin\notepad++.exe){
     $Editor="notepad++.exe"
    } else {
      $Editor="notepad.exe"
    }

if ($args -eq "-EditConfig") {
    Write-Host "  ** Editing contents of choco-package-list-backup.config." -Foreground Magenta
	&$Editor "$env:ChocolateyToolsLocation\BCURRAN3\$ScriptConfig"
	return
}

# Minor logging
if (Test-Path "$env:ChocolateyToolsLocation\BCURRAN3\choco-package-list-backup.log"){
   $LogSize=(Get-ChildItem -Path "$env:ChocolateyToolsLocation\BCURRAN3\choco-package-list-backup.log").length
   if ($LogSize -gt 51200) {
	   Remove-Item "$env:ChocolateyToolsLocation\BCURRAN3\choco-package-list-backup.log"
	   Write-Output "$(Get-Date) Choco-Package-List-Backup Deleted log file" >> "$env:ChocolateyToolsLocation\BCURRAN3\choco-package-list-backup.log"
	  }
  }
Write-Output "$(Get-Date) Choco-Package-List-Backup STARTED" >> "$env:ChocolateyToolsLocation\BCURRAN3\choco-package-list-backup.log"

# Import preferences - see comments in choco-package-list-backup.config for settings 
[xml]$ConfigFile     = Get-Content "$scriptDir\choco-package-list-backup.config"
$PackagesListFile    = $ConfigFile.Settings.Preferences.PackagesListFile
$SaveFolderName      = $ConfigFile.Settings.Preferences.SaveFolderName
$SaveArguments       = $ConfigFile.Settings.Preferences.SaveArguments
$SaveTitleSummary    = $ConfigFile.Settings.Preferences.SaveTitleSummary
$SaveVersions        = $ConfigFile.Settings.Preferences.SaveVersions
$AppendDate          = $ConfigFile.Settings.Preferences.AppendDate
$CustomPath          = $ConfigFile.Settings.Preferences.CustomPath
$CustomPath2         = $ConfigFile.Settings.Preferences.CustomPath2
$SaveAllProgramsList = $ConfigFile.Settings.Preferences.SaveAllProgramsList
$AllProgramsListFile = $ConfigFile.Settings.Preferences.AllProgramsListFile
$DefaultUserProfile  = $ConfigFile.Settings.Preferences.DefaultUserProfile
$PreProcessScript    = $ConfigFile.Settings.Preferences.PreProcessScript
$PostProcessScript   = $ConfigFile.Settings.Preferences.PostProcessScript
$SaveArguments       = $ConfigFile.Settings.Preferences.SaveArguments

$UseCustomPath  = $ConfigFile.Settings.Preferences.UseCustomPath
$UseCustomPath2 = $ConfigFile.Settings.Preferences.UseCustomPath2
$UseDocuments   = $ConfigFile.Settings.Preferences.UseDocuments
$UseHomeShare   = $ConfigFile.Settings.Preferences.UseHomeShare 
$UseBox         = $ConfigFile.Settings.Preferences.UseBox
$UseDropbox     = $ConfigFile.Settings.Preferences.UseDropbox
$UseGoogleDrive = $ConfigFile.Settings.Preferences.UseGoogleDrive
$UseiCloudDrive = $ConfigFile.Settings.Preferences.UseiCloudDrive
$UseNextcloud   = $ConfigFile.Settings.Preferences.UseNextcloud
$UseOneDrive    = $ConfigFile.Settings.Preferences.UseOneDrive
$UseownCloud    = $ConfigFile.Settings.Preferences.UseownCloud
$UseReadyCLOUD  = $ConfigFile.Settings.Preferences.UseReadyCLOUD
$UseResilioSync = $ConfigFile.Settings.Preferences.UseResilioSync
$UseSeafile     = $ConfigFile.Settings.Preferences.UseSeafile
$UseTonidoSync  = $ConfigFile.Settings.Preferences.UseTonidoSync
$UseDefaultUserProfile = $ConfigFile.Settings.Preferences.UseDefaultUserProfile

# Run pre-processor if configured
if (($PreProcessScript) -and ($PreProcessScript -ne "false")) {&$PreProcessScript}

if ($AppendDate -eq "True"){
    if ($PackagesListFile -eq "packages.config"){
		 $PackagesListArchival = "packages_$Date.config"
		} else {
		  $PackagesListArchival = $PackagesListFile+"_$Date.config"
		}
 }
 
if ($SaveAllProgramsList -eq "True") {
    $SaveAllProgramsBody = Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher
}    
 
# When running as SYSTEM (scheduled task) use the $DefaultUserProfile as the default user profile if defined
if (($DefaultUserProfile) -and ($UseDefaultUserProfile -eq "True")) {
	$env:USERPROFILE = "$env:SystemDrive\Users\$DefaultUserProfile"
	$env:APPDATA = "$env:SystemDrive\Users\$DefaultUserProfile\AppData\Roaming"
	}

# functions --------------------------------------------------------------------------------

# Check the path to save packages.config and create if it doesn't exist
Function Check-SaveLocation{
    $CheckPath = Test-Path $SavePath
  If ($CheckPath -Match "False")
     {
      New-Item $SavePath -Type Directory -Force | Out-Null
     }   
    }

# Copy choco-package-list-backup.config to the same location as packages.config
Function Copy-Config{
   Copy-Item "$scriptDir\$ScriptConfig" $SavePath -Force | Out-Null
   Write-Host "  ** $SavePath\$ScriptConfig SAVED!" -Foreground Green 
  }

# Copy persistentpackages.config if it exists to the same location as packages.config
Function Copy-PPConfig{
   Copy-Item $env:ChocolateyInstall\config\persistentpackages.config $SavePath -Force | Out-Null
   Write-Host "  ** $SavePath\persistentpackages.config SAVED!" -Foreground Green 
  }
	
# Copy InstChoco.exe if it exists to the same location as packages.config for super duper easy re-installation
Function Copy-InstChoco{
    $InstChoco = "$env:ChocolateyInstall\lib\instchoco\tools\InstChoco.exe" # location of InstChoco.exe if it exists
    $CheckICDest = Test-Path $SavePath\InstChoco.exe
    If ($CheckICDest -Match "False")
       {
        Copy-Item $InstChoco $SavePath -Force | Out-Null
        Write-Host "  ** $SavePath\InstChoco.exe SAVED!" -Foreground Green 
	   } else {
	     $ICSource = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($InstChoco).FileVersion
	     $ICDest = [System.Diagnostics.FileVersionInfo]::GetVersionInfo("$SavePath\InstChoco.exe").FileVersion
	     if ($ICSource -ne $ICDest)
	        {
	         Copy-Item $InstChoco $SavePath -Force | Out-Null
	         Write-Host "  ** $SavePath\InstChoco.exe COPIED!" -Foreground Green
	        }
	   }
  }

#Un-encrypt .arguments file
Add-Type -AssemblyName System.Security
$entropyBytes = [System.Text.UTF8Encoding]::UTF8.GetBytes("Chocolatey")
Function Unprotect-Arguments {
    param([string]$data)
    $encryptedByteArray = [System.Convert]::FromBase64String($data)
    $decryptedByteArray = [System.Security.Cryptography.ProtectedData]::Unprotect(
        $encryptedByteArray,
        $entropyBytes,
        [System.Security.Cryptography.DataProtectionScope]::LocalMachine
    )
    return [System.Text.UTF8Encoding]::UTF8.GetString($decryptedByteArray)
}

function Read-Arguments {
    param([string]$packageName)
    $directory = Get-ChildItem $env:ChocolateyInstall\.chocolatey -Directory -Filter "$packageName*" | `
        Where-Object { $_.Name -match ("$packageName" + "\.[\d\.]+") } | Select-Object -Last 1
    if (!($directory)) { return }
    $argsFile = Join-Path $directory.fullname ".arguments"
    if (Test-Path $argsFile) {
        $argsData = Get-Content $argsFile
        #Implicitly return result from Unprotect-Arguments
        Unprotect-Arguments -data $argsData
    }
}

# ENHANCEMENT: Below for future release adding extra description info to packages.config
# Import package.nuspec file to get extended package info
function Get-NuspecInfo($PackageName,$NuspecTagRequest){
   $nuspecXML = "$env:ChocolateyInstall\lib\$PackageName\$PackageName.nuspec"
   if (!(Test-Path $nuspecXML)) { return "Unknown" }
   [xml]$nuspecFile = Get-Content $nuspecXML
#   $NuspecAuthors          = $nuspecFile.package.metadata.authors
#   $NuspecBugTrackerURL    = $nuspecFile.package.metadata.bugtrackerurl
#   $NuspecConflicts        = $nuspecFile.package.metadata.conflicts # Built for the future
#   $NuspecCopyright        = $nuspecFile.package.metadata.copyright
#   $NuspecDependencies     = $nuspecFile.package.metadata.dependencies # Not fully implemented yet
#   $NuspecDescription      = $nuspecFile.package.metadata.description
#   $NuspecDocsURL          = $nuspecFile.package.metadata.docsurl
#   $NuspecFiles            = $nuspecFile.package.files.file # Not fully implemented yet
#   $NuspecIconURL          = $nuspecFile.package.metadata.iconurl
#   $NuspecID               = $nuspecFile.package.metadata.id
#   $NuspecLicenseURL       = $nuspecFile.package.metadata.licenseurl
#   $NuspecMailingListURL   = $nuspecFile.package.metadata.mailinglisturl
#   $NuspecOwners           = $nuspecFile.package.metadata.owners
#   $NuspecPackageSourceURL = $nuspecFile.package.metadata.packagesourceurl
#   $NuspecProjectSourceURL = $nuspecFile.package.metadata.projectsourceurl
#   $NuspecProjectURL       = $nuspecFile.package.metadata.projecturl
#   $NuspecProvides         = $nuspecFile.package.metadata.provides # Built for the future
#   $NuspecReleaseNotes     = $nuspecFile.package.metadata.releasenotes
#   $NuspecReplaces         = $nuspecFile.package.metadata.replaces # Built for the future
#   $NuspecRequireLicenseAcceptance = $nuspecFile.package.metadata.requirelicenseacceptance
   $NuspecSummary          = $nuspecFile.package.metadata.summary
#   $NuspecTags             = $nuspecFile.package.metadata.tags
   $NuspecTitle            = $nuspecFile.package.metadata.title
#   $NuspecVersion          = $nuspecFile.package.metadata.version

#   If ($NuspecTagRequest -eq "authors") {return $NuspecAuthors}
#   If ($NuspecTagRequest -eq "bugtrackerurl") {return $NuspecBugTrackerURL}
#   If ($NuspecTagRequest -eq "conflicts") {return $NuspecConflicts}
#   If ($NuspecTagRequest -eq "copyright") {return $NuspecCopyright}
#   If ($NuspecTagRequest -eq "dependencies") {return $NuspecDependencies} # Not fully implemented yet
#   If ($NuspecTagRequest -eq "description") {return $NuspecDescription}
#   If ($NuspecTagRequest -eq "docsurl") {return $NuspecDocsURL}
#   If ($NuspecTagRequest -eq "files") {return $NuspecFiles} # Not fully implemented yet
#   If ($NuspecTagRequest -eq "iconurl") {return $NuspecIconURL}
#   If ($NuspecTagRequest -eq "id") {return $NuspecID}
#   If ($NuspecTagRequest -eq "licenseurl") {return $NuspecLicenseURL}
#   If ($NuspecTagRequest -eq "mailinglisturl") {return $NuspecMailingListURL}
#   If ($NuspecTagRequest -eq "owners") {return $NuspecOwners}
#   If ($NuspecTagRequest -eq "packagesourceurl") {return $NuspecPackageSourceURL}
#   If ($NuspecTagRequest -eq "projectsourceurl") {return $NuspecProjectSourceURL}
#   If ($NuspecTagRequest -eq "projecturl") {return $NuspecProjectURL}
#   If ($NuspecTagRequest -eq "provides") {return $NuspecProvides}
#   If ($NuspecTagRequest -eq "releasenotes") {return $NuspecReleaseNotes}
#   If ($NuspecTagRequest -eq "replaces") {return $NuspecReplaces}
#   If ($NuspecTagRequest -eq "requirelicenseacceptance") {return $NuspecRequireLicenseAcceptance}
   If ($NuspecTagRequest -eq "summary") {return $NuspecSummary}
#   If ($NuspecTagRequest -eq "tags") {return $NuspecTags}
   If ($NuspecTagRequest -eq "title") {return $NuspecTitle}
#   If ($NuspecTagRequest -eq "version") {return $NuspecVersion}
}

# Write out the saved list of ALL installed programs to AllProgramsList.txt
Function Write-AllProgramsList{
    $header="All installed programs list generated by choco-package-list-backup on $Date.`n"
	Write-Output $header $SaveAllProgramsBody | Out-File "$SavePath\$AllProgramsListFile" -Encoding ASCII
	Write-Host "  ** $SavePath\$AllProgramsListFile SAVED!" -Foreground Green
# 2nd copy in format AllProgramsList_date.txt if AppendDate is set to true
	if ($AppendDate -eq "True"){
	    $AllProgramsListFileArchival = $AllProgramsListFile.Replace(".txt","")+"_$Date.txt"
	    Write-Output $header $SaveAllProgramsBody | Out-File "$SavePath\$AllProgramsListFileArchival" -Encoding ASCII
	    Write-Host "  ** $SavePath\$AllProgramsListFileArchival SAVED!" -Foreground Green
	   }
}  

# Write out pins.bat to easily re-pin previously pinned packages
Function Write-PinnedList{
	$header="@echo off`nrem pinned packages found by choco-package-list-backup.ps1 on $Date :`necho   ** Re-pinning previously pinned Chocolatey packages."
	if ($SaveVersions -Match $True){
	    $body=$PinnedPackages | % {"choco pin add -n=$($_.SubString(0, $_.IndexOf("|"))) --version $($_.SubString($_.IndexOf("|") + 1))"}
		} else {
		  $body=$PinnedPackages | % {"choco pin add -n=$($_.SubString(0, $_.IndexOf("|")))"}
		}
	if ($body -Match $ErrorArray[0-3]) {
	    Write-Warning "  ** Another instance of choco.exe was running and corrupted the output. Aborting..."
		throw
		}
	Write-Output $header $body | Out-File "$SavePath\$PinnedPackagesFile" -Encoding ASCII
	Write-Host "  ** $SavePath\$PinnedPackagesFile SAVED!" -Foreground Green
# 2nd copy in format pins_date.bat if AppendDate is set to true
	if ($AppendDate -eq "True"){
	    $PinnedPackagesFile = $PinnedPackagesFile.Replace(".bat","")+"_$Date.bat"
	    Write-Output $header $body | Out-File "$SavePath\$PinnedPackagesFile" -Encoding ASCII
	    Write-Host "  ** $SavePath\$PinnedPackagesFile SAVED!" -Foreground Green
	   }
}
  
# Write out the saved list of packages to packages.config
Function Write-PackagesConfig{
    Check-SaveLocation
	$header="<?xml version=`"1.0`" encoding=`"utf-8`"?>`n<packages>"
	$footer="</packages>"
	if ($body -Match $ErrorArray[0-3]) {
	    Write-Warning "  ** Another instance of choco.exe was running and corrupted the output. Aborting..."
		throw
		}
	Write-Output $header $PackagesConfigBody $footer | Out-File "$SavePath\$PackagesListFile" -Encoding ASCII #ASCII is a subset of UTF8 (w/o BOM)
	Write-Host "  ** $SavePath\$PackagesListFile SAVED!" -Foreground Green
	
# 2nd copy in format packages.config_date.config if AppendDate is set to true	
	if ($AppendDate -eq "True"){
	    Write-Output $header $PackagesConfigBody $footer | Out-File "$SavePath\$PackagesListArchival" -Encoding ASCII #ASCII is a subset of UTF8 (w/o BOM)
		Write-Host "  ** $SavePath\$PackagesListArchival SAVED!" -Foreground Green
		}
    Copy-Config
	if ($PPCinstalled) {Copy-PPConfig}
	if ($SaveAllProgramsList -eq "True"){Write-AllProgramsList}
	if (!$PinnedPackages){Remove-Item "$SavePath\$PinnedPackagesFile" -EA SilentlyContinue | Out-Null }
	if ($PinnedPackages){Write-PinnedList}
	if ($ICinstalled) {Copy-InstChoco}
	Write-Host
}

#Get package.config information.
$PackagesConfigBody = $localPackageInfo | % {
    $packageName = $($_.SubString(0, $_.IndexOf("|")))
    $line = '   <package id="' + $packageName + '" '
    if ($SaveTitleSummary -eq "True") {
        $line = $line + 'title="' + [System.Security.SecurityElement]::Escape($(get-nuspecinfo "$($_.SubString(0, $_.IndexOf("|")))" "title")) + '" '
        $line = $line + 'summary="' + [System.Security.SecurityElement]::Escape($(get-nuspecinfo "$($_.SubString(0, $_.IndexOf("|")))" "summary")) + '" '
    }
    if ($SaveArguments -eq "True") {
        $line = $line + 'arguments="' + [System.Security.SecurityElement]::Escape($(Read-Arguments $packageName)) + '" '
    }
    $line = $line + '/>'
    $line
}


# saves --------------------------------------------------------------------------------

# Backup Chocolatey package names to packages.config file in custom defined path you set as CustomPath in the config file
if ($UseCustomPath -Match "True" -and (Test-Path $CustomPath))
   {
    $SavePath   = "$CustomPath\$SaveFolderName"
    Write-PackagesConfig
   }

# Backup Chocolatey package names to packages.config file in custom defined path you set as CustomPath in the config file
if ($UseCustomPath2 -Match "True" -and (Test-Path $CustomPath2))
   {
    $SavePath   = "$CustomPath2\$SaveFolderName"
    Write-PackagesConfig
   }

# Backup Chocolatey package names on local computer to packages.config file in the Documents folder
if ($env:COMPUTERNAME -eq $env:USERNAME.trim('$')) { $DocumentsFolder = "$env:PUBLIC\Documents" } else { $DocumentsFolder = [Environment]::GetFolderPath("MyDocuments") }
if (($DefaultUserProfile) -and ($UseDefaultUserProfile -eq "True")) { $DocumentsFolder = "$env:USERPROFILE\Documents" }
if ($DocumentsFolder -ne ""){
   if ($UseDocuments -Match "True" -and (Test-Path $DocumentsFolder))
       {
        $SavePath   = "$DocumentsFolder\$SaveFolderName"
        Write-PackagesConfig
       }
   } 
   
# Backup Chocolatey package names on local computer to packages.config file in Box (Sync) directory if it exists
if ($UseBox -Match "True" -and (Test-Path "$env:USERPROFILE\Box Sync"))
   {
    $SavePath = "$env:USERPROFILE\Box Sync\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }    
   
# Check for Dropbox personal and business paths (Thanks ebbek!)
if (Test-Path $env:AppData\Dropbox\info.json)
{
    $DropboxPersonal = ((Get-Content $env:AppData\Dropbox\info.json) -join '`n' | ConvertFrom-json).personal.path
    $DropboxBusiness = ((Get-Content $env:AppData\Dropbox\info.json) -join '`n' | ConvertFrom-json).business.path
}
elseif (Test-Path $env:LocalAppData\Dropbox\info.json)
{
    $DropboxPersonal = ((Get-Content $env:LocalAppData\Dropbox\info.json) -join '`n' | ConvertFrom-json).personal.path
    $DropboxBusiness = ((Get-Content $env:LocalAppData\Dropbox\info.json) -join '`n' | ConvertFrom-json).business.path
}

# Backup Chocolatey package names on local computer to packages.config file in Personal Dropbox directory if it exists
if ($UseDropbox -Match "True" -and ($DropboxPersonal) -and (Test-Path $DropboxPersonal))
   {
    $SavePath = "$DropboxPersonal\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
# Backup Chocolatey package names on local computer to packages.config file in Business Dropbox directory if it exists
if ($UseDropbox -Match "True" -and ($DropboxBusiness) -and (Test-Path $DropboxBusiness))
   {
    $SavePath = "$DropboxBusiness\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
# Backup Chocolatey package names on local computer to packages.config file in Google Drive/Backup and Sync directory if it exists
if ($UseGoogleDrive -Match "True" -and (Test-Path "$env:USERPROFILE\Google Drive"))   
   {
    $SavePath = "$env:USERPROFILE\Google Drive\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
# Backup Chocolatey package names on local computer to packages.config file in Google Drive FS "My Drive" directory if it exists (Thanks ebbek!)
$GFSInstalled=(Test-Path -path HKCU:Software\Google\DriveFS\Share)
if ($GFSInstalled)
   {
    $GoogleFSmountpoint = (Get-ItemProperty -path Registry::HKEY_CURRENT_USER\Software\Google\DriveFS\Share).MountPoint
    if ($UseGoogleDrive -Match "True" -and ($GoogleFSmountpoint) -and (Test-Path "${GoogleFSmountpoint}:\My Drive"))
       {
        $SavePath = "${GoogleFSmountpoint}:\My Drive\$SaveFolderName\$env:COMPUTERNAME"
        Write-PackagesConfig
       }
	}
   
# Backup Chocolatey package names on local computer to packages.config file on your HOMESHARE directory if it exists
# NOTE: Won't work when running as SYSTEM
if ($env:HOMESHARE) {$ExistHomeShare="True"} else {$ExistHomeShare="False"}
if ($UseHomeShare -Match "True" -and $ExistHomeShare -Match "True")   
   {
    $SavePath = "$env:HOMESHARE\$SaveFolderName\$env:COMPUTERNAME"   
    Write-PackagesConfig
   }      

# Backup Chocolatey package names on local computer to packages.config file in iCloudDrive directory if it exists
if ($UseiCloudDrive -Match "True" -and (Test-Path $env:USERPROFILE\iCloudDrive))
   {
    $SavePath = "$env:USERPROFILE\iCloudDrive\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }    
   
# Backup Chocolatey package names on local computer to packages.config file in Nextcloud directory if it exists
if ($UseNextcloud -Match "True" -and (Test-Path $env:USERPROFILE\Nextcloud))
   {
    $SavePath = "$env:USERPROFILE\Nextcloud\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   } 
   
# Backup Chocolatey package names on local computer to packages.config file in various OneDrive directories if they exists
if ($env:OneDrive) {$OneDriveExists="True"} else {$OneDriveExists="False"}
if ($UseOneDrive -Match "True" -and ($OneDriveExists -Match "True"))
   {
    $SavePath = "$env:OneDrive\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
if ($env:OneDriveConsumer) {$OneDriveExists="True"} else {$OneDriveExists="False"}
if ($UseOneDrive -Match "True" -and ($OneDriveExists -Match "True"))
   {
    $SavePath = "$env:OneDriveConsumer\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
if ($env:OneDriveCommercial) {$OneDriveExists="True"} else {$OneDriveExists="False"}
if ($UseOneDrive -Match "True" -and ($OneDriveExists -Match "True"))
   {
    $SavePath = "$env:OneDriveCommercial\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }

# Backup Chocolatey package names on local computer to packages.config file in ownCloud directory if it exists
if ($UseownCloud -Match "True" -and (Test-Path "$env:USERPROFILE\ownCloud"))
   {
    $SavePath = "$env:USERPROFILE\ownCloud\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
# Backup Chocolatey package names on local computer to packages.config file in Netgear ReadyCLOUD directory if it exists
if ($UseReadyCLOUD -Match "True" -and (Test-Path $env:USERPROFILE\ReadyCLOUD))
   {
    $SavePath = "$env:USERPROFILE\ReadyCLOUD\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }

# Backup Chocolatey package names on local computer to packages.config file in Resilio Sync directory if it exists
if ($UseResilioSync -Match "True" -and (Test-Path "$env:USERPROFILE\Resilio Sync"))
   {
    $SavePath = "$env:USERPROFILE\Resilio Sync\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }   

# Backup Chocolatey package names on local computer to packages.config file in Seafile directory if it exists
if ($UseSeafile -Match "True" -and (Test-Path $env:USERPROFILE\Documents\Seafile))
   {
    $SavePath = "$env:USERPROFILE\Seafile\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }
   
# Backup Chocolatey package names on local computer to packages.config file in TonidoSync directory if it exists
if ($UseTonidoSync -Match "True" -and (Test-Path $env:USERPROFILE\Documents\TonidoSync))
   {
    $SavePath = "$env:USERPROFILE\Documents\TonidoSync\$SaveFolderName\$env:COMPUTERNAME"
    Write-PackagesConfig
   }

# Run post-processor if configured
if (($PostProcessScript) -and ($PostProcessScript -ne "false")) {&$PostProcessScript}

# wrap up --------------------------------------------------------------------------------

If ($ICinstalled){
     Write-Host "To re-install your Chocolatey packages: run INSTCHOCO -Y`n" -Foreground Magenta
   } else {
     Write-Host "  ** Consider getting InstChoco - The ULTIMATE Chocolatey and Chocolatey packages (re)installer!`n  ** https://chocolatey.org/packages/InstChoco`n" -Foreground Cyan
     Write-Host "To re-install your Chocolatey packages: run CHOCO INSTALL PACKAGES.CONFIG -Y`n" -Foreground Magenta
   }
Write-Host "Found Choco-Package-List-Backup.ps1 useful?" -Foreground White
Write-Host "Buy me a beer at https://www.paypal.me/bcurran3donations" -Foreground White
Write-Host "Become a patron at https://www.patreon.com/bcurran3" -Foreground White
Write-Output "$(Get-Date) Choco-Package-List-Backup FINISHED" >> "$env:ChocolateyToolsLocation\BCURRAN3\choco-package-list-backup.log"
Start-Sleep -s 10 # Gives time to view before closing when run from Windows Start Menu shortcut
