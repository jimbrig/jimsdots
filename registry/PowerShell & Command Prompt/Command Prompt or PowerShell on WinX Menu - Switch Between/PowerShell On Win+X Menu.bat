:: MajorGeeks.Com
:: https://www.majorgeeks.com/content/page/how_to_switch_between_command_prompt_or_powershell_on_winx_menu.html

REG Add HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced /V DontUsePowerShellOnWinX /T REG_DWORD /D 0 /F

taskkill /f /im explorer.exe

start explorer.exe