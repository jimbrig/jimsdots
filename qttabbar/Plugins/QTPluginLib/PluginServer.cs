using System;
using System.Drawing;
using System.Diagnostics;
using System.Windows.Forms;
using QTPlugin.Interop;

namespace QTPlugin
{
	/// <summary>
	/// QTTabBar implements this interface.
	/// </summary>
	public interface IPluginServer
	{
		#region ------- Events -------
		
		// CAUTION: 
		//		If your event handlers are instance methods of the main class that implements IPluginClient interface, 
		//		then those handlers are automatically removed when your plugin is unloaded.
		//		If it is a static method or an instance method of class other than main plugin class,
		//		you must detach it in IPluginClient.Close(), or memory leaks will result. 

		// Following view and tab events are triggered only by the default view of explorer.
		// If you want to register handlers with events triggered by Extra Views, use IPluginServer.ViewEventSource object that implements IEventSource. (1.3.0.0-)

		/// <summary>
		/// Occurs when current active tab has changed.
		/// </summary>
		event PluginEventHandler TabChanged;

		/// <summary>
		/// Occurs when a new tab added to tabbar.
		/// </summary>
		event PluginEventHandler TabAdded;

		/// <summary>
		/// Occurs when a tab removed from tabbar.
		/// </summary>
		event PluginEventHandler TabRemoved;

		/// <summary>
		/// Occurs when the mouse pointer enters the tabBar. 
		/// </summary>
		event EventHandler MouseEnter;

		/// <summary>
		/// Occurs when the mouse pointer moves and points a tab.
		/// </summary>
		event PluginEventHandler PointedTabChanged;

		/// <summary>
		/// Occurs when the mouse pointer leaves the TabBar.
		/// </summary>
		event EventHandler MouseLeave;
		
		/// <summary>
		/// Occurs when explorer navigation is completed.
		/// 
		/// TabBar 3.0- : passes PluginEventArgs without informations about currently active tab.
		/// </summary>
		event PluginEventHandler NavigationComplete;
		
		/// <summary>
		/// Occurs when the selection state of any item or items in the folder view has changed.
		/// </summary>
		event PluginEventHandler SelectionChanged;


		/// <summary>
		/// Occurs when settings of QTTabBar have changed.
		/// </summary>
		event PluginEventHandler SettingsChanged;

		/// <summary>
		/// Occurs when Explorer window maximized/minimized.
		/// </summary>
		event PluginEventHandler ExplorerStateChanged;

		/// <summary>
		/// Occurs when menu renderer option is changed.
		/// New in 1.0.1.0.
		/// </summary>
		event EventHandler MenuRendererChanged;

		/// <summary>
		/// Occurs when the keyboard shortcut assigned by plugin is pressed.
		/// 1.0.1.3
		/// </summary>
		event PluginKeyEventHandler ShortcutKeyPressed;

		/// <summary>
		/// Fired when plugin button is dropped to a Command Bar and a new button item is created.
		/// New in 1.2.0.0
		/// </summary>
		event EventHandler ButtonItemAddedToBar;

		#endregion

		#region ------- Methods -------


		/// <summary>
		/// Registers or unregisters a menu item to QTTabBar menu.
		/// The menus registered are automatically removed on unloading.
		/// </summary>
		/// <param name="pluginClient">Plugin to register/unregister.</param>
		/// <param name="menuType">Tab, Bar, or Both</param>
		/// <param name="menuText">Menu item text</param>
		/// <param name="fRegister"></param>
		void RegisterMenu( IPluginClient pluginClient, MenuType menuType, string menuText, bool fRegister );


		/// <summary>
		/// Updates ToolStripItem state.
		/// This reads IBarButton.Text.
		/// 
		/// be careful not to make an infinite loop by calling this method in IBarButton.Text or IBarButton.GetImage().
		/// </summary>
		/// <param name="barItem">Plugin to update.</param>
		/// <param name="fEnabled">ToolStripItem.Enabled value.</param>
		/// <param name="fRefreshImage">if true IPluginServer calls IBarButton.GetImage() and refresh image.</param>
		void UpdateItem( IBarButton barItem, bool fEnabled, bool fRefreshImage );


		/// <summary>
		/// Invoke QCommand.
		/// </summary>
		/// <param name="command">
		/// This can be used as the equivalent of ScriptingCommands
		/// http://qttabbar.wikidot.com/scriptingcommands
		/// </param>
		/// <param name="args">
		/// Prameters and return values are translated from/to Scripting objects to/from plugin and generic objects.<para/>
		/// Scripting.Tab		-> QTPlugin.ITab
		/// Scripting.Tab.ID	-> QTPlugin.ITab.ID
		/// Scripting.Window	-> IntPtr (window handle, use IPluginServer.ExplorerHandle)
		/// QCollection(string) -> IEnumerable&lt;string&gt;
		/// </param>
		object InvokeCommand( QCommand command, params object[] args );


		/// <summary>
		/// Retrieves current path string of the view.
		/// </summary>
		/// <param name="view"></param>
		/// <returns></returns>
		string GetPath( View view );


