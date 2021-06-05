:: Created by: Shawn Brink
:: Created on: March 3rd 2016
:: Tutorial: http://www.tenforums.com/tutorials/42864-file-explorer-quick-access-toolbar-backup-restore-windows-10-a.html

REG EXPORT HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Ribbon "C:\env\backups\qat\quick_access_toolbar_backup.reg"

robocopy %APPDATA%\microsoft\windows\recent\automaticdestinations\ C:\env\backups\qat

