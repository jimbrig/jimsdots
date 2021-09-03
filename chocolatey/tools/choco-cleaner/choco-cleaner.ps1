$ErrorActionPreference = 'Continue'
#Requires -RunAsAdministrator
# Choco-Cleaner.ps1 Copyleft 2017-2021 by Bill Curran AKA BCURRAN3
# LICENSE: GNU GPL v3 - https://www.gnu.org/licenses/gpl.html
# Open a GitHub issue at https://github.com/bcurran3/ChocolateyPackages/issues if you have suggestions for improvement.

Write-Host "Choco-Cleaner.ps1 v0.0.8.4 (05/28/2021) - deletes unnecessary residual Chocolatey files to free up disk space" -Foreground White
Write-Host "Copyleft 2017-2021 Bill Curran (bcurran3@yahoo.com) - free for personal and commercial use`n" -Foreground White

# Verify ChocolateyToolsLocation was created by Get-ToolsLocation during install and is in the environment
if (!($ENV:ChocolateyToolsLocation)) {$ENV:ChocolateyToolsLocation = "$ENV:SystemDrive\tools"}
if (!(Test-Path "$ENV:ChocolateyToolsLocation\BCURRAN3")) {Write-Warning "Configuration not found. Please re-install.";throw}

# Easily edit the config file
if (Test-Path $ENV:ChocolateyInstall\bin\notepad++.exe){
     $Editor="notepad++.exe"
    } else {
      $Editor="notepad.exe"
    }

if ($args -eq "-EditConfig") {
    Write-Host "  ** Editing contents of choco-cleaner.config." -Foreground Magenta
	&$Editor "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.config"
	return
}

# Minor logging
if (Test-Path "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log"){
   $LogSize=(Get-ChildItem -Path "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log").length
   if ($LogSize -gt 10240) {
	   Remove-Item "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log"
	   Write-Output "$(Get-Date) Choco-Cleaner Deleted log file" >> "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log"
	  }
  }
Write-Output "$(Get-Date) Choco-Cleaner STARTED" >> "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log"

# All 7Zip supported formats plus EXE, MSU, MSP, APPX, APPXBUNDLE, IMG - What else is needed?
$BinaryExtensions=@("*.exe","*.img","*.msu","*.msp","*.appx","*.appxbundle","*.7z","*.xz","*.bzip2","*.gzip","*.tar","*.zip","*.wim","*.ar","*.arj","*.cab","*.chm","*.cpio","*.cramfs","*.dmg","*.ext","*.fat","*.gpt","*.hfs","*.ihex","*.iso","*.lzh","*.lzma","*.mbr","*.msi","*.nsis","*.ntfs","*.qcow2","*.rar","*.rpm","*.squashfs","*.udf","*.uefi","*.vdi","*.vhd","*.vmdk","*.xar","*.z","*.dll")

# Import preferences from choco-cleaner.config
[xml]$ConfigFile = Get-Content "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.config"
$DeleteLogs = $ConfigFile.Settings.Preferences.DeleteLogs
$DeleteArchives = $ConfigFile.Settings.Preferences.DeleteArchives
$DeleteFileLogs = $ConfigFile.Settings.Preferences.DeleteFileLogs
$DeleteMSInstallers = $ConfigFile.Settings.Preferences.DeleteMSInstallers
$DeleteIgnoreFiles = $ConfigFile.Settings.Preferences.DeleteIgnoreFiles 
$DeleteReadmes = $ConfigFile.Settings.Preferences.DeleteReadmes
$DeleteOldChoco = $ConfigFile.Settings.Preferences.DeleteOldChoco 
$DeleteConfigBackupFile = $ConfigFile.Settings.Preferences.DeleteConfigBackupFile
$DeleteLibBad = $ConfigFile.Settings.Preferences.DeleteLibBad
$DeleteLibBkp = $ConfigFile.Settings.Preferences.DeleteLibBkp
$Optimizenupkg = $ConfigFile.Settings.Preferences.Optimizenupkg
$DeleteCache = $ConfigFile.Settings.Preferences.DeleteCache
$DeleteLicenseFiles = $ConfigFile.Settings.Preferences.DeleteLicenseFiles
# new configuration items since implementation of XML config in v0.0.3
$DeleteNuGetCache = $ConfigFile.Settings.Preferences.DeleteNuGetCache

