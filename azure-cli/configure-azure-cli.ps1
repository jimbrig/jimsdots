# login to Azure (interactive)
az login

# docker login to container registry
Get-Content ~/.docker/acr_pat | docker login jimscontainerz.azurecr.io --username jimscontainerz --password-stdin

# extensions
az extension list-available --output table
