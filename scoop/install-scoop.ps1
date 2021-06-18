# execution policy
Set-ExecutionPolicy Unrestricted
Set-ExecutionPolicy Unrestricted -scope CurrentUser

# install scoop
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

refreshenv
