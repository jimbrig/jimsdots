:: MajorGeeks.Com
:: How to Reset Quick Settings in Windows 11
:: https://www.majorgeeks.com/content/page/reset_quick_settings.html

REG DELETE "HKCU\Control Panel\Quick Actions" /F

taskkill /f /im explorer.exe

start explorer.exe