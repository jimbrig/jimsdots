@echo off

:: MajorGeeks.Com
:: Disable or Enable Thumbnail Previews in File Explorer
:: https://www.majorgeeks.com/content/page/how_to_disable_or_enable_thumbnail_previews_in_file_explorer.html

REG ADD "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /V IconsOnly /T REG_DWORD /D 1 /F

taskkill /f /im explorer.exe
start explorer.exe