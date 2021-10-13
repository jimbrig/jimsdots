# https://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data#w_finding-your-profile-without-opening-firefox

$profilesDir = "$env:APPDATA\Mozilla\Firefox\Profiles\"
$profiles = Get-ChildItem $profilesDir
