Set WshShell = WScript.CreateObject("WScript.Shell")

' There's an optional parameter of the start directory
' By default wt will be started in the same dir
If Wscript.Arguments.Count > 0 Then
   startDir = Wscript.Arguments(0)
Else
   startDir =  (WshShell.CurrentDirectory)
End If

' 0 at the end means to run this command silently
WshShell.Run "powershell -Command ""Start-Process cmd -Verb RunAs -ArgumentList '/c start wt -d \""" & startDir & "\""'"" -WindowStyle Hidden", 0