# dot source this script via: . .\install-function-helpers.ps1

# get_download_url
# example: Get-DownloadURL "user/repo" "*.exe"
function Get-DownloadURL($repo, $pattern) {
  $releasesUri = "https://api.github.com/repos/$repo/releases/latest"
  ((Invoke-RestMethod -Method GET -Uri $releasesUri).assets | Where-Object name -like $pattern ).browser_download_url
}

# install from github
# example: Install-Github "user/repo" "*.exe" "program-name"
function Install-Github($repo, $pattern, $name) {
  $uri = get_download_url $repo $pattern
  $out = "$name.exe"
  Invoke-WebRequest -Uri $uri -OutFile "$env:USERPROFILE\Downloads\$out"
  Start-Process $out
}
