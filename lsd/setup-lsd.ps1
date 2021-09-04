sudo cinst lsd
if (!(test-path "$env:appdata\lsd")) { New-Item -ItemType Directory "$env:appdata\lsd" }
copy-item config.yaml "$env:APPDATA\lsd" -force
