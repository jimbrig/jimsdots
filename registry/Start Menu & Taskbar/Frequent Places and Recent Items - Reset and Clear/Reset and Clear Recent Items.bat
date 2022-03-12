:: MajorGeeks.Com
:: https://www.majorgeeks.com/content/page/how_to_reset_and_clear_frequent_places_and_recent_items_in_windows_10.html


del /F /Q %APPDATA%\Microsoft\Windows\Recent\*

del /F /Q %APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations\*

del /F /Q %APPDATA%\Microsoft\Windows\Recent\CustomDestinations\*

taskkill /f /im explorer.exe

start explorer.exe

