Write-Host -ForegroundColor Blue "WinGet: Installing Intel CPU driver assistant"
winget install --id Intel.IntelDriverAndSupportAssistant -e

Write-Host -ForegroundColor Blue "WinGet: Installing NVIDIA Geoforce Experience GPU driver assistant"
winget install --id Nvidia.GeoForceExperience -e

Write-Host -ForegroundColor Blue "WinGet: Installing Windows Terminal Preview"
winget install --id Microsoft.WindowsTerminalPreview -e

Write-Host -ForegroundColor Blue "WinGet: Installing Microsoft Visual Studio Code Insiders"
winget isntall --id Microsoft.VisualStudioCode.Insiders -e

Write-Host -ForegroundColor Blue "WinGet: Installing Microsoft PowerToys"
winget install --id Microsoft.PowerToys -e

Write-Host -ForegroundColor Blue "WinGet: Installing Python"
winget install --id Python.Python -e

Write-Host -ForegroundColor Blue "WinGet: Installing GitKraken"
winget install Axosoft.Gitkraken