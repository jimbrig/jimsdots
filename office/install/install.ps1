#Requires -RunAsAdministrator

Import-Module $PWD\Install-Office365.psm1

Install-Office365 -Branch 365 -Channel InsiderFast -Components Outlook, Word, Excel, PowerPoint

# Copy-Item "$HOME\OneDrive\Backup\Programs\Office\OfficeSetup.exe" -Destination .
# .\OfficeSetup.exe /configure configuration-Office365-x64.xml