		/// <summary>
		/// Retrieves itemidlist data of the view.
		/// Retrieves current idl data of the view.
		/// </summary>
		/// <param name="view"></param>
		/// <returns></returns>
		byte[] GetIDL( View view );


		/// <summary>
		/// Retrieves the current tabs.
		/// Note that returned array members may be disposed unexpectedly by user,
		/// so do not hold returned ITab inteterfaces but use this property as needed.
		/// </summary>
		ITab[] GetTabs();


		/// <summary>
		/// Retrieves tabs in the specified view. (1.3.0.0-)
		/// </summary>
		/// <param name="view"></param>
		/// <returns></returns>
		ITab[] GetTabs( View view );


		/// <summary>
		/// Gets active tab in the view.
		/// (1.3.0.0-)
		/// </summary>
		/// <remarks>to set active tab, set ITab.Selected prorperty to true.</remarks>
		/// <param name="view"></param>
		/// <returns></returns>
		ITab GetSelectedTab( View view = View.Default );


		/// <summary>
		/// Retrieves a tab at the specified point in screen coordinates.
		/// </summary>
		/// <param name="pnt">point in screen corrdinates.</param>
		/// <returns>ITab interface if tab exists at pnt, or null otherwise.</returns>
		ITab HitTest( Point pnt );


		/// <summary>
		/// Open a new window of the specified address.
		/// </summary>
		/// <param name="address">Address to open.</param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool CreateWindow( Address address );

		
		/// <summary>
		/// Create and add tabs contained in groups.
		/// </summary>
		/// <param name="groupNames"></param>
		void OpenGroup( string[] groupNames );


		/// <summary>
		/// Gets group member paths.
		/// </summary>
		/// <param name="groupName"></param>
		/// <returns>null if groupName is invalid.</returns>
		string[] GetGroupPaths( string groupName );


		/// <summary>
		/// Adds paths to the specified group.
		/// if group specified by groupName exists, adds paths to the group.
		/// if not, creates a new group with paths.
		/// </summary>
		/// <param name="groupName"></param>
		/// <param name="paths"></param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool AddGroup( string groupName, string[] paths );


		/// <summary>
		/// Deletes a group.
		/// </summary>
		/// <param name="groupName"></param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		bool RemoveGroup( string groupName );


		/// <summary>
		/// Add a new application launcher item.
		/// </summary>
		/// <param name="name">
		/// Display name of application.
		/// 
		/// name can be a tree-path separated by "\".
		///    ex: "folder1\folder2\SomeApplication"
		/// 
		/// if upper fragments of path do not exist, those will be created.
		/// 
		/// renamed if already exists item specified by name.
		/// </param>
		/// <param name="startInfo"></param>
		/// <returns></returns>
		bool AddApplication( string name, ProcessStartInfo startInfo );


		/// <summary>
		/// Remove an application launcher item.
		/// </summary>
		/// <param name="name">
		/// Display name of application.
		/// 
		/// name can be a tree-path separated by "\".
		///    ex: "folder1\folder2\SomeApplication"
		/// </param>
		/// <returns></returns>
		bool RemoveApplication( string name );


		/// <summary>
		/// Gets the current menu renderer.
		/// Use this method to render your menus with the same appearance as other menus.
		/// 
		/// New in 1.0.1.0
		/// </summary>
		/// <returns></returns>
		ToolStripRenderer GetMenuRenderer();


		/// <summary>
		/// Gets location and size of view specified. Use this to show view-specific dialog, etc.
		/// </summary>
		/// <param name="view"></param>
		/// <returns>Bounding rectangle of the view, in screen coordinates. If view is not visible, this returns Rectangle.Empty.</returns>
		Rectangle GetViewBounds( View view );


		#endregion

		#region ------- Properties -------


		/// <summary>
		/// Gets the window handle of QTTabBar.
		/// </summary>
		IntPtr Handle
		{
			get;
		}

		
		/// <summary>
		/// Gets the window handle of Explorer.
		/// 
		/// if this value is IntPtr.Zero, the plugin server can be desktop tool. (1.0.1.3-)
		/// </summary>
		IntPtr ExplorerHandle
		{
			get;
		}


		/// <summary>
		/// Gets group names that user registered.
		/// </summary>
		string[] Groups
		{
			get;
		}


		/// <summary>
		/// When this returned true, this server is hosted by Desktop tool not by TabBar so some methods, properties and events are not supported.
		///  - TabChanged, TabAdded, TabRemoved, NavigationComplete, ExplorerStateChanged, PointedTabChanged, RegisterMenu(), UpdateItem(), GetTabs(), SelectedTab, HitTest(), ExplorerHandle.
		///  - ExecuteCommand for tab operations.
		/// This is true only for Background and BackgroundMultiple plugins and they are instatialized witout Toolbar buttons even if they are IBarButton.
		/// Those plugins can handle selection change and keyboard shortcuts performed while desktop has keyboard focus.
		/// 
		/// New in 1.0.1.3
		/// </summary>
		bool OwnerIsDesktopTool
		{
			get;
		}

