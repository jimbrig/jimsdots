using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;

#pragma warning disable 1591	//stops XML warning


namespace QTPlugin
{
	/// <summary>
	/// Plugin type.
	/// </summary>
	public enum PluginType
	{
		/// <summary>
		/// Indicates that the plugin has a toolbar item and instantialized only when the toolbar item is enabled.
		/// needs to implement IBarButton or IBarCustomItem.
		/// </summary>
		Interactive,

		/// <summary>
		/// Indicates that the plugin is instantialized even if toolbar item is not enabled.
		/// This type of plugin does not need to have toolbar item.
		/// If implements IBarButton or IBarCustomItem, the plugin can have toolbar item.
		/// </summary>
		Background,

		/// <summary>
		/// Indicates that the plugin can have multiple toolbar items in CommandBar.
		/// This type of plugin will be instantialized even if toolbar item is not enabled.
		/// 
		/// You can apply to IBarMultipleCustomItems.
		/// </summary>
		BackgroundMultiple,


		/// <summary>
		/// Indicates that one Explorer process can have one instance of the plugin.
		/// This type of plugin cannot have interactive buttons.
		/// 
		/// Interfaces methods need to be thread-safe!
		/// 
		/// IPluginClient.Open method will be called but arguments are both null.
		/// IPluginClient.Close method will not be called unless user remove the plugin.
		/// These 2 methods are called from a folder window thread or the taskbar thread.
		/// 
		/// IPluginClient.OnOption method is called from a folder window thread.
		/// 
		/// IPluginClient.QueryShortcutKeys, OnMenuItemClick, OnShortcutKeyPressed will not be called.
		/// 
		/// You can apply to plugins that implement IEncodingDetector.
		/// You can apply to plugins that implement IFilter and IFilterCore. (1030)
		/// </summary>
		Static, 
	}


	/// <summary>
	/// Code given when a plugin is about to be closed.
	/// Used in IPluginClient.Close()
	/// </summary>
	public enum EndCode
	{
		/// <summary>
		/// Explorer window is closing.
		/// </summary>
		WindowClosed,

		/// <summary>
		/// User disabled the plugin in Option window.<para/>
		/// User removed the button from toolbar and the plugin type is PluginType.Interactive.
		/// </summary>
		Unloaded,

		/// <summary>
		/// User uninstalled the plugin in Option window of QTTabBar while plugins are instantialized.
		/// </summary>
		Removed,

		/// <summary>
		/// User removed a button from toolbar and the plugin type is PluginType.Background and implements IBarButton or IBarCustomItem. <para/>
		/// User removed all the buttons from toolbar and the plugin type is PluginType.BackgroundMultiple.	<para/>
		/// Note that the plugin instance is still alive after 'Close' method called if the code is 'Hidden'.
		/// </summary>
		Hidden,

	}


	/// <summary>
	/// The type of menu to insert.
	/// </summary>
	[Flags]
	public enum MenuType
	{
		None = 0,
		Tab  = 1,
		Bar  = 2,
		Both = 3,
	}


	/// <summary>
	/// Deprecated. Use QCommands and IPluginServer.InvokeCommand().<para/><para/>
	/// 
	/// Commands to QTTabBar.<para/>
	/// Used in IPluginServer.ExecuteCommand()
	/// </summary>
	public enum Commands
	{
		//[command]						[object arg]
		GoBack,							// int count
		GoForward,						// int count
		GoUpOneLevel,
		RefreshBrowser,

		CloseCurrentTab,
		CloseLeft,
		CloseRight,
		CloseAllButCurrent,
		CloseAllButOne,					// an ITab interface
		CloseWindow,
		UndoClose,
		BrowseFolder,
		ToggleTopMost,
		FocusFileList,

		OpenTabBarOptionDialog,
		OpenButtonBarOptionDialog,

		IsFolderTreeVisible,
		IsButtonBarVisible,
		ShowFolderTree,					// bool fShow				(XP only)
		ShowButtonBar,					// bool fShow, implemented from 2.0.0.1

		MD5,							// string[], file paths		( uses an HashAlgorithm user selected.)
		ShowProperties,					// an Address structure

		SetModalState,					// bool fShowing			( recommended to set this true/false before/after showing modal dialogboxes in the explorer thread. )
										//							( if you set this to true, it's your responsibility to set to false. )
										// *QTTabBar 8 and later	Not necessary when ShowDialog method call. still needed when you display something modal from unmanaged.

		SetSearchBoxStr,				// string strSearch			( if ButtonBar and searchbox are not available, returns false. 1.0.0.3- )

		ReorderTabsByName,				// bool fDescending			true if you want to reorder tabs in descending
		ReorderTabsByPath,				// bool fDescending
		ReorderTabsByActv,				// bool fDescending
		ReorderTabsRevers,


		// available commands for desktop tool are BrowseFolder, FocusFileList, MD5, RefreshBrowser, SetModalState, ShowProperties, and UndoClose.
	}

	/* Note:
	 * 
	 * Currently "Commands.CloseWindow", "Commands.OpenTabBarOptionDialog" and "Commands.OpenButtonBarOptionDialog" may unload the plugin
	 * that sent this command before IPluginServer.ExecuteCommand() method returns.
	 * 
	 */


	/// <summary>
	/// Toolbar item display style.
	/// </summary>
	public enum DisplayStyle
	{
		ShowTextLabel,
		[Obsolete( "Not used." )]
		SelectiveText,		// deprecated and has no meaning
		NoLabel,
	}


	/// <summary>
	/// 
	/// </summary>
	public enum ExplorerWindowActions
	{
		None,
		Maximized,
		Minimized,
		Restored,
	}


	public static class CONSTANTS
	{
		public const string REGISTRY_PLUGIN = @"Software\Quizo\QTTabBar\Plugins";
		public const string REGISTRY_PLUGINSETTINGS = @"Software\Quizo\QTTabBar\Plugins\Settings";
	}

	/// <summary>
	/// Specifies toolbar 
	/// </summary>
	//public enum Toolbar
	//{
	//    TabBar,
	//    ButtonBar,
	//    VersatileBar,
	//    VerticalBar,
	//    BottomTabBar,
	//    MenuBar,
	//}
	public enum Toolbar
	{
		TabBar,
		CommandBar1,
		CommandBar2,
		CommandBarVertical,
		MenuBar,					// changed in 1024
		StatusBar,
		BottomTabBar,				// changed in 1024
		ManagementBar,
		SecondViewBar,
		ThirdViewBar,


		[Obsolete]
		ButtonBar		= CommandBar1,
		[Obsolete]
		VersatileBar	= CommandBar2,
		[Obsolete]
		VerticalBar		= CommandBarVertical,

		ExtraViewBottom = SecondViewBar,
		ExtraViewLeft	= ThirdViewBar,
	}


	[Flags]
	public enum PluginOptions
	{
		/// <summary>
		/// Forbid user to duplicate plugin button.
		/// </summary>
		NoDuplication = 0x0001,

	}

	public enum View
	{
		None = -1,

		Default = 0,
		Bottom,
		Left,
	}

}
