DISM /Online /Cleanup-Image /StartComponentCleanup
DISM /Online  /Cleanup-Image /AnalyzeComponentStore
DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /RestoreHealth /source:WIM:X:\Sources\Install.wim:1 /LimitAccess
SFC /SCANNOW
