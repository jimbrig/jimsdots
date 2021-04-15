:: Created by: Shawn Brink
:: http://www.tenforums.com
:: Tutorial: http://www.tenforums.com/tutorials/5645-icon-cache-rebuild-windows-10-a.html

@echo off
set iconcache=%localappdata%\IconCache.db

echo.
echo The explorer process must be temporarily killed before deleting the IconCache.db file. 
echo.
echo Please SAVE ALL OPEN WORK before continuing.
echo.
pause
echo.
If exist "%iconcache%" goto delete
echo.
echo The IconCache.db file has already been deleted. 
goto restart


:delete
echo.
echo Attempting to delete IconCache.db file...
echo.
ie4uinit.exe -ClearIconCache
taskkill /IM explorer.exe /F 
del "%iconcache%" /A
start explorer.exe
echo.
echo IconCache.db file has been successfully deleted.
goto restart


:restart
echo.
echo.
echo You will need to restart the PC to finish rebuilding your icon cache.
echo.
CHOICE /C:YN /M "Do you want to restart the PC now?"
IF ERRORLEVEL 2 goto no
IF ERRORLEVEL 1 goto yes

:yes
shutdown /r /f /t 00

:no
exit /B