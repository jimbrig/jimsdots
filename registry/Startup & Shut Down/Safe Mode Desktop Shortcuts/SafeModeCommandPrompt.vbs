If WScript.Arguments.length = 0 Then
  Set objShell = CreateObject("Shell.Application")
  objShell.ShellExecute "wscript.exe", Chr(34) & WScript.ScriptFullName & Chr(34) & " Run", , "runas", 1 
Else 
Set objShell2 = WScript.CreateObject("WScript.Shell")
objShell2.Run "bcdedit /set {current} safeboot minimal",0,True
objShell2.Run "bcdedit /set {current} safebootalternateshell yes",0,True
objShell2.Run "shutdown -r -t 0 -f", 0, True
End If 
