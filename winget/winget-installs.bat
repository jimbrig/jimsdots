@echo off
Echo Installing Powershell Core Preview, Windows Terminal Preview, Microsoft Powertoys, Git for Windows, Git LFS, Git Credential Manager, Gitkraken, and Github-CLI

REM Powershell Core Preview
winget install PowerShell-Preview
if %ERRORLEVEL% EQU 0 Echo Powershell (Core) Preview installed successfully.

REM Windows Terminal Preview
winget install Microsoft.WindowsTerminalPreview
if %ERRORLEVEL% EQU 0 Echo Microsoft Windows Terminal (Preview) installed successfully.

REM Powertoys
winget install Microsoft.Powertoys
if %ERRORLEVEL% EQU 0 Echo Powertoys installed successfully.

REM Git for Windows
winget install Git.Git
if %ERRORLEVEL% EQU 0 Echo Git installed successfully.

REM Git LFS
winget install Github.GitLFS
if %ERRORLEVEL% EQU 0 Echo Git-LFS installed successfully.

REM Git-CredentialManager
winget install Microsoft.GitCredentialManagerCore
if %ERRORLEVEL% EQU 0 Echo GitCredentialManagerCore installed successfully.

REM GH-CLI
winget install Github.CLI
if %ERRORLEVEL% EQU 0 Echo Github-CLI installed successfully.

REM Gitkraken
winget install Axosoft.GitKraken
if %ERRORLEVEL% EQU 0 Echo GitKraken installed successfully.

REM Simplenote
winget install Automattic.Simplenote
if %ERRORLEVEL% EQU 0 Echo Simplenote installed successfully.

%ERRORLEVEL%
