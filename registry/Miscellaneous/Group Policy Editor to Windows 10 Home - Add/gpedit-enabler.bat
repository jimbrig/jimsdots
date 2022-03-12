@echo off 
@echo "This batch file from MajorGeeks.Com will enable Group Policy Editor (Gpedit.msc) on Windows 10 Home."
@echo "If this method fails, there are other methods to try at https://tinyurl.com/majorgeeksgpedit"
pushd "%~dp0" 

dir /b %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt 
dir /b %SystemRoot%\servicing\Packages\Microsoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt 

for /f %%i in ('findstr /i . List.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i" 
pause