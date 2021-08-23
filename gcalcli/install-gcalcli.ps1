Function Test-Installed ( $programname ) {

  $localmachine_x86_check = ((Get-ChildItem "HKLM:Software\Microsoft\Windows\CurrentVersion\Uninstall") | Where-Object { $_.GetValue('DisplayName') -like "*$programName*" } ).Length -gt 0;

  if (Test-Path 'HKLM:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall') {
    $localmachine_x64_check = ((Get-ChildItem "HKLM:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall") | Where-Object { $_.GetValue('DisplayName') -like "*$programName*" } ).Length -gt 0;
  }

  $user_x86_check = ((Get-ChildItem "HKCU:Software\Microsoft\Windows\CurrentVersion\Uninstall") | Where-Object { $_.GetValue('DisplayName') -like "*$programName*" } ).Length -gt 0;

  if (Test-Path 'HKCU:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall') {
    $user_x64_check = ((Get-ChildItem "HKCU:Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall") | Where-Object { $_.GetValue('DisplayName') -like "*$programName*" } ).Length -gt 0;
  }

  $localmachine_check = $localmachine_x86_check -or $localmachine_x64_check;
  $user_check = $user_x86_check -or $user__x64_check;

  return $localmachine_check -or $user_check;

}

# python
if (-not (Test-Installed "python" )) { sudo cinst python3 -y }

# gcalcli
$pkgs = Get-ChildItem "c:\python39\lib\site-packages" -Directory
if (-not ($pkgs.Name.Contains("gcalcli"))) { pip install gcalcli }

# dotfiles
if (-not (test-path("~/.gcalclirc"))) { Copy-Item "~\.dotfiles\gcalcli\.gcalclirc" -destination "~" }
if (-not (test-path("~/.config/gcalcli"))) {
  Copy-Item "~\.dotfiles\gcalcli\gcalcli" -Destination "~\.config" -Recurse
}
