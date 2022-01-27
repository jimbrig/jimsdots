:: MajorGeeks.Com
:: https://www.majorgeeks.com/content/page/how_to_reset_the_screenshot_index_counter_with_a_batch_file_or_context_menu.html

REG ADD HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer /V ScreenshotIndex /T REG_DWORD /D 1 /F

