REM Loops through folder which the batch file sits in.
REM Changes all filenames which contain a pattern to a new, desired pattern.
REM Change the extension to that desired. 


@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
 
SET /p "old=Enter the sequence to be replaced : "
SET /p "new=Enter the new sequence : "

for /f "tokens=*" %%f in ('dir /b *.xlsx') do (
  set newname=%%f
  set newname=!newname:%old%=%new%!
  move "%%f" "!newname!"
)