# -------------------------
# UUP API Requests
# -------------------------

$baseUrl = "https://api.uupdump.net"
$arch = "amd64"
$ring = "Dev"
$edition = "professional"
$lang = "en-us"

$fetchUrl = $baseUrl + "/fetchupd.php?arch=$arch&ring=$ring&edition=$edition"
$fetchRes = Invoke-RestMethod -Uri $fetchUrl -Method Get | ConvertTo-Json -Depth 100
$updateId = $fetchRes | jq ".response.updateId" | ForEach-Object {$_ -replace '"', ''}

$downloadUrl = "https://api.uupdump.net/get.php?id=" + $updateId + "&lang=$lang&edition=$edition"
$out = "$HOME\Downloads\Win11-Convert.zip"
Invoke-RestMethod -Uri $downloadUrl -OutFile $out
$unzipDir = "$HOME\Downloads\Win11-Convert"
New-Item $unzipDir -ItemType Directory
Expand-Archive -Path $out -OutputPath "$unzipDir" -Force -ShowProgress
