mkdir C:\RegBack
reg export HKCR C:\RegBack\HKCR.Reg /y
reg export HKCU C:\RegBack\HKCU.Reg /y
reg export HKLM C:\RegBack\HKLM.Reg /y
reg export HKU C:\RegBack\HKU.Reg /y
reg export HKCC C:\RegBack\HKCC.Reg /y
