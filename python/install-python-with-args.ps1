choco install python3 --install-arguments="'/quiet InstallAllUsers=1 PrependPath=1'"
choco install python3 --params "/quiet InstallAllUsers=1 DefaultAllUsersTargetDir=%PROGRAMFILES%\Python39 AssociateFiles=1 Shortcuts=0 Include_exe=1 Include_dev=1 PrependPath=1"
RefreshEnv.cmd
C:\Python39\python.exe -m pip install --upgrade pip
RefreshEnv.cmd
pip install wheel pipx virtualenv lastversion radian keep mkdocs
