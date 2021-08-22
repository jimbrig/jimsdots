Write-Host "Installing youtube-dl with chocolatey..." -ForegroundColor cyan
sudo choco upgrade youtube-dl

Write-Host "Creating youtube-dl configuration file..." -ForegroundColor cyan
$ytdlconfigfile = "$env:appdata\youtube-dl\config.txt" 
New-Item $ytdlconfigfile -ItemType File -Force
Write-Host "Successfully created youtube-dl config file at: $ytdlconfigfile" -ForegroundColor Green

echo "-o %USERPROFILE%\OneDrive\Videos\YouTube" >> $ytdlconfigfile

Write-Host "Successfully added output location to configuration:`n`" -ForegroundColor Green
Write-Host "Config File Contents:" -ForegrounColor -Cyan
cat $ytdlconfigfile

$answer = Read-Host "❔ Sync configuration with dotfiles (y/n)?"

if (-not($answer -eq "y")) { throw "Done." }

if ($answer -eq "y") {
	New-Item "$HOME\.dotfiles\youtube-dl\config.txt" -ItemType File -Force
	Copy-Item -Path $ytdlconfigfile -Destination "$HOME\.dotfiles\youtube-dl\"
	Remove-Item $ytdlconfigfil
	New-Item -Path $env:APPDATA\youtube-dl\config.txt -ItemType SymbolicLink -Value "$HOME\.dotfiles\youtube-dl\config.yml"
}