# run shim and report if the target program exists or not
function Test-ShimTargetExists {
    param ( [Object][Parameter(Mandatory=$true, ValueFromPipeline=$true)]$ShimFile )

    $TargetExists = & "$ShimFile" "--shimgen-help" |
                     Select-String -pattern "Target Exists: 'True'"
    if (-not $TargetExists) {
       Return $false
    } else {
       Return $true
    }
}

# Import chocolatey.config and get cacheLocation if set
[xml]$ChocoConfigFile = Get-Content "$ENV:ChocolateyInstall\config\chocolatey.config"
$cacheLocation = $ChocoConfigFile.chocolatey.config | % { $_.add } | ? { $_.key -eq 'cacheLocation' } | Select -Expand value

if ($ENV:ChocolateyInstall -match $ENV:SystemDrive -and $ENV:SystemDrive -eq "C:")
    {
     $FreeBefore = Get-PSDrive C | foreach-object {$_.Free}
    }
Write-Host "Choco-Cleaner Summary:" -Foreground Magenta

if (Test-Path $ENV:ChocolateyInstall\bin\_processed.txt){
   Write-Host "  **  Deleting unnecessary Chocolatey _processed.txt (WTF?) file..." -Foreground Green
   Remove-Item -Path $ENV:ChocolateyInstall\bin\_processed.txt
}

if ($DeleteIgnoreFiles -eq "True"){
	 $GotIgnoreFiles=Get-ChildItem -Path $ENV:ChocolateyInstall *.ignore -Recurse
	 $IgnoreFiles=$GotIgnoreFiles.count
	 if ($IgnoreFiles -ge 1){
        Write-Host "  **  Deleting $IgnoreFiles unnecessary Chocolatey .ignore files..." -Foreground Green
        Remove-Item -Path $ENV:ChocolateyInstall -Include *.ignore -Recurse
	   } else {Write-Host "  **  NO unnecessary Chocolatey .ignore files to delete." -Foreground Green}
	}

if ($DeleteOldChoco -eq "True"){
	 $GotOldChoco=Get-ChildItem -Path $ENV:ChocolateyInstall *.old -Recurse
	 $OldChoco=$GotOldChoco.count
	 if ($OldChoco -ge 1){
        Write-Host "  **  Deleting $OldChoco unnecessary Chocolatey .old files..." -Foreground Green
        Remove-Item -Path $ENV:ChocolateyInstall -Include *.old -Recurse
	   } else {
	     Write-Host "  **  NO unnecessary Chocolatey .old files to delete." -Foreground Green
		 }
    }

if ($DeleteCache -eq "True")
    {
# TDL - discover each user profile and delete appropriately within
#$UserDirs=Get-ChildItem -Path C:\Users -Directory -Force -ErrorAction SilentlyContinue | Select-Object FullName
#
#for ($Count = 0; $Count -lt $UserDirs.FullName.Count; $Count++)
#{
# $dir = $userdirs.fullname[$Count]
# $dir = "$dir" + "\appdata\temp\chocolatey"
# Remove-Item $dir -Recurse -Force -ErrorAction SilentlyContinue
#}


	 $GotCacheFiles=ChildItem -Path $ENV:tmp\chocolatey -Recurse
	 $CacheFiles=$GotCacheFiles.count
	 if ($CacheFiles -ge 1){
        Write-Host "  **  Deleting $CacheFiles unnecessary Chocolatey cache files ($ENV:tmp\chocolatey)..." -Foreground Green
        Remove-Item -Path $ENV:tmp\chocolatey -Recurse -Force
	    } else {
		  Write-Host "  **  NO unnecessary Chocolatey cache files ($ENV:tmp\chocolatey) to delete." -Foreground Green
		  }
		
	 $GotCacheFiles=ChildItem -Path $ENV:SystemRoot\temp\chocolatey -Recurse
	 $CacheFiles=$GotCacheFiles.count
	 if ($CacheFiles -ge 1){
        Write-Host "  **  Deleting $CacheFiles unnecessary Chocolatey cache files ($ENV:SystemRoot\temp\chocolatey)..." -Foreground Green
        Remove-Item -Path $ENV:SystemRoot\temp\chocolatey -Recurse -Force
	    } else {
		  Write-Host "  **  NO unnecessary Chocolatey cache files ($ENV:SystemRoot\temp\chocolatey) to delete." -Foreground Green
		  }
		
		
     if ($cacheLocation){
	     if (Test-Path $cacheLocation) {
	        $GotCacheFiles=ChildItem -Path $cacheLocation -Recurse
	        $CacheFiles=$GotCacheFiles.count
	        if ($CacheFiles -ge 1){
               Write-Host "  **  Deleting $CacheFiles unnecessary Chocolatey cache files ($cacheLocation)..." -Foreground Green
		       Remove-Item -Path $cacheLocation -Recurse -Force
		       } else {
			     Write-Host "  **  NO unnecessary Chocolatey cache files ($cacheLocation) to delete." -Foreground Green
				 }
	       }
	    }
	}
	
