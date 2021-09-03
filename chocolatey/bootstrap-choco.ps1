$compinfo = Get-ComputerInfo
$compname = $compinfo.CsDNSHostName

if ($compname -eq "DESKTOP-MSI") { choco install -y "$HOME\.dotfiles\chocolatey\backup\MSI\packages.config" }
if ($compname -eq "DESKTOP-LENOVO") { choco install -y "$HOME\.dotfiles\chocolatey\backup\Lenovo\packages.config" }
