@echo off

:: MajorGeeks.Com
:: https://www.majorgeeks.com/content/page/how_to_reset_folder_view_settings_in_windows_10.html

Reg Delete "HKCU\SOFTWARE\Microsoft\Windows\Shell\BagMRU" /F
Reg Delete "HKCU\SOFTWARE\Microsoft\Windows\Shell\Bags" /F

Reg Delete "HKCU\SOFTWARE\Microsoft\Windows\ShellNoRoam\Bags" /F
Reg Delete "HKCU\SOFTWARE\Microsoft\Windows\ShellNoRoam\BagMRU" /F

Reg Delete "HKCU\SOFTWARE\Classes\Local Settings\Software\Microsoft\Windows\Shell\BagMRU" /F
Reg Delete "HKCU\SOFTWARE\Classes\Local Settings\Software\Microsoft\Windows\Shell\Bags" /F

Reg Delete "HKCU\SOFTWARE\Classes\Wow6432Node\Local Settings\Software\Microsoft\Windows\Shell\Bags" /F
Reg Delete "HKCU\SOFTWARE\Classes\Wow6432Node\Local Settings\Software\Microsoft\Windows\Shell\BagMRU" /F

REG Delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Streams\Defaults" /F

Reg Delete "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Modules\GlobalSettings\Sizer" /F

:: To kill and restart explorer
taskkill /f /im explorer.exe
start explorer.exe