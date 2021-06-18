choco upgrade git.install --package-parameters="'/GitAndUnixToolsOnPath /WindowsTerminal'"
refreshenv

scoop update

scoop bucket add main
scoop bucket add extras
scoop bucket add scoop-completion https://github.com/Moeologist/scoop-completion

scoop install scoop-completion
scoop install git-crypt

# add to powershell profile:
Import-Module "$($(Get-Item $(Get-Command scoop).Path).Directory.Parent.FullName)\modules\scoop-completion"