$compinfo = Get-ComputerInfo
$compname = $compinfo.CsDNSHostName

if ($compname -eq "DESKTOP-MSI") { $configfile = "C:\Users\jimmy\.dotfiles\chocolatey\tools\choco-package-list-backup\MSI-choco-package-list-backup.config" }
if ($compname -eq "DESKTOP-LENOVO") { $configfile = "C:\Users\jimmy\.dotfiles\chocolatey\tools\choco-package-list-backup\LENOVO-choco-package-list-backup.config" }

New-Item -Path "C:\tools\BCURRAN3\choco-package-list-backup.config" -ItemType SymbolicLink -Value $configfile -Force 

