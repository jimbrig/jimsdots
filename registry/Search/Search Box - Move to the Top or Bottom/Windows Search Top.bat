@echo off

:: How to Move the Windows 10 Search Box to the Top or Bottom
:: https://www.majorgeeks.com/content/page/how_to_move_the_windows_10_search_box_to_the_top_or_bottom.html

REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Search\Flighting\0\SearchBoxOnTop" /V Value /T REG_DWORD /D 1 /F

REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Search\Flighting\1\SearchBoxOnTop" /V Value /T REG_DWORD /D 1 /F

taskkill /f /im explorer.exe
start explorer.exe
