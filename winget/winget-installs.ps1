
$wingetinstalls = "0"

while ($wingetinstalls -ne "y" -and $wingetinstalls -ne "n") {
    $wingetinstalls = Read-Host "Install winget software? (y/n) "
    if ($wingetinstalls -eq "y") {
        foreach ($line in Get-Content $PSSCriptRoot\winget-installs.txt) {
            if ($line.contains("#")) {
                continue
            }
            winget install --id $line -e
        }
    }
}
