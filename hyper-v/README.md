# Microsoft Hyper-V

>  Hyper-V Dotfiles and Setup Notes

## Contents

- `user.config`

## About

Starting with Windows 10, Microsoft introduced functionality allowing users to implement virtualized environments and computer systems on top of a physical host using Hyper-V virtualization technology.

These virtualized systems can be used and managed just as if they were physical computer systems, however they exist in virtualized and isolated environment. Special software called a hypervisor manages access between the virtual systems and the physical hardware resources. Virtualization enables quick deployment of computer systems, a way to quickly restore systems to a previously known good state, and the ability to migrate systems between physical hosts.

## Installation

To create virtual machines on Windows using Hyper-V, first check your requirements, then enable the Hyper-V optional features:

### Requirements

- Windows 10/11 Enterprise, Pro, or Education
- 64-bit Processor with Second Level Address Translation (SLAT).
- CPU support for VM Monitor Mode Extension (VT-c on Intel CPUs).
- Minimum of 4 GB memory.

The Hyper-V role **cannot** be installed on Windows 10 Home.

Upgrade from Windows 10 Home edition to Windows 10 Pro by opening up **Settings** > **Update and Security** > **Activation**.

For more information and troubleshooting, see [Windows 10 Hyper-V System Requirements](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/reference/hyper-v-requirements).

### Enable Hyper-V Optional Feature(s)

```powershell
#Requires -RunAsAdministrator

# Using DISM PowerShell Module:
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

# DISM Direct Method:
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
```

*If the command couldn't be found, make sure you're running PowerShell as Administrator. When the installation has completed, reboot.*

For more details on DISM, see the [DISM Technical Reference (microsoft.com)](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-8.1-and-8/hh824821(v=win.10)).

## Managing and Creating Virtual Machines

For an overview of the `Hyper-V` modules commands run:

```powershell
Get-Command -Module hyper-v | Out-GridView
```

Here's some useful commands:

```powershell
# Return a List of Current VMs:
Get-VM

# Return a List of Powered On VMs:
Get-VM | where {$_.State -eq "Running"}

# Start a VM
Start-VM -Name <Virtual Machine Name>

# Create Checkpoint:
Get-VM -Name <VM Name> | Checkpoint-VM -SnapshotName <name for snapshot>
```

To Create Virtual Machines utilize the following:

```powershell
#Requires -RunAsAdministrator

$VMName = "VMNAME"

$VM = @{
    Name = $VMName
    MemoryStartupBytes = 2147483648
    Generation = 2
    NewVHDPath = "C:\Virtual Machines\$VMName\$VMName.vhdx"
    NewVHDSizeBytes = 53687091200
    BootDevice = "VHD"
    Path = "C:\Virtual Machines\$VMName"
    SwitchName = (Get-VMSwitch).Name
}

New-VM @VM
```

See [Hyper-V Module | Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/hyper-v/?view=windowsserver2019-ps&viewFallbackFrom=win10-ps).



