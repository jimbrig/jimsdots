# Partition Master
$uri = "https://www.easeus-down.com/temp/EPM_16.0_Trial.exe"
$name = "EaseUS-PartitionMaster-v16.0"

$out = "$env:USERPROFILE\Downloads\$name.exe"
Invoke-WebRequest -Uri $uri -OutFile $out
Start-Process $out

# TDBackup
$uri = "https://www.easeus-down.com/temp/TB_Home_13.0.exe"
$name = "EaseUS-TodoBackup-v13.0"

$out = "$env:USERPROFILE\Downloads\$name.exe"
Invoke-WebRequest -Uri $uri -OutFile $out
Start-Process $out

# PCTrans
$uri = "https://www.easeus-down.com/temp/PCT12.2_Trial_SETUP.exe"
$name = "EaseUS-PCTrans-v12.2"

$out = "$env:USERPROFILE\Downloads\$name.exe"
Invoke-WebRequest -Uri $uri -OutFile $out
Start-Process $out
