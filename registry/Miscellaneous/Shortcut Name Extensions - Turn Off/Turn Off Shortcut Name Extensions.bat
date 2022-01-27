@echo off

:: MajorGeeks.Com
:: How to Turn Off Shortcut Name Extensions in Windows
:: https://www.majorgeeks.com/content/page/how_to_turn_off_shortcut_name_extensions_in_windows.html

REG ADD "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /V link /T REG_Binary /D 00000000 /F

Reg Delete "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\NamingTemplates" /V ShortcutNameTemplate /F

:: To kill and restart explorer
taskkill /f /im explorer.exe
start explorer.exe