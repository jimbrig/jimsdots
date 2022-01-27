@echo off

:: MajorGeeks.Com
:: How to Show or Hide Hidden Files, Folders, or Drives
:: https://www.majorgeeks.com/content/page/show_hidden_files_folders_drives.html

REG ADD "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /V Hidden /T REG_DWORD /D 0 /F

taskkill /f /im explorer.exe
start explorer.exe