$uri = "https://github.com/obsidianmd/obsidian-releases/releases/download/v0.12.4/Obsidian.0.12.4.exe"
$out = "Obsidian.exe"
Invoke-WebRequest -Uri $uri -OutFile $out
.\Obsidian.exe
