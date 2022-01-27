:: MajorGeeks.Com
:: How to Clear The Windows Update History in Windows 10 & 11
:: https://www.majorgeeks.com/files/details/windows_update_history.html

@echo off
powershell -windowstyle hidden -command "Start-Process cmd -ArgumentList '/s,/c,net stop usosvc & net stop wuauserv & del %systemroot%\SoftwareDistribution\DataStore\Logs\edb.log & del /f /q C:\ProgramData\USOPrivate\UpdateStore\* & net start usosvc & net start wuauserv & UsoClient.exe RefreshSettings' -Verb runAs"


