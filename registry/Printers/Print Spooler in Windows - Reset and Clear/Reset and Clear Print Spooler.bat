:: MajorGeeks.Com
:: How to Reset and Clear Print Spooler in Windows
:: https://www.majorgeeks.com/content/page/reset_and_clear_print_spooler.html

@echo off
powershell -windowstyle hidden -command "Start-Process cmd -ArgumentList '/s,/c,net stop spooler & DEL /F /S /Q %systemroot%\System32\spool\PRINTERS\* & net start spooler' -Verb runAs"