if ($DeleteNuGetCache -eq "True"){
# TDL - discover each user profile and delete appropriately within
#$UserDirs=Get-ChildItem -Path C:\Users -Directory -Force -ErrorAction SilentlyContinue | Select-Object FullName
#
#for ($Count = 0; $Count -lt $UserDirs.FullName.Count; $Count++)
#{
# $dir = $userdirs.fullname[$Count]
# $dir = "$dir" + "\appdata\Local\Nuget\Cache"
# Remove-Item $dir -Recurse -Force -ErrorAction SilentlyContinue
#}



    if (Test-Path $ENV:USERPROFILE\AppData\Local\NuGet\Cache){
	   $GotNuGetCache=ChildItem -Path $ENV:USERPROFILE\AppData\Local\NuGet\Cache -Recurse
	   $NuGetCache=$GotNuGetCache.count
	   if ($NuGetCache -ge 1){
           Write-Host "  **  Deleting $NuGetCache unnecessary Nuget cache files..." -Foreground Green
		   } else {
		     Write-Host "  **  NO unnecessary Nuget cache files to delete." -Foreground Green
			 }
       Remove-Item -Path $ENV:USERPROFILE\AppData\Local\NuGet\Cache -Recurse -Force
	   }
	}
	
if ($DeleteConfigBackupFile -eq "True"){
    if (Test-Path $ENV:ChocolateyInstall\config\chocolatey.config.backup){
       Write-Host "  **  Deleting unnecessary Chocolatey config backup file..." -Foreground Green
       Remove-Item -Path $ENV:ChocolateyInstall\config\chocolatey.config.backup
	   } else {
	     Write-Host "  **  NO unnecessary Chocolatey config backup file to delete." -Foreground Green
		 }
	}

if ($DeleteLibBad -eq "True"){
    if (Test-Path $ENV:ChocolateyInstall\lib-bad){
	    $GotLibBadFiles=Get-ChildItem -Path $ENV:ChocolateyInstall\lib-bad | ?{ $_.PSIsContainer }
		$LibBadFiles=$GotLibBadFiles.count
	    if ($LibBadFiles -ge 1){
            Write-Host "  **  Deleting $LibBadFiles unnecessary Chocolatey lib-bad package files..." -Foreground Green
			} else {
			  Write-Host "  **  NO unnecessary Chocolatey lib-bad package files to delete." -Foreground Green
			  }
        Remove-Item -Path $ENV:ChocolateyInstall\lib-bad -Recurse -Force
		}
	}

if ($DeleteLibBkp -eq "True"){
    if (Test-Path $ENV:ChocolateyInstall\lib-bkp){
	    $GotLibBkpFiles=Get-ChildItem -Path $ENV:ChocolateyInstall\lib-bkp | ?{ $_.PSIsContainer }
		$LibBkpFiles=$GotLibBkpFiles.count
	    if ($LibBkpFiles -ge 1){
            Write-Host "  **  Deleting $LibBkpFiles unnecessary Chocolatey lib-bkp package files..." -Foreground Green
		    } else {
			  Write-Host "  **  NO unnecessary Chocolatey lib-bkp package files to delete." -Foreground Green
			  }
        Remove-Item -Path $ENV:ChocolateyInstall\lib-bkp -Recurse -Force
	   }
	}

