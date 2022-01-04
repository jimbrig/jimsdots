$uri = "https://go.microsoft.com/fwlink/?linkid=2084706&Channel=Canary&language=en"
$out = "EdgeCanary.exe"
Invoke-WebRequest -Uri $uri -OutFile $out
.\EdgeCanary.exe

"Install-EdgeCanary.ps1"Install-EdgeCanary.ps1