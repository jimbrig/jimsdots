using System;
using System.Collections.Generic;

#pragma warning disable 1591	//stops XML warning

namespace QTPlugin
{
	/// <summary>
	/// This can be used as the equivalent of ScriptingCommands
	/// http://qttabbar.wikidot.com/scriptingcommands
	/// </summary>
	public enum QCommand
	{
		GoBack,											// int, number of history items to skip. (optional) View.
		GoForward,										// int, number of history items to skip. (optional) View.
		GoBackToFirst,									// (optional) View.
		GoForwardToLast,								// (optional) View.
		NewTab,											// path, string or QCollection. (optional) bool fNoActivate. (optional) View. Returns first tab id if string
		NewWindow,										// path, string or QCollection. Returns Window 
		OpenInPlace,									// path, string. (optional) View.
		BrowseFolder,									// initial path, string	
		BrowseFolderAndOpenNew,							// initial path, string	
		GoUpOneLevel,
		SearchFolder,					//= 10,
		Group,											// name, string or QCollection. (optinal) bool fWindow
		ReplaceByGroup,									// name, string
		SetActiveTab,									// ID or Tab object. returns Tab.
		ActivateTabByIndex,								// index. returns Tab.
		ActivateRecentTab,								// Int view. returns ID.																	//**
		UndoClosedTab,									// returns ID.
		RestoreTabs,									// returns ID of first.
		SwapTabs,										// Bool. false then next otherwise previous
		CloneTab,										// ID or Tab object. returns Tab.
		LockTab,						//= 20,			// ID or Tab object, (optional) bool fUnLock. 
		IsTabLocked,									// ID or Tab object. returns bool. null if failed.
		CloseTab,										// ID or Tab object or null. Returns count of tab.
		CloseAllButOne,									// ID or Tab object or null. Returns bool.
		CloseLeftRight,									// bool, true to close left 
		CloseWindow,
		SetWindowTopmost,								// (optional) bool fNoTopmost
		IsWindowTopmost,								// returns bool.

		Maximize,
		Minimize,
		WindowState,					//= 30			// ExplorerWindowState enumeration
		Restore,
		MinimizeToTasktray,								// (optional) bool fRestore.
		IsWindowInTasktray,								// returns bool.

		MergeAllWindows,
		MaximizeHorizontaly,
		SetWindowTransparency,							// Int, 20 - 255
		SetFocusTo,										// FocusableWindow enumeration.
		ShowToolbar,									// Toolbar enumeration, Bool, fShow.
		ShrinkToolbar,									// Toolbar enumeration
		ExpandToolbar,					// 40			// Toolbar enumeration
		IsToolbarVisible,								// Toolbar enumeration, returns bool.
		ToggleTabBarUpDown,								// returns bool, whether top tabbar is being available.
		GetWindowText,									// returns string.
		GetCurrentPath,									// returns string. Ignores view. This returns default view path.
		GetTabText,										// ID or Tab object. returns string.
		GetTabPath,										// ID or Tab object. returns string.
		CreateGroup,									// String path or QCollection. ( Dialog if null), String name (display name if null ). Returns name.
		CreateGroupFromTab,								// ID or Tab object. String name(display name if null ). Bool fAddAll. Returns name.
		CreateApplicationLauncher,						// QCollection. name, path, arg, work. Bool fOverwrite.
		GetApplicationLauncher,			// 50			// String name, returns QCollection. empty if fail.
		LaunchApplication,								// Str, path from app root
		DeleteApplicationLauncher,						// Str, path from app root
		CreateLibrary,									// String path or QCollection. String name(dialog if null). True to overwrite. Returns name.
		CreateLibraryFromTab,							// ID or Tab. String name(dialog if null). Bool fAddAll. Returns name.
		Search,											// Str. search string 
		Filter,											// Str
		GetClipboard,									// return Str
		SetClipboard,									// Str
		SetClipboardSelectionPaths,
		SetClipboardSelectionNames,		// 60
		SetClipboardCurrentPath,
		SetClipboardCurrentName,
		SetClipboardSelectionHashes,
		SetClipboardAllTabPaths,						// View, all view if none.
		// file, folder, view
		CopyToTab,										// ID or Tab object. -1 or null to show browserdialog. 
		MoveToTab,										// ID or Tab object
		CreateLinkInTab,								// ID or Tab object
		CopyFromFolder,									// ID or Tab object to specify initial folder. 
		MoveFromFolder,									// ID or Tab object to specify initial folder. 
		LinkFromFolder,					// 70			// ID or Tab object to specify initial folder. 
		CreateNewFolder,								// Str, name(optional). Bool, create and open as tab. returns id. otherwise Path.
		CreateNewFile,									// Str, name(optional). returns path.
		ShowProperties,									// path string or ID or Tab object. null for current folder. 
		DeleteSelectedFiles,							// Bool, Nuke
		RenameTab,										// ID or Tab object, Str name (optional )
		DeleteTab,										// ID or Tab object.  Bool Nuke
		ClipboardTab,									// ID or Tab. Bool Cut
		ComputeFileHash,								// Str, path. Int, hash type.
		Run,											// QCollection(path, arg, work)(last 2 is optional), (optional) nShow, (optional) fWait
		GetCurrentView,					// 80			// returns view
		SetCurrentView,									// QFolderViewMode enumeration. Executed as ExplorerMenuCommands.
		Export,											// Str, path. null then prompt
		Import,											// Str, path to xml file to import. null then prompt
		Option,											// Int, page of option.
		Rename,											// from Str fullpath to Str new name. (optional) ScriptingFileOperations value. Return new name.
		SelectFromCursor,								// Bool, Select Above the cursor if true
		Evaluate,										// Evaluates an arguments and returns the first non null value. 
		EvaluateAll,									// Evaluates all arguments. Retuns the last command return value.
		Condition,										// if arg1 is evaluated as true then evaluate arg2, otherwise evaluate arg3.
		Negative,						// 90			// Does nothing if in script. Returns true if arg1 is evaluated as false, vice versa.
		GetData,										// Int slot.
		SetData,										// Object data, Int Slot. Returns object.
		Alert,											// Str
		MessageBox,										// 1Str text, (optional)2 buttons, (optional)3icon. Returns Int.(DialogResult) 
		InputBox,										// 1Str text. (optional)2 defaultText. (optional)3Bool, fPassword. Returns typed text.
		PlaySound,										// Str, path to wav file. or SystemSound enumeration.
		RefreshIconCache,
		RefreshFolderSettings,
		SetHiddenFileVisible,							// Bool, visible.
		SetSuperHiddenFileVisible,		// 100			// Bool, visible.
		IsHiddenFileVisible,							// Returns bool.
		IsSuperHiddenFileVisible,						// Returns bool.	
		Sort,											// arg1 (Str, canonical name or display name of column. or int index of column.) arg2(Int, -1 descendent, 0 toggle, 1 ascendent. )
		NoOp,
		SaveDesktopIconPos,								// arg1, optional, path string to xml file 
		LoadDesktopIconPos,								// arg1, optional, path string to xml file 
		DeleteMRU,										// arg1, Int, ShellMRU enum.
		PasteInto,										// no arg. 
		EvaluateByModifierKeys,							// evaluates arg 0 -> None, 1 -> Ctrl, 2 -> Shift, 3 -> Ctrl + Shift , 4 -> Alt, 5 -> Ctrl + Alt, 6 -> Shift + Alt, 7 -> Ctrl + Shift + Alt
		GetModifierKeys,				// 110			// returns ModifierKeys enum. 0 -> None, 1 -> Ctrl, 2 -> Shift, 3 -> Ctrl + Shift , 4 -> Alt, 5 -> Ctrl + Alt, 6 -> Shift + Alt, 7 -> Ctrl + Shift + Alt
		GetSort,										// arg1, optional, 0 or null -> localized name, 1 -> cannonical name, 2 -> index in column. arg2, optional, TargetView enumeration.
		GetSortDirection,								// returs 1 if ascendent. 0 no sort. -1 descendent. arg1 optinal, TargetView.
		SetViewSync,									// Toggles sync. Synch level 0(default)scroll and navigation. 1 scroll. 2 navigation.
		GetViewSync,									// 
		GetFocusedView,									// returns TargetView enum.
		GetOtherView,									// returns TargetView enum. The other view is not always visible.
		GetFocusedViewPath,								// returns string
		GetOtherViewPath,								// returns string. Since the other view is not always visible, string can be null.
		GetViewPath,									// arg1 TargetView enum, returns string
		GetSearchText,					// 120			// returns text in search box.
		ShowRenameDialog,								// arg1 view.
		MoveTabToView,									// arg1 Tab ID or tab object. null then active tab in active view./ arg2 view, /arg3 bool to copy not move
		CopyFile,										// arg1 path string or QCollection object of paths to copy. arg2 target folder path.
		MoveFile,										// arg1 path string or QCollection object of paths to move. arg2 target folder path.
		DeleteFile,										// arg1 path or QColloction object of paths files to delete. arg2 FileOperationOptions (old arg2 optional, true to delete permanently. arg3 optional, true to silently.)
		PasteToFolder,									// arg1 target folder path.
		WriteText,										// arg1 path of text file to write to. arg2 text to write. arg3(optional) ScriptingTextFileModes enumeration. arg4 (optional)Encoding codePage value.
		EmptyRecycleBin,								// no arg.
		OrderTab,										// arg1 how ordering is done: TabOrdering enum. Reverse if omitted. arg2 bool descending if true. arg3 view.
		OpenFileDialog,					// 130			// arg1 filter, arg2 Title, arg3 inidir, arg4 options. all optional.
		SaveFileDialog,									// arg1 filter, arg2 Title, arg3 inidir, arg4 options. all optional.
		FolderBrowserDialog,							// arg1 description, arg2 inidir, arg3 options. all optional.
		EnsureItemVisible,								// arg1 index of the item, arg2 optional, View. Index ==-1 then last
		RenameMultiple,									// arg1 paths to rename. arg2 list of new name. if null, tries to use string in clipboard., arg3(optional) ScriptingFileOperations value.
		SetExtraViewSize,								// arg1 value. arg2 0 left, 1 bottom. arg3 0 size, 1 percentage. 
		GetIconSize,									// arg1 view. return pixel size. return icon size.
		SetIconSize,									// arg1 icon size in pixel(16-256). arg2 view. Return passed value if successful
		GetCommandName,									// arg1 ScriptingCommand number or string. returns name if defined.
		GetVersion,										// returns qttabbar version num like 1030
		GetPluginLibVersion,			// 140			// returns qttabbar version string like "1.3.0.0"
		GetColumnWidth,									// arg1 (Str, canonical name or display name of column. or int index of column.) arg2 view
		SetColumnWidth,									// arg1 (Str, canonical name or display name of column. or int index of column. -1 for all columns) arg2( width, -1 default/ -2 autosize ) arg3 view.