# FUTURE (placeholder)
#if ($DeleteLibSynced -eq "True")
#    {	
#     Write-Host "  **  Deleting unnecessary Chocolatey lib-synced package files..." -Foreground Green
#     Remove-Item -Path $ENV:ChocolateyInstall\lib-synced -Recurse -ErrorAction SilentlyContinue
#	}

# FUTURE (placeholder)
#if ($DeleteDotChocolatey -eq "True")
#    {	
#     Write-Host "  **  Deleting unnecessary Chocolatey .chocolatey files..." -Foreground Green
#     Remove-Item -Path $ENV:ChocolateyInstall\.chocolatey -Recurse -ErrorAction SilentlyContinue
#	}

if ($DeleteFileLogs -eq "True")
    {
     $GotFileLogs=Get-ChildItem -Path $ENV:ChocolateyInstall -Include *.zip.txt,*.exe.txt,*.rar.txt,*.7z.txt,*.gz.txt,*.tar.txt,*.sfx.txt,*.iso.txt -Recurse
	 $FileLogs=$GotFileLogs.count
	 if ($FileLogs -ge 1){
         Write-Host "  **  Deleting $FileLogs unnecessary Chocolatey extracted file logs..." -Foreground Green
         Remove-Item -Path $ENV:ChocolateyInstall -Include *.zip.txt,*.exe.txt,*.rar.txt,*.7z.txt,*.gz.txt,*.tar.txt,*.sfx.txt,*.iso.txt -Recurse
		 } else {
		   Write-Host "  **  NO unnecessary Chocolatey extracted file logs to delete." -Foreground Green
		   }
	}		
	
if ($DeleteLogs -eq "True"){
	 $GotOldLogs=Get-ChildItem -Path $ENV:ChocolateyInstall\logs\*.log -Recurse -Exclude chocolatey.log,choco.summary.log
	 $FileLogs=$GotOldLogs.count
	 if ($FileLogs -ge 1){
        Write-Host "  **  Deleting $FileLogs unnecessary Chocolatey log files..." -Foreground Green
        Remove-Item -Path $ENV:ChocolateyInstall\logs\*.log  -Exclude chocolatey.log,choco.summary.log -Recurse
		} else {
		  Write-Host "  **  NO unnecessary Chocolatey log files to delete." -Foreground Green
		  }
    }
	
if ($DeleteArchives -eq "True"){
	 $GotArchvieFiles=Get-ChildItem -Path $ENV:ChocolateyInstall\lib -Recurse -Include *.zip,*.rar,*.7z,*.gz,*.tar,*.sfx,*.iso,*.img,*.appx,*.appxbundle,*.bzip2,*.gzip,*.tar,*.lzh,*.z
	 $ArchiveFiles=$GotArchvieFiles.count
	 if ($ArchiveFiles -ge 1){
        Write-Host "  **  Deleting $ArchiveFiles unnecessary Chocolatey package embedded archive files in toolsDir..." -Foreground Green
	    Remove-Item -Path $ENV:ChocolateyInstall\lib -Include *.zip,*.rar,*.7z,*.gz,*.tar,*.sfx,*.iso,*.img,*.appx,*.appxbundle,*.bzip2,*.gzip,*.tar,*.lzh,*.z -Recurse
		} else {
		  Write-Host "  **  NO unnecessary Chocolatey package embedded archive files in toolsDir to delete." -Foreground Green
		  }
	}

if ($Optimizenupkg -eq "True"){	
     Write-Host "  **  Deleting unnecessary Chocolatey package embedded archives and executables in .nupkg files..." -Foreground Green
     Get-Childitem $ENV:ChocolateyInstall\lib -Recurse -Include *.nupkg | ForEach-Object {& $ENV:ChocolateyInstall\tools\7z.exe d -r -tZIP $_.FullName $BinaryExtensions} | Out-Null 
	}
	
if ($DeleteLicenseFiles -eq "True"){
	 $GotLicenseFiles=Get-ChildItem -Path $ENV:ChocolateyInstall\* -Recurse -Include license.txt,*.license.txt,verification.txt -Exclude shimgen.license.txt
	 $LicenseFiles=$GotLicenseFiles.count
	 if ($LicenseFiles -ge 1){
        Write-Host "  **  Deleting $LicenseFiles unnecessary Chocolatey package embedded license files..." -Foreground Green
        Remove-Item	-Path $ENV:ChocolateyInstall -Include license.txt,*.license.txt,verification.txt -Exclude shimgen.license.txt -Recurse
		} else {
		  Write-Host "  **  NO unnecessary Chocolatey package embedded license files to delete." -Foreground Green
		  }
	}
	
