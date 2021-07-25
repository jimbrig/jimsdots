/*********************************************************
 * 
 *	Plugin client interface definitions.
 * 
 * 
 *	IPluginClient				base interface.
 * 
 *	IBarButton
 *	IBarDropButton
 *	IBarCustomItem
 *	IBarMultipleCustomItems		for ButtonBar items.
 * 
 *	IFilter
 *	IFilterCore					these 2 are for search box.
 * 
 *	IEncodingDetector			for text preview.
 * 
 **********************************************************/



using System;
using System.Drawing;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;

using QTPlugin.Interop;


namespace QTPlugin
{

	/// <summary>
	/// Base plugin interface.
	/// </summary>
	public interface IPluginClient
	{
		/// <summary>
		/// Called by QTTabBar right after implementing class constructed.
		/// Do initialization of plugin here.
		/// Note that PluginType.Background type plugin may be instantialized on Option window of QTTabBar.
		/// Note that interactive toolbar item is not created yet.
		/// </summary>
		/// 
		/// <param name="pluginServer">
		/// IPluginServer interface of QTTabBar, or DesktopTool.
		/// Hold and use this parameter to command QTTabBar, get information of explorer or tabbar, etc.
		/// 
		/// pluginServer.ExplorerHandle returns IntPtr.Zero if you can assume that the server is dekstop tool (1.0.1.3-).
		/// </param>
		/// 
		/// <param name="shellBrowser">
		/// IShellBrowser interface of explorer window.
		/// Implementer can hold the instance for the lifetime of this plugin,
		/// and can use this parameter to get ISellView, IFolderView, etc.
		/// There's no need to call Marshal.ReleaseComObject() to this IShellBrowser interface.
		/// </param>
		void Open( IPluginServer pluginServer, IShellBrowser shellBrowser );
		

		/// <summary>
		/// QTTabBar notifies closing event.
		/// 
		/// <para>
		/// If endCode is NOT EndCode.Hidden, QTTabBar loses the reference to this plugin instance after this call.
		/// Clean up managed/unmanaged resources here if any.
		/// </para>
		/// <para>
		/// EndCode.Hidden is passed only when this has PluginType.Background or PluginType.BackgroundMultiple attribute and toolbar item is disabled by user.
		/// In this case, the plugin is still alive and can interact with user. 
		/// </para>
		/// See EndCode enumeration.
		/// </summary>
		/// <param name="endCode"></param>
		void Close( EndCode endCode );


		/// <summary>
		/// To allow users to set shortcut keys, 
		/// set action names and return true.
		/// members of actions will be shown in the Option -> "Shortcut Keys".
		/// 
		/// Return false if no need of shortcut keys.
		/// </summary>
		/// <param name="actions"></param>
		/// <returns></returns>
		bool QueryShortcutKeys( out string[] actions );


		/// <summary>
		/// Gets whether the plugin has options that can be set in the qtabbar option -> Plugins tab.
		/// </summary>
		bool HasOption
		{
			get;
		}


		/// <summary>
		/// Called when "Plugin Option" button is pressed.
		/// About saving settings, see Instructions.txt.
		/// 
		/// If you show any modal/modeless dialog, consider setting the dialog top-most.
		/// 
		/// The calling thread is a explorer thread that opened Option dialog.
		/// Even if there are multiple instances, One instance is notified to open option.
		/// So operation in this method may have to be static.
		/// 
		/// The following is old and not correct.
		/// (The calling thread can be different from the thread created this instance. Usually the thread of Option dialog.)
		/// </summary>
		void OnOption();


		/// <summary>
		/// Called when user click the registered menu item.
		/// To register, use <c>IPluginServer.RegisterMenu()</c>.
		/// </summary>
		/// <param name="menuType">Type of menu registered. Tab or Bar.</param>
		/// <param name="menuText">Identifier text of the clicked menu item.</param>
		/// <param name="tab">
		/// If <paramref name="menuType"/> is MenuType.Tab, the tab which user open a context menu.
		/// If <paramref name="menuType"/> is MenuType.Bar, this parameter is null.
		/// </param>
		void OnMenuItemClick( MenuType menuType, string menuText, ITab tab );
		

		/// <summary>
		/// Called when shortcut keys pressed.
		/// </summary>
		/// <param name="index">
		/// Index of shortcut key registered.
		/// This is an index in the parameter "actions" passed to QueryShortcutKeys().
		/// 
		/// If you want more detail information about the event, such as key repeat and key value, use IPluginServer.ShortcutKeyPressed event instead of this. (1.0.1.3)
		/// Use either of this method or ShortcutKeyPressed event.
		/// </param>
		[Obsolete( "Consider using IPluginServer.ShortcutKeyPressed event.", false )]
		void OnShortcutKeyPressed( int index );

	}


	#region ------- Button plugin interfaces -------


