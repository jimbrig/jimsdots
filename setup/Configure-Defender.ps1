# Disable RealTime Monitoring
Set-MpPreference -DisableRealtimeMonitoring $true

# Ensure Network set to Private
$ifaceinfo = Get-NetConnectionProfile
Set-NetConnectionProfile -InterfaceIndex $ifaceinfo.InterfaceIndex -NetworkCategory Private

