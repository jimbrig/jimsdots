@echo off

:: MajorGeeks.Com
:: https://www.majorgeeks.com/content/page/how_to_add_or_remove_cast_to_device_context_menu_in_windows_10.html

REG Delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Shell Extensions\Blocked" /V {7AD84985-87B4-4a16-BE58-8B72A5B390F7} /F

taskkill /f /im explorer.exe
start explorer.exe