	/// <summary>
	/// Implement this interface to add a simple button item to Button Bar.
	/// QTTabBar notifies when clicked.
	/// 
	/// PluginType: Interactive or Background
	/// </summary>
	public interface IBarButton : IPluginClient
	{
		/// <summary>
		/// Called every time the button item of this plugin is about to be added to the explorer toolbar.
		/// Note that ButtonBar Option window recreates all items when its options changed.
		/// </summary>
		void InitializeItem();


		/// <summary>
		/// Return button image.
		/// if fLarge is true, return 24x24 image.
		/// if fLarge is false, return 16x16 image.
		/// 
		/// The call usually follows IBarButton.InitializeItem().
		/// Also called when plugin calls IPluginServer.UpdateItem() with parameter fRefreshImage true.
		/// 
		/// 512: QTTabBar creates a copy of the returned image so implementor is responsibile for disposing it on Close() method call.
		/// In earlier version than 512, it was uncertain which takes responsibility to release images.
		/// 
		/// If you want to support larger image sizes, implement IPluginItemWithImage instead.
		/// Then this call will be replaced by IPluginItemWithImage.GetItemImage.
		/// 
		/// This can be skipped if user has specified an image for the button.
		/// </summary>
		Image GetImage( bool fLarge );


		/// <summary>
		/// Called by QTTabBar when the button clicked.
		/// </summary>
		void OnButtonClick();


		/// <summary>
		/// Gets display text.
		/// </summary>
		string Text
		{
			get;
		}


		/// <summary>
		/// Deprecated. This value is not used.
		/// Now users can choice whether to show or not text label of each buttons.
		/// 
		/// Gets text lable mode.
		/// Return true if want to show text label when user set "Selective text" of ButtonBar.
		/// </summary>
		bool ShowTextLabel
		{
			get;
		}

	}


	/// <summary>
	/// This interface offers ToolStripDropDownButton and ToolStripSplitButton.
	/// 
	/// PluginType: Interactive or Background
	/// </summary>
	public interface IBarDropButton : IBarButton
	{
		/// <summary>
		/// Called by QTTabBar, every time the dropdown menu is opening.
		/// 
		/// If you want to make DropDownMenu by yourself, use IBarCustomItem.
		/// </summary>
		/// <param name="menu">ToolStripDropDownMenu instance. Add items to <c>menu.Items</c>. </param>
		void OnDropDownOpening( ToolStripDropDownMenu menu );


		/// <summary>
		/// Called by QTTabBar, when dropdown menu item clicked.
		/// </summary>
		/// <param name="item">The item clicked.</param>
		/// <param name="mouseButton">Mouse button pressed. Left or Right.</param>
		void OnDropDownItemClick( ToolStripItem item, MouseButtons mouseButton );


		/// <summary>
		/// Gets whether the plugin button is a splitbutton.
		/// Called when QTButtonBar creating DropButton item.
		/// If returns false, IBarButton.OnButtonClick method will not be called.
		/// </summary>
		bool IsSplitButton
		{
			get;
		}

	}


	/// <summary>
	/// Implement this interface to make a custom toolbar item.
	/// 
	/// PluginType: Interactive or Background
	/// </summary>
	public interface IBarCustomItem : IPluginClient
	{
		/// <summary>
		/// Return an item that inherits ToolStripItem class.
		/// 
		/// Note that ToolStripItem.Tag property is used for inner management so it will be overwritten even if set.
		/// Note that Button Bar Option window recreates all items when its options changed.
		/// 
		/// ToolStripItem.Image property might be overwritten if user specifies an image for the button.
		/// 
		/// 512: If you want to support larger image sizes, implement IPluginItemWithImage additionally.
		/// 
		/// Only one instance can be instanctialized in a thread.
		/// </summary>
		/// <param name="fLarge">true if current toolbar button icon is large.</param>
		/// <param name="displayStyle">ShowTextLabel if user checked this button, otherwise NoLabel.</param>
		/// <returns>ToolStripItem instance.</returns>
		ToolStripItem CreateItem( bool fLarge, DisplayStyle displayStyle );
	}


	/// <summary>
	/// Implement this interface to make custom toolbar items.
	/// The plugin that implements this interface can have multiple buttons.
	/// 
	/// Close method will be called when all items are removed from ButtonBar by user.
	/// 
	/// PluginType: BackgroundMultiple
	/// </summary>
	public interface IBarMultipleCustomItems : IPluginClient
	{
		/// <summary>
		/// Called every time the first ToolStripItem is about to be created in the session.
		/// 
		/// All ToolStripItems will have been cleared before this call and CreateItem() follows.
		/// Implementor can release or free any resources which was used by ToolStripItems.
		/// </summary>
		/// <param name="order">
		/// New order of items if user reordered in ButtonBar Option.
		/// This is usually null.
		/// 
		/// example:	after user reordered like ABC  ->  BCA
		///				'order' will be { 1, 2, 0 }
		/// 
		/// </param>
		void Initialize( int[] order );

