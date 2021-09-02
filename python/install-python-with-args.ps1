choco install python3 --params "/InstallDir:'C:\Program Files\Python39'" --install-arguments="'/quiet InstallAllUsers=1 PrependPath=1 TargetDir='C:\Program Files\Python39''" --override-arguments --confirm

cinst vscode-insiders.install --params "/NoDesktopIcon" --install-args "'/DIR='C:\Program Files\Microsoft VS Code Insiders''"

cinst git.install --params="'/NoAutoCrlf /WindowsTerminal /NoShellIntegration"
