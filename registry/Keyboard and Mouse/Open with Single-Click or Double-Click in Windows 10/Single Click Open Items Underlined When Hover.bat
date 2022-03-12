@echo off

:: MajorGeeks.Com
:: How to Change Text Size for Title Bars in Windows 10
:: https://www.majorgeeks.com/content/page/how_to_change_text_size_for_title_bars_in_windows_10.html

REG ADD "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /V IconUnderline /T REG_DWORD /D 2 /F
REG ADD "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" /V ShellState /T REG_BINARY /D 240000001ea8000000000000000000000000000001000000130000000000000062000000 /F

:: To kill and restart explorer
taskkill /f /im explorer.exe
start explorer.exe