		/// <summary>
		/// Return an item that inherits ToolStripItem class.
		/// 
		/// The plugin is responsible for disposing the ToolStripItem.
		/// </summary>
		/// <param name="fLarge">ToolBar current icon size.</param>
		/// <param name="displayStyle">ToolBar current display style.</param>
		/// <param name="index">0 based index of item to create.</param>
		/// <returns></returns>
		ToolStripItem CreateItem( bool fLarge, DisplayStyle displayStyle, int index );

		/// <summary>
		/// Return button image which is used in QTTabBar Option dialog for user to choose active buttons.
		/// 
		/// 512: QTTabBar creates a copy of the returned image so implementor is responsibile for disposing it.
		///		 If you want to support larger image sizes, implement IPluginItemWithImage additionally.
		/// </summary>
		/// <param name="fLarge">Return 24x24 image if fLarge is true. 16x16 image if not.</param>
		/// <param name="index">index of item of which image is required.</param>
		/// <returns></returns>
		Image GetImage( bool fLarge, int index );

		/// <summary>
		/// Return button name specified by index.
		/// </summary>
		/// <param name="index">index of button.</param>
		/// <returns></returns>
		string GetName( int index );

		/// <summary>
		/// Gets max number of items.
		/// 
		/// Returning -1 means that user can add items to ButtonBar without limit, like separator.
		/// </summary>
		int Count
		{
			get;
		}
	}


	#endregion


	#region ------- other plugin interfaces -------


	/// <summary>
	/// This interface detects which encoding is used in a text file and give proper Encoding object to decode it for preview.
	/// QTTabBar 16 uses IMultiLanguage2 interface to detect encodings by default.
	/// 
	/// One instance can be activated in system. QTTabBar uses first valid instance found and ignores the rest.
	/// 
	/// PluginType: Static
	/// </summary>
	public interface IEncodingDetector : IPluginClient
	{
		/// <summary>
		/// Called every time Thumbnail (preview) tip is about to load text file preview.
		/// </summary>
		/// <param name="data">
		/// Binary data of text file. If the file is larger than 1KB, first 1024bytes are passed. This limit may change in future.
		/// 
		/// (qttabbar 2.0.0.1 )
		/// If the file is larger than 4KB, first 4KB are passed.
		/// </param>
		/// <returns>Encoding object to decode text file. If null, QTTabBar uses default decoder.</returns>
		Encoding GetEncoding( ref byte[] data );
	}


	/// <summary>
	/// REVIVED from qttabbar 16.
	/// 
	/// Implement this interface if want to create a custom search-box filter engine.
	/// This interface is to convert a string user typed in search-box to Regular Expression for filtering file itmes.
	/// 
	/// One instance can be activated in system. QTTabBar uses first valid instance found and ignores the rest.
	/// ( This engine might be used for incremental search in Folder View of explorer in the future. )
	/// 
	/// PluginType: Static	(from qttabbar 1030, this can be Static. It was Background before.) 
	/// </summary>
	public interface IFilter : IPluginClient
	{
		/// <summary>
		/// Retrieves a Regular Expression object.
		/// 
		/// </summary>
		/// <param name="strQuery">In. string that user typed in Search-Box of QTButtonBar.</param>
		/// <param name="re">Out. regular expression object.</param>
		/// <returns>if returns false, QTTabBar uses its default filtering function.</returns>
		bool QueryRegex( string strQuery, out Regex re );
	}


	/// <summary>
	/// REVIVED from qttabbar 16.
	/// 
	/// Implement this interface if want to create a custom search-box filter engine.
	/// 
	/// This interface makes a decision on whether a file item is filtered or not, passed Regular Expression object
	/// that is created by QTTabBar(default) or IFilter instance. 
	/// Implementor can use IShellFolder interface to get informations of file passed as pIDLChild.
	/// 
	/// One instance can be activated in system. QTTabBar uses first valid instance found and ignores the rest.
	/// 
	/// PluginType: Static	(from qttabbar 1030, this can be Static. It was Background before.) 
	/// </summary>
	public interface IFilterCore : IPluginClient
	{
		/// <summary>
		/// Return true if reQuery matches the item identified by pIDLChild.
		/// </summary>
		/// 
		/// <param name="shellFolder">
		/// IShellFolder interface that specifies the folder where the search is performed.
		/// You can cast this to IShellFolder2 if the folder implements it.
		/// 
		/// There's no need to call Marshal.ReleaseComObject() to this interface.
		/// Do not hold this beyond method scope.
		/// </param>
		/// 
		/// <param name="pIDLChild">
		/// Pointer to an item's ITEMIDLIST structure, relative to parent folder.
		/// </param>
		/// 
		/// <param name="reQuery">
		/// Regular Expression object that is created by QTTabBar(default) or IFilter instance.
		/// </param>
		/// 
		/// <returns></returns>
		bool IsMatch( IShellFolder shellFolder, IntPtr pIDLChild, Regex reQuery );
	}


	#endregion

}