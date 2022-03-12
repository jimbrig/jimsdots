:: MajorGeeks.Com
:: How to Reset Taskbar Notification Icons in Windows 11
:: https://www.majorgeeks.com/content/page/reset_taskbar_notification_icons_windows_11.html

@echo off

set regPath=HKCU\Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\TrayNotify
set regKey1=IconStreams
set regKey2=PastIconsStream

echo.
echo Please save all open work before continuing as we restart Explorer next.
echo.
pause

echo.
taskkill /IM explorer.exe /F
echo.
FOR /F "tokens=*" %%a in ('Reg Query "%regpath%" /v %regkey1% ^| find /i "%regkey1%"') do goto IconStreams
echo Registry key "IconStreams" already deleted.
echo.

:verify-PastIconsStream
FOR /F "tokens=*" %%a in ('Reg Query "%regpath%" /v %regkey2% ^| find /i "%regkey2%"') do goto PastIconsStream
echo Registry key "PastIconsStream" already deleted.
echo.
goto restart

:IconStreams
reg delete "%regpath%" /f /v "%regkey1%"
goto verify-PastIconsStream

:PastIconsStream
reg delete "%regpath%" /f /v "%regkey2%"

:restart
echo.
echo.
echo You need to restart your PC next.
echo.
CHOICE /C:YN /M "Do you want to restart the PC now?"
IF ERRORLEVEL 2 goto no
IF ERRORLEVEL 1 goto yes

:no
echo.
echo.
echo Restarting explorer. 
echo.
echo Please remember to restart the PC later. Thanks for using MajorGeeks!
echo.
start explorer.exe
pause
exit /B

:yes
shutdown /r /f /t 00