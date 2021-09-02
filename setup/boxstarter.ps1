Disable-MicrosoftUpdate
Disable-UAC

# -------------------
# Explorer Settings
# -------------------

Set-WindowsExplorerOptions -EnableShowFileExtensions
Set-WindowsExplorerOptions -EnableShowFullPathInTitleBar
Set-WindowsExplorerOptions -EnableShowProtectedOSFiles
Set-WindowsExplorerOptions -EnableShowRibbon
Set-WindowsExplorerOptions -DisableOpenFileExplorerToQuickAccess

# -------------------
# Taskbar Settings
# -------------------

Set-BoxstarterTaskbarOptions -AlwaysShowIconsOn -MultiMonitorOn -MultiMonitorCombine Always
Set-TaskbarSmall

Write-Host "Hiding Task View button..." -ForegroundColor Yellow
Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" -Name "ShowTaskViewButton" -Type DWord -Value 0




# ------------------
# Enables
# -------------------

# Remote Desktop
Write-Host "Enabling Remote Desktop" -ForegroundColor Yellow
Enable-RemoteDesktop
Set-NetFirewallRule -Name RemoteDesktop-UserMode-In-TCP -Enabled True

# Disables
Disable-GameBarTips
Disable-InternetExplorerESC # Turns off Internet Explorer Enhanced Security Configuration that is on by default on Server OS versions.
Disable-BingSearch # Disables the Bing Internet Search when searching from the search field in the taskbar or Start Menu


Enable-UAC
Enable-MicrosoftUpdate

Install-WindowsUpdate -acceptEula