if ($DeleteMSInstallers -eq "True"){	
	 $GotMSInstallers=Get-ChildItem -Path $ENV:ChocolateyInstall\lib -Recurse -Include *.msi,*.msu,*.msp
	 $MSInstallers=$GotMSInstallers.count
	 if ($MSInstallers -ge 1){
         Write-Host "  **  Deleting $MSInstallers unnecessary Chocolatey package embedded Microsoft installers..." -Foreground Green 
         Remove-Item -Path $ENV:ChocolateyInstall\lib -Include *.msi,*.msu,*.msp -Recurse
		 } else {
		   Write-Host "  **  NO unnecessary Chocolatey package embedded Microsoft installers to delete." -Foreground Green 
		   }
	}
	
if ($DeleteReadmes -eq "True"){
	 $GotReadmes=Get-ChildItem -Path $ENV:ChocolateyInstall\* -Recurse -Include credits.txt,readme.txt,*.md
	 $Readmes=$GotReadmes.count
	 if ($Readmes -ge 1){
         Write-Host "  **  Deleting $Readmes unnecessary Chocolatey package embedded various read me files..." -Foreground Green
         Remove-Item -Path $ENV:ChocolateyInstall\* -Include credits.txt,readme.txt,*.md -Recurse 
		 } else {
		   Write-Host "  **  NO unnecessary Chocolatey package embedded various read me files to delete." -Foreground Green
		   }
	}

$BadShimCount=0
Write-Host "  **  Checking shim files..." -NoNewline -Foreground Green
Get-ChildItem $ENV:ChocolateyInstall\bin\*.exe | % {
    if (-not (Test-ShimTargetExists $PSItem) ) {
	   $BadShimCount = $BadShimCount +1
       Remove-Item "$PSItem" | Out-Null
    }
}
Write-Host "`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b                            `b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b`b" -NoNewLine
if ($BadShimCount) {
	Write-Host "  **  Deleted $BadShimCount unnecessary Chocolatey orphaned shim files." -Foreground Green
	} else {
	Write-Host "  **  NO unnecessary Chocolatey orphaned shim files to delete." -Foreground Green
}


if ($ENV:ChocolateyInstall -Match $ENV:SystemDrive -and $ENV:SystemDrive -eq "C:")
    {
     $FreeAfter  = Get-PSDrive C | ForEach-Object {$_.Free}
	 $FreedSpace = $FreeAfter - $FreeBefore
     $FreedSpace = $FreedSpace / 1KB
	 if ([int]$FreedSpace -lt 0) {$FreedSpace = 0}
	 $FreedSpace = $FreedSpace.ToString('N0')
	 Write-Host Choco-Cleaner finished deleting unnecessary Chocolatey files and reclaimed ~ $FreedSpace KB! -Foreground Magenta
	 Write-Output "$(Get-Date) Choco-Cleaner FINISHED and reclaimed ~ $FreedSpace KB!" >> "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log"
    } else {
	  Write-Host "Choco-Cleaner finished deleting unnecessary Chocolatey files!" -Foreground Magenta
	  Write-Output "$(Get-Date) Choco-Cleaner FINISHED" >> "$ENV:ChocolateyToolsLocation\BCURRAN3\choco-cleaner.log"
	 }
Write-Host "Found Choco-Cleaner.ps1 useful?" -ForegroundColor White
Write-Host "Buy me a beer at https://www.paypal.me/bcurran3donations" -ForegroundColor White
Write-Host "Become a patron at https://www.patreon.com/bcurran3" -ForegroundColor White
Start-Sleep -s 10

# TDL
# Recursively delete Chocolatey and NuGet cache files from all user directories
# Accurately track and report reclaimed space per bullet point and total
# More detailed logging
# Clean C:\ProgramData\chocolatey\lib-synced
# Clean C:\ProgramData\chocolatey\.chocolatey
