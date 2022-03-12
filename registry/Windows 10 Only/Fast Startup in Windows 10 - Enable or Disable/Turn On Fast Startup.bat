@echo off

:: MajorGeeks.Com
:: https://www.majorgeeks.com/content/page/how_to_turn_fast_startup_on_or_off_in_windows_10.html


:: Enable hibernate
powercfg -h on


:: Turn on Fast Startup
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /V HiberbootEnabled /T REG_dWORD /D 1 /F



