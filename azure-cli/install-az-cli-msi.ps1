# See https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-powershell

$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; Remove-Item .\AzureCLI.msi

# once complete
refreshenv

# login
az login

# to upgrade
# az upgrade
