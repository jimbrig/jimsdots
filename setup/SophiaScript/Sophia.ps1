Clear-Host
$Host.UI.RawUI.WindowTitle = 'Windows 10 Sophia Script | Copyright farag & oZ-Zo, 2015 to 2021'
Remove-Module -Name Sophia -Force -ErrorAction Ignore
Import-Module -Name $PSScriptRoot\Manifest\Sophia.psd1 -PassThru -Force
Import-LocalizedData -BindingVariable Global:Localization -FileName Sophia -BaseDirectory $PSScriptRoot\Localizations

#region Protection

Checkings
Logging
CreateRestorePoint

#endregion Protection

#region Privacy & Telemetry

DiagTrackService -Enable
DiagnosticDataLevel -Default
ErrorReporting -Enable
WindowsFeedback -Disable
ScheduledTasks -Enable
SigninInfo -Enable
LanguageListAccess -Disable
AdvertisingID -Disable
ShareAcrossDevices -Enable
WindowsTips -Disable
SettingsSuggestedContent -Hide
AppsSilentInstalling -Disable
WhatsNewInWindows -Disable
TailoredExperiences -Disable
BingSearch -Disable

#endregion Privacy & Telemetry

#region UI & Personalization

ThisPC -Show
CheckBoxes -Disable
HiddenItems -Enable
FileExtensions -Show
MergeConflicts -Show
OpenFileExplorerTo -ThisPC
CortanaButton -Hide
OneDriveFileExplorerAd -Hide
TaskViewButton -Show
PeopleTaskbar -Hide
SecondsInSystemClock -Hide
SnapAssist -Disable
FileTransferDialog -Detailed
FileExplorerRibbon -Expanded
RecycleBinDeleteConfirmation -Disable
3DObjects -Hide
QuickAccessFrequentFolders -Hide
QuickAccessRecentFiles -Hide
TaskbarSearch -SearchIcon
WindowsInkWorkspace -Hide
TrayIcons -Hide
MeetNow -Hide
NewsInterests -Hide
ControlPanelView -SmallIcons
WindowsColorScheme -Dark
AppMode -Dark
NewAppInstalledNotification -Show
FirstLogonAnimation -Enable
JPEGWallpapersQuality -Max
TaskManagerWindow -Expanded
RestartNotification -Show
ShortcutsSuffix -Disable
PrtScnSnippingTool -Enable
AppsLanguageSwitch -Disable
UnpinTaskbarShortcuts -Shortcuts Edge, Store, Mail

#endregion UI & Personalization

#region OneDrive

OneDrive -Uninstall

#endregion OneDrive

#region System

StorageSense -Enable
StorageSenseFrequency -Month
StorageSenseTempFiles -Enable
StorageSenseRecycleBin -Enable
Hibernate -Disable
TempFolder -Default
Win32LongPathLimit -Disable
BSoDStopError -Enable
AdminApprovalMode -Enable
MappedDrivesAppElevatedAccess -Enable
DeliveryOptimization -Enable
WaitNetworkStartup -Disable
WindowsManageDefaultPrinter -Disable
WindowsFeatures -Enable
WindowsCapabilities -Install
UpdateMicrosoftProducts -Enable
PowerPlan -High
LatestInstalled.NET -Enable
PCTurnOffDevice -Enable
SetInputMethod -English
SetUserShellFolderLocation -Default
WinPrtScrFolder -Default
RecommendedTroubleshooting -Automatic
FoldersLaunchSeparateProcess -Enable
ReservedStorage -Enable
F1HelpPage -Enable
NumLock -Disable
CapsLock -Disable
StickyShift -Disable
Autoplay -Enable
ThumbnailCacheRemoval -Enable
SaveRestartableApps -Disable
NetworkDiscovery -Enable
SmartActiveHours -Enable
DeviceRestartAfterUpdate -Enable

#endregion System

#region WSL

WSL -Enable
EnableWSL2

#endregion WSL

#region Start menu

RecentlyAddedApps -Show
AppSuggestions -Show
RunPowerShellShortcut -Elevated
PinToStart -UnpinAll

#endregion Start menu

#region UWP apps

CortanaAutostart -Disable
BackgroundUWPApps -Disable
CheckUWPAppsUpdates

#endregion UWP apps

#region Gaming

XboxGameBar -Enable
XboxGameTips -Disable
GPUScheduling -Enable
SetAppGraphicsPerformance

#endregion Gaming

#region Scheduled tasks

CleanupTask -Register
SoftwareDistributionTask -Register
TempTask -Register

#endregion Scheduled tasks

#region Microsoft Defender & Security


#endregion Microsoft Defender & Security

#region Context menu

MSIExtractContext -Add
CABInstallContext -Add
RunAsDifferentUserContext -Remove
CastToDeviceContext -Hide
ShareContext -Show
EditWithPaint3DContext -Hide
EditWithPhotosContext -Hide
CreateANewVideoContext -Hide
ImagesEditContext -Hide
PrintCMDContext -Show
IncludeInLibraryContext -Hide
SendToContext -Show
BitLockerContext -Hide
BitmapImageNewContext -Remove
RichTextDocumentNewContext -Remove
CompressedFolderNewContext -Remove
MultipleInvokeContext -Enable
UseStoreOpenWith -Hide
PreviousVersionsPage -Hide

#endregion Context menu

RefreshEnvironment
Errors