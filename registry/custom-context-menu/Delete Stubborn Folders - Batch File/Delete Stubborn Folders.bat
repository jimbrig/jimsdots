:: MajorGeeks.Com
:: ************************************************************************************
@echo off & mode con cols=20 lines=3 & color 16
(Net session >nul 2>&1)||(PowerShell start """%~0""" -verb RunAs & Exit /B)
::===================================================================================
Echo.&Echo   Select a Folder. 
Call :@ "Select the Folder You Want to Permanently Delete." SourceFolder
:@
Set "@="(new-object -COM 'Shell.Application').BrowseForFolder(0,'%1',0x200,0).self.path""
For /f "usebackq delims=" %%# in (`PowerShell %@%`) do set "Folder_to_be_deleted=%%#"

If "%Folder_to_be_deleted%"=="" (Exit) 
Cls & Title Permanently delete a folder. & mode con cols=70 lines=8 & Echo.
Echo    Are You Sure You Want to Delete the Following Folder Permanently?
Echo.&Echo    "%Folder_to_be_deleted%" & Echo.
echo    Press (D) to Delete the Above Folder Permanently
echo    Press (C) to Cancel the Operation

CHOICE /C "DC" /M "Your Choice?:" >nul 2>&1  
If %errorlevel%==2 (Exit)
::================================================================
For /f "tokens=2 delims==" %%# in ('WMIC OS Get localdatetime /value') Do (Set "T=%%#")
Set "Y=%T:~0,4%" & Set "M=%T:~4,2%" & Set "D=%T:~6,2%"
Set "H=%T:~8,2%" & Set "#=%T:~10,2%" & Set "S=%T:~12,2%"
Set "T=%Y%-%M%-%D%_at_%H%-%#%-%S%"
MD %Temp%\Empty_folder_%T%

(RoboCopy "%Temp%\Empty_folder_%T%" "%Folder_to_be_deleted%" /MIR > Nul)&&(RD "%Folder_to_be_deleted%")||(RD "%Folder_to_be_deleted%")
RD "%Temp%\Empty_folder_%T%" & mode con cols=41 lines=4
If not exist "%Folder_to_be_deleted%" (Echo.&Echo    The folder has been deleted.
Echo    Press a Key to Close This Window.&pause>nul & Exit)
Echo.&Echo    The Operation Has Failed.
Echo    Press a Key to Close This Window.&pause>nul & Exit