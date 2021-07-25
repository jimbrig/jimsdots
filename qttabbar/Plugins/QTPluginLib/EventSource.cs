namespace QTPlugin
{
	/// <summary>
	/// Event source.
	/// </summary>
	public interface IEventSource
	{
		// CAUTION: 
		//		If your event handlers are instance methods of the main class that implements IPluginClient interface, 
		//		then those handlers are automatically removed when your plugin is unloaded.
		//		If it is a static method or an instance method of class other than main plugin class,
		//		you must detach it in IPluginClient.Close method, or memory leaks will result. 


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
		event PluginEventHandler MouseEnter;

		/// <summary>
		/// Occurs when the mouse pointer moves and points a tab.
		/// </summary>
		event PluginEventHandler PointedTabChanged;

		/// <summary>
		/// Occurs when the mouse pointer leaves the TabBar.
		/// </summary>
		event PluginEventHandler MouseLeave;

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
		/// Occurs when active view changed.  
		/// </summary>
		event PluginEventHandler ActiveViewChanged;
	}
}