		/// <summary>
		/// Retrieves current path string of the default view.
		/// 
		/// new in 1.1.0.0, but not implemented till 1024
		/// </summary>
		string Path
		{
			get;
		}

		/// <summary>
		/// Retrieves itemidlist data of the default view.
		/// PIDL can be created by copying this data to unmanaged memory block allocated by Marshal.AllocCoTaskMem().
		/// 
		/// new in 1.1.0.0, but not implemented till 1024!
		/// </summary>
		byte[] IDL
		{
			get;
		}


		/// <summary>
		/// Gets or sets current active tab.
		/// </summary>
		ITab SelectedTab
		{
			get;
			set;
		}

		/// <summary>
		/// Gets active tab in active view. This returns null when no tab in focused view or no view is focused.
		/// </summary>
		ITab SelectedTabInFocusedView
		{
			get;
		}

		/// <summary>
		/// Gets or sets a value indicating which view has focus. (1.3.0.0)
		/// Returns None if no view has focus.
		/// </summary>
		View FocusedView
		{
			get;
			set;
		}


		/// <summary>
		/// Use this object to register events that occurs in views.
		/// 
		///  ex) pluginServer.ViewEventSource.ActiveViewChanged += ...
		/// 
		/// Events that provided by this object are fired also by the default view, so no need to use other events provided by IPluginServer with the same names.
		/// To know by which view an event is triggered, use PluginEventHandler.View property value.
		/// </summary>
		IEventSource ViewEventSource
		{
			get;
		}

		/// <summary>
		/// Returns file version of QTPluginLib.dll
		/// </summary>
		Version LibraryVersion
		{
			get;
		}

		#endregion

		#region ------- OBSOLETES -------
		
		/// <summary>
		/// Deprecated. Use InvokeCommand instead.
		/// 
		/// Executes a command on QTTabBar.
		/// </summary>
		/// <param name="command"></param>
		/// <param name="arg">
		/// set this parameter if the command requires arguments, or set null otherwise.
		/// see Commands enumeration.
		/// </param>
		/// <returns></returns>
		[Obsolete( "Use InvokeCommand instead." )]
		bool ExecuteCommand( Commands command, object arg );


		/// <summary>
		/// NOT IMPLEMENTED. RETURNS NULL.
		/// </summary>
		/// <param name="name">
		/// name can be a path.
		/// if name is null or empty, all top-level items will be enumerated.
		/// </param>
		/// <returns></returns>
		[Obsolete( "Do not use. Not implemented." )]
		ProcessStartInfo[] GetApplications( string name );
		
		
		/// <summary>
		/// Tries to get selected file/folder items in the current folder view. 
		/// </summary>
		/// <param name="selectedItems"></param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		[Obsolete( "Consider using IPluginServer.SelectedTab.SelectedPaths property, though this method is available." )]
		bool TryGetSelection( out Address[] selectedItems );


		/// <summary>
		/// Tries to set selection in the current folder view.
		/// </summary>
		/// <param name="itemsToSelect">
		/// Addresses to select.
		/// The first one in the array will get focus.
		/// </param>
		/// <param name="fDeselectOthers">
		/// If this parameter is true, items which are not included in itemsToSelect will be deselected.
		/// If false, selections will be preserved.
		/// </param>
		/// <returns>Returns true if at least one item selected successfully, or false otherwise. </returns>
		[Obsolete( "Consider using IPluginServer.SelectedTab.SelectedPaths property, though this method is available." )]
		bool TrySetSelection( Address[] itemsToSelect, bool fDeselectOthers );


		/// <summary>
		/// Create a new tab.
		/// </summary>
		/// <param name="address">address of new tab.</param>
		/// <param name="index">
		/// zero based index of insertion position.
		/// if this parameter is -1, new tab will be inserted at user setting position.
		/// </param>
		/// <param name="fLocked">if new tab is locked.</param>
		/// <param name="fSelect">if activate new tab.</param>
		/// <returns>Returns true if successful, or false otherwise.</returns>
		[Obsolete( "Consider using InvokeCommand method with QCommand.NewTab" )]
		bool CreateTab( Address address, int index, bool fLocked, bool fSelect );
		/// <summary>
		/// Obsolete. Returns false and arrStrings will be null.
		/// </summary>
		/// <param name="pluginClient"></param>
		/// <param name="count"></param>
		/// <param name="arrStrings"></param>
		/// <returns></returns>
		[Obsolete( "Obsolete. Returns false and arrStrings will be null.", false )]
		bool TryGetLocalizedStrings( IPluginClient pluginClient, int count, out string[] arrStrings );


		/// <summary>
		/// NOT IMPLEMENTED. RETURNS NULL.
		/// Gets or sets TabBar settings.
		/// </summary>
		[Obsolete( "", true )]
		TabBarOption TabBarOption
		{
			get;
			set;
		}

		#endregion
	}
}
