Function Test-Win11Compat {
<#
    .SYNOPSIS
        Windows 11 Compatibility Checker Function
    .DESCRIPTION
        Checks your PC's scpecifications to determine if it is compatible to run Windows 11 OS.
    .LINK
        https://docs.microsoft.com/en-us/windows-hardware/design/minimum/minimum-hardware-requirements-overview
#>

    function getTPM() {
        return (Get-WmiObject -class "Win32_Tpm" -namespace "root\CIMV2\Security\MicrosoftTpm").SpecVersion[0];
    }

    function getMem() {
        $slots = (Get-WmiObject -class "Win32_PhysicalMemoryArray").MemoryDevices[0];
        $totalMem = 0;
        for ($i = 0; $i -lt $slots; $i++) {
            $totalMem += (Get-WmiObject -class "Win32_PhysicalMemory" -namespace "root\CIMV2").Capacity[$i];
        }
        return $totalMem;
    }

    function isUEFI() {
        return $env:firmware_type -eq "UEFI"
    }
    function isSecureBoot() {
        return Confirm-SecureBootUEFI;
    }

    function getCPU() {
        return (Get-WmiObject Win32_Processor).Name
    }

    function checkCPU() {
        if (Test-Path -Path .\yes.txt -PathType Leaf) {
            [string[]]$CPUList = Get-Content -Path .\yes.txt;
        }
        else {
            Invoke-WebRequest -Uri "https://raw.githubusercontent.com/NSG650/cani11/master/yes.txt" -OutFile "yes.txt";
        }
        [string[]]$CPUList = Get-Content -Path .\yes.txt;
        $i = 0;
        $name = getCPU
        while (($name.toLower()).Contains($CPUList[$i].ToLower()) -eq $false) {
            $i++;
        }
        if ($i -lt $CPUList.Count) {
            return $true;
        }
        else {
            return $false;
        }
    }
    function getDiskSpace() {
        $i = 0;
        while ((Get-WmiObject Win32_LogicalDisk).DeviceID[$i] -ne "C:") {
            $i++
        }
        return (Get-WmiObject Win32_LogicalDisk).Size[$i]
    }

    function writeTotal() {
        Write-Host "CPU: $(getCPU)";
        Write-Host "Memory [KB]: $(getMem))";
        Write-Host "Boot: $($env:firmware_type)";
        if (isUEFI) {
            if (isSecureBoot) {
                Write-Host "Secure Boot: Yes"
            }
            else {
                Write-Host "Secure Boot: No"
            }
        }
        if ((Get-Tpm).TpmPresent) {
            Write-Host "TPM present: Yes";
            Write-Host "TPM version: $(getTPM)";
        }
        else {
            Write-Host "TPM present: No";
        }
        Write-Host "C: drive size [KB]: $(getDiskSpace)"
    }

    writeTotal

    if ((getMem) / (1024 * 1024) -gt 4000) {
        if ((Get-Tpm).TpmPresent) {
            if (getTPM -gt 1) {
                if (isUEFI) {
                    if (isSecureBoot) {
                        if (checkCPU) {
                            if ((getDiskSpace / (1024 * 1024 * 1024) -gt 64)) {
                                Write-Host "The system is Windows 11 Compatible"
                            }
                            else {
                                Write-Host "C: to too small"
                            }
                        }
                        else {
                            Write-Host "CPU too old";
                        }
                    }
                    else {
                        Write-Host "Enable secure boot";
                    }
                }
                else {
                    Write-Host "System needs to be UEFI";
                }
            }
            else {
                Write-Host "TPM too old";
            }
        }
        else {
            Write-Host "Install a TPM chip";
        }
    }
    else {
        Write-Host "Install more memory";
    }
}

# function getTPM() {
#     return (Get-WmiObject -class "Win32_Tpm" -namespace "root\CIMV2\Security\MicrosoftTpm").SpecVersion[0];
# }

# function getMem() {
#     $slots = (Get-WmiObject -class "Win32_PhysicalMemoryArray").MemoryDevices[0];
#     $totalMem = 0;
#     for ($i = 0; $i -lt $slots; $i++) {
#         $totalMem += (Get-WmiObject -class "Win32_PhysicalMemory" -namespace "root\CIMV2").Capacity[$i];
#     }
#     return $totalMem;
# }

# function isUEFI() {
#     return $env:firmware_type -eq "UEFI"
# }
# function isSecureBoot() {
#     return Confirm-SecureBootUEFI;
# }

# function getCPU() {
#     return (Get-WmiObject Win32_Processor).Name
# }

# function checkCPU() {
#     if (Test-Path -Path .\yes.txt -PathType Leaf) {
#         [string[]]$CPUList = Get-Content -Path .\yes.txt;
#     }
#     else {
#         Invoke-WebRequest -Uri "https://raw.githubusercontent.com/NSG650/cani11/master/yes.txt" -OutFile "yes.txt";
#     }
#     [string[]]$CPUList = Get-Content -Path .\yes.txt;
#     $i = 0;
#     $name = getCPU
#     while (($name.toLower()).Contains($CPUList[$i].ToLower()) -eq $false) {
#         $i++;
#     }
#     if ($i -lt $CPUList.Count) {
#         return $true;
#     }
#     else {
#         return $false;
#     }
# }
# function getDiskSpace() {
#     $i = 0;
#     while ((Get-WmiObject Win32_LogicalDisk).DeviceID[$i] -ne "C:") {
#         $i++
#     }
#     return (Get-WmiObject Win32_LogicalDisk).Size[$i]
# }
# function cani11() {
#     if ((getMem) / (1024 * 1024) -gt 4000) {
#         if ((Get-Tpm).TpmPresent) {
#             if (getTPM -gt 1) {
#                 if (isUEFI) {
#                     if (isSecureBoot) {
#                         if (checkCPU) {
#                             if ((getDiskSpace / (1024 * 1024 * 1024) -gt 64)) {
#                                 Write-Host "The system is Windows 11 Compatible"
#                             }
#                             else {
#                                 Write-Host "C: to too small"
#                             }
#                         }
#                         else {
#                             Write-Host "CPU too old";
#                         }
#                     }
#                     else {
#                         Write-Host "Enable secure boot";
#                     }
#                 }
#                 else {
#                     Write-Host "System needs to be UEFI";
#                 }
#             }
#             else {
#                 Write-Host "TPM too old";
#             }
#         }
#         else {
#             Write-Host "Install a TPM chip";
#         }
#     }
#     else {
#         Write-Host "Install more memory";
#     }
# }
# function writeTotal() {
#     Write-Host "CPU: $(getCPU)";
#     Write-Host "Memory [KB]: $(getMem))";
#     Write-Host "Boot: $($env:firmware_type)";
#     if (isUEFI) {
#         if (isSecureBoot) {
#             Write-Host "Secure Boot: Yes"
#         }
#         else {
#             Write-Host "Secure Boot: No"
#         }
#     }
#     if ((Get-Tpm).TpmPresent) {
#         Write-Host "TPM present: Yes";
#         Write-Host "TPM version: $(getTPM)";
#     }
#     else {
#         Write-Host "TPM present: No";
#     }
#     Write-Host "C: drive size [KB]: $(getDiskSpace)"
# }

# writeTotal
# cani11
