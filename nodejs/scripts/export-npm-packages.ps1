# https://stackoverflow.com/questions/32628351/export-import-npm-global-packages

Function Backup-NPMPackages($file) {
  "npm install -g " + [string]::join(" ", ((npm ls -g --depth=0) | select -skip 1  | select -skiplast 1  | % { $_.remove(0,4) })) >> $file
}

$backuppath = "$HOME\.dotfiles\nodejs\install-global-npm-packages.ps1"
Backup-NPMPackages $backuppath