		/* new commands will be added here */


		// explorer menu commands equivalents. some commands accept View enumeration as the first argument.
		Cut						= 28696,
		Copy					= 28697,
		Paste					= 28698,
		PasteShortcut			= 28700,
		Undo					= 28699,
		Redo					= 28704,
		Delete					= 28689,
		StartRename				= 28690,
		Properties				= 28691,
		SelectAll				= 28705,
		InvertSelection			= 28706,
		HideFileName			= 28727,
		CreateShortcut			= 28688,
		CopyToFolder			= 28702,
		MoveToFolder			= 28703,
		Details					= 28747,
		Tiles					= 28748,
		ExtraLargeIcon 			= 28749,
		Icon					= 28750,
		LargeIcon				= 28751,
		SmallIcon				= 28752,
		List					= 28753,
		Contents				= 28754,
		ExpandAllGroups			= 28755,
		CollapseAllGroups		= 28756,
		AutoArrange				= 28785,
		AlignToGrid				= 28788,
		CustomizeThisFolder		= 28722,
		ChooseDetails			= 28723,
		Refresh					= 28931,
		ViewGroupByNone			= 30210,
		ViewGroupAscending		= 30208,
		ViewGroupDescending		= 30209,
		OrderAscending			= 31488,
		OrderDescending			= 31489,
		MapNetworkDrive			= 41089,
		DisconnectNetworkDrive	= 41090,
		ShowSynchCenter			= 41096,
		FolderOptions			= 41251,
		ToggleToolbarLock		= 41484,
		ToggleStatusBar			= 41474,
		GenuineWindows			= 41220,
		OSVersion				= 41218,

	}

}