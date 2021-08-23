#Requires -Version 7
# Current User, Current Host Powershell Core v7 $PROFILE:

# trust PSGallery
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# Set EDITOR
$env:EDITOR = "code-insiders"
$env:PAGER = "